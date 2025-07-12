from flask import Blueprint, render_template, request, jsonify, redirect, url_for, flash
from flask_login import login_required, current_user
from app import db
from models import FinancialProduct, User
from forms import FinancialProductForm
from datetime import datetime

financial_products = Blueprint('financial_products', __name__, url_prefix='/products')

@financial_products.route('/')
def index():
    """Financial Products main page"""
    # Get filter parameters
    category = request.args.get('category', '')
    risk_level = request.args.get('risk_level', '')
    min_investment = request.args.get('min_investment', type=float)
    fund_house = request.args.get('fund_house', '')
    
    # Build query
    query = FinancialProduct.query.filter_by(is_active=True)
    
    if category:
        query = query.filter(FinancialProduct.category == category)
    if risk_level:
        query = query.filter(FinancialProduct.risk_level == risk_level)
    if min_investment:
        query = query.filter(FinancialProduct.min_investment <= min_investment)
    if fund_house:
        query = query.filter(FinancialProduct.fund_house.ilike(f'%{fund_house}%'))
    
    # Get all products with pagination
    page = request.args.get('page', 1, type=int)
    products = query.order_by(FinancialProduct.is_recommended.desc(), FinancialProduct.returns_1y.desc()).paginate(
        page=page, per_page=12, error_out=False
    )
    
    # Get recommended products for hero section
    recommended_products = FinancialProduct.query.filter_by(is_active=True, is_recommended=True).limit(6).all()
    
    # Get filter options
    categories = db.session.query(FinancialProduct.category).filter_by(is_active=True).distinct().all()
    risk_levels = db.session.query(FinancialProduct.risk_level).filter_by(is_active=True).distinct().all()
    fund_houses = db.session.query(FinancialProduct.fund_house).filter_by(is_active=True).distinct().all()
    
    return render_template('financial_products/index.html', 
                         products=products,
                         recommended_products=recommended_products,
                         categories=[cat[0] for cat in categories if cat[0]],
                         risk_levels=[risk[0] for risk in risk_levels if risk[0]],
                         fund_houses=[fh[0] for fh in fund_houses if fh[0]],
                         current_filters={
                             'category': category,
                             'risk_level': risk_level,
                             'min_investment': min_investment,
                             'fund_house': fund_house
                         })

@financial_products.route('/product/<int:product_id>')
def product_detail(product_id):
    """Detailed view of a specific financial product"""
    product = FinancialProduct.query.get_or_404(product_id)
    
    # Get related products (same category or similar risk level)
    related_products = FinancialProduct.query.filter(
        db.or_(
            FinancialProduct.category == product.category,
            FinancialProduct.risk_level == product.risk_level
        ),
        FinancialProduct.id != product_id,
        FinancialProduct.is_active == True
    ).limit(4).all()
    
    return render_template('financial_products/product_detail.html', 
                         product=product,
                         related_products=related_products)

@financial_products.route('/compare')
def compare_products():
    """Compare multiple financial products"""
    product_ids = request.args.getlist('products', type=int)
    
    if not product_ids:
        flash('Please select products to compare.', 'warning')
        return redirect(url_for('financial_products.index'))
    
    products = FinancialProduct.query.filter(
        FinancialProduct.id.in_(product_ids),
        FinancialProduct.is_active == True
    ).all()
    
    if len(products) < 2:
        flash('Please select at least 2 products to compare.', 'warning')
        return redirect(url_for('financial_products.index'))
    
    return render_template('financial_products/compare.html', products=products)

@financial_products.route('/category/<category>')
def category_products(category):
    """View products by category"""
    page = request.args.get('page', 1, type=int)
    products = FinancialProduct.query.filter_by(
        category=category, 
        is_active=True
    ).order_by(FinancialProduct.returns_1y.desc()).paginate(
        page=page, per_page=12, error_out=False
    )
    
    category_mapping = {
        'mutual_funds': 'Mutual Funds',
        'insurance': 'Insurance',
        'bonds': 'Bonds',
        'fd': 'Fixed Deposits',
        'rd': 'Recurring Deposits',
        'nps': 'National Pension Scheme',
        'ulip': 'ULIP'
    }
    
    category_name = category_mapping.get(category, category.title())
    
    return render_template('financial_products/category.html', 
                         products=products,
                         category=category,
                         category_name=category_name)

# Product Management Routes (Admin)
@financial_products.route('/admin/products')
@login_required
def admin_products():
    """Admin view for managing financial products"""
    if not current_user.is_admin:
        flash('Access denied. Admin privileges required.', 'error')
        return redirect(url_for('financial_products.index'))
    
    page = request.args.get('page', 1, type=int)
    category_filter = request.args.get('category', '')
    
    query = FinancialProduct.query
    if category_filter:
        query = query.filter(FinancialProduct.category == category_filter)
    
    products = query.order_by(FinancialProduct.created_at.desc()).paginate(
        page=page, per_page=20, error_out=False
    )
    
    categories = db.session.query(FinancialProduct.category).distinct().all()
    
    return render_template('financial_products/admin/products.html', 
                         products=products,
                         categories=[cat[0] for cat in categories if cat[0]],
                         category_filter=category_filter)

@financial_products.route('/admin/products/new', methods=['GET', 'POST'])
@login_required
def admin_new_product():
    """Create new financial product"""
    if not current_user.is_admin:
        flash('Access denied. Admin privileges required.', 'error')
        return redirect(url_for('financial_products.index'))
    
    form = FinancialProductForm()
    
    if form.validate_on_submit():
        product = FinancialProduct()
        form.populate_obj(product)
        
        try:
            db.session.add(product)
            db.session.commit()
            
            flash('Financial product created successfully!', 'success')
            return redirect(url_for('financial_products.admin_products'))
            
        except Exception as e:
            db.session.rollback()
            flash('Error creating product. Please check the product code is unique.', 'error')
    
    return render_template('financial_products/admin/product_form.html', 
                         form=form, 
                         title='Create New Financial Product')

@financial_products.route('/admin/products/<int:product_id>/edit', methods=['GET', 'POST'])
@login_required
def admin_edit_product(product_id):
    """Edit existing financial product"""
    if not current_user.is_admin:
        flash('Access denied. Admin privileges required.', 'error')
        return redirect(url_for('financial_products.index'))
    
    product = FinancialProduct.query.get_or_404(product_id)
    form = FinancialProductForm(obj=product)
    
    if form.validate_on_submit():
        form.populate_obj(product)
        product.updated_at = datetime.utcnow()
        
        try:
            db.session.commit()
            flash('Financial product updated successfully!', 'success')
            return redirect(url_for('financial_products.admin_products'))
            
        except Exception as e:
            db.session.rollback()
            flash('Error updating product. Please check the product code is unique.', 'error')
    
    return render_template('financial_products/admin/product_form.html', 
                         form=form, 
                         product=product,
                         title='Edit Financial Product')

@financial_products.route('/admin/products/<int:product_id>/delete', methods=['POST'])
@login_required
def admin_delete_product(product_id):
    """Delete financial product"""
    if not current_user.is_admin:
        flash('Access denied. Admin privileges required.', 'error')
        return redirect(url_for('financial_products.index'))
    
    product = FinancialProduct.query.get_or_404(product_id)
    
    try:
        db.session.delete(product)
        db.session.commit()
        flash('Financial product deleted successfully!', 'success')
    except Exception as e:
        db.session.rollback()
        flash('Error deleting product.', 'error')
    
    return redirect(url_for('financial_products.admin_products'))

@financial_products.route('/api/search')
def api_search():
    """API endpoint for product search"""
    query = request.args.get('q', '')
    category = request.args.get('category', '')
    limit = request.args.get('limit', 10, type=int)
    
    if not query:
        return jsonify([])
    
    search_query = FinancialProduct.query.filter(
        FinancialProduct.is_active == True,
        db.or_(
            FinancialProduct.name.ilike(f'%{query}%'),
            FinancialProduct.fund_house.ilike(f'%{query}%'),
            FinancialProduct.description.ilike(f'%{query}%')
        )
    )
    
    if category:
        search_query = search_query.filter(FinancialProduct.category == category)
    
    products = search_query.limit(limit).all()
    
    results = []
    for product in products:
        results.append({
            'id': product.id,
            'name': product.name,
            'category': product.category,
            'fund_house': product.fund_house,
            'nav': float(product.nav) if product.nav else None,
            'returns_1y': float(product.returns_1y) if product.returns_1y else None,
            'risk_level': product.risk_level,
            'min_investment': float(product.min_investment) if product.min_investment else None
        })
    
    return jsonify(results)