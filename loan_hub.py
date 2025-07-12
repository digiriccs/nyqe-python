from flask import Blueprint, render_template, request, jsonify, redirect, url_for, flash
from flask_login import login_required, current_user
from app import db
from models import LoanProduct, LoanApplication, FinancialProduct, User, Bank
from forms import LoanProductForm, LoanApplicationForm, FinancialProductForm
from datetime import datetime
import uuid

loan_hub = Blueprint('loan_hub', __name__, url_prefix='/loans')

@loan_hub.route('/')
def index():
    """Loan Hub main page with comprehensive loan products and bank comparisons"""
    # Get filter parameters
    category = request.args.get('category', '')
    loan_type = request.args.get('loan_type', '')
    bank_id = request.args.get('bank_id', type=int)
    min_amount = request.args.get('min_amount', type=float)
    max_amount = request.args.get('max_amount', type=float)
    risk_category = request.args.get('risk_category', '')
    interest_rate_max = request.args.get('interest_rate_max', type=float)
    
    # Build query
    query = LoanProduct.query.filter_by(is_active=True)
    
    if category:
        query = query.filter(LoanProduct.category == category)
    if loan_type:
        query = query.filter(LoanProduct.loan_type == loan_type)
    if bank_id:
        query = query.filter(LoanProduct.bank_id == bank_id)
    if min_amount:
        query = query.filter(LoanProduct.max_amount >= min_amount)
    if max_amount:
        query = query.filter(LoanProduct.min_amount <= max_amount)
    if risk_category:
        query = query.filter(LoanProduct.risk_category == risk_category)
    if interest_rate_max:
        query = query.filter(LoanProduct.interest_rate_min <= interest_rate_max)
    
    # Get all products with pagination
    page = request.args.get('page', 1, type=int)
    products = query.join(Bank).order_by(LoanProduct.is_featured.desc(), LoanProduct.interest_rate_min.asc()).paginate(
        page=page, per_page=15, error_out=False
    )
    
    # Get featured products for hero section
    featured_products = LoanProduct.query.filter_by(is_active=True, is_featured=True).limit(6).all()
    
    # Get all active banks
    banks = Bank.query.filter_by(is_active=True).order_by(Bank.rating.desc()).all()
    
    # Get filter options
    categories = db.session.query(LoanProduct.category).filter_by(is_active=True).distinct().all()
    risk_categories = db.session.query(LoanProduct.risk_category).filter_by(is_active=True).distinct().all()
    
    # Get loan statistics for each category
    category_stats = {}
    for cat in ['home', 'personal', 'business', 'education', 'auto', 'gold', 'property']:
        count = LoanProduct.query.filter_by(category=cat, is_active=True).count()
        min_rate = db.session.query(db.func.min(LoanProduct.interest_rate_min)).filter_by(category=cat, is_active=True).scalar() or 0
        category_stats[cat] = {'count': count, 'min_rate': min_rate}
    
    return render_template('loan_hub/index.html', 
                         products=products,
                         featured_products=featured_products,
                         banks=banks,
                         categories=[cat[0] for cat in categories],
                         risk_categories=[risk[0] for risk in risk_categories],
                         category_stats=category_stats,
                         current_filters={
                             'category': category,
                             'loan_type': loan_type,
                             'bank_id': bank_id,
                             'min_amount': min_amount,
                             'max_amount': max_amount,
                             'risk_category': risk_category,
                             'interest_rate_max': interest_rate_max
                         })

@loan_hub.route('/product/<int:product_id>')
def product_detail(product_id):
    """Detailed view of a specific loan product"""
    product = LoanProduct.query.get_or_404(product_id)
    
    # Get related products (same category)
    related_products = LoanProduct.query.filter(
        LoanProduct.category == product.category,
        LoanProduct.id != product_id,
        LoanProduct.is_active == True
    ).limit(3).all()
    
    return render_template('loan_hub/product_detail.html', 
                         product=product,
                         related_products=related_products)

@loan_hub.route('/apply/<int:product_id>', methods=['GET', 'POST'])
@login_required
def apply_loan(product_id):
    """Apply for a loan product"""
    product = LoanProduct.query.get_or_404(product_id)
    form = LoanApplicationForm()
    
    # Set product choices for the form
    form.product_id.choices = [(product.id, product.name)]
    form.product_id.data = product.id
    
    if form.validate_on_submit():
        # Generate unique application ID
        application_id = f"LA{datetime.now().strftime('%Y%m%d')}{str(uuid.uuid4())[:8].upper()}"
        
        application = LoanApplication(
            application_id=application_id,
            user_id=current_user.id,
            product_id=product.id,
            requested_amount=form.requested_amount.data,
            tenure_months=form.tenure_months.data,
            purpose=form.purpose.data,
            employment_type=form.employment_type.data,
            monthly_income=form.monthly_income.data,
            credit_score=form.credit_score.data
        )
        
        try:
            db.session.add(application)
            db.session.commit()
            
            flash(f'Your loan application has been submitted successfully! Application ID: {application_id}', 'success')
            return redirect(url_for('loan_hub.application_status', application_id=application_id))
            
        except Exception as e:
            db.session.rollback()
            flash('Error submitting application. Please try again.', 'error')
    
    return render_template('loan_hub/apply.html', 
                         product=product, 
                         form=form)

@loan_hub.route('/applications')
@login_required
def my_applications():
    """View user's loan applications"""
    applications = LoanApplication.query.filter_by(user_id=current_user.id).order_by(
        LoanApplication.submitted_at.desc()
    ).all()
    
    return render_template('loan_hub/my_applications.html', applications=applications)

@loan_hub.route('/application/<application_id>')
@login_required
def application_status(application_id):
    """View specific application status"""
    application = LoanApplication.query.filter_by(
        application_id=application_id,
        user_id=current_user.id
    ).first_or_404()
    
    return render_template('loan_hub/application_status.html', application=application)

@loan_hub.route('/compare')
def compare_loans():
    """Compare loans from different banks"""
    category = request.args.get('category', 'home')
    loan_amount = request.args.get('amount', 1000000, type=float)
    tenure = request.args.get('tenure', 240, type=int)
    
    # Get loans from all banks for comparison
    loans = LoanProduct.query.join(Bank).filter(
        LoanProduct.category == category,
        LoanProduct.is_active == True,
        LoanProduct.min_amount <= loan_amount,
        LoanProduct.max_amount >= loan_amount,
        LoanProduct.max_tenure_months >= tenure
    ).order_by(LoanProduct.interest_rate_min.asc()).all()
    
    # Group by bank for comparison
    bank_loans = {}
    for loan in loans:
        if loan.bank.name not in bank_loans:
            bank_loans[loan.bank.name] = []
        bank_loans[loan.bank.name].append(loan)
    
    # Get all categories for dropdown
    categories = db.session.query(LoanProduct.category).filter_by(is_active=True).distinct().all()
    
    return render_template('loan_hub/compare.html',
                         bank_loans=bank_loans,
                         categories=[cat[0] for cat in categories],
                         current_category=category,
                         loan_amount=loan_amount,
                         tenure=tenure)

@loan_hub.route('/loan-guide')
def loan_selection_guide():
    """Interactive loan selection guide"""
    return render_template('loan_hub/loan_guide.html')

@loan_hub.route('/api/recommend-loan', methods=['POST'])
def recommend_loan():
    """API endpoint for loan recommendations based on user input"""
    data = request.get_json()
    
    purpose = data.get('purpose')
    amount = data.get('amount', 0)
    income = data.get('income', 0)
    tenure = data.get('tenure', 12)
    employment = data.get('employment', 'salaried')
    
    # Build recommendation query
    query = LoanProduct.query.filter_by(is_active=True)
    
    # Map purpose to category
    purpose_category_map = {
        'home_purchase': 'home',
        'home_renovation': 'home',
        'personal_expenses': 'personal',
        'wedding': 'personal',
        'medical': 'personal',
        'business_expansion': 'business',
        'working_capital': 'business',
        'education': 'education',
        'car_purchase': 'auto',
        'gold_loan': 'gold',
        'property_mortgage': 'property'
    }
    
    if purpose in purpose_category_map:
        query = query.filter(LoanProduct.category == purpose_category_map[purpose])
    
    # Filter by amount and income
    query = query.filter(
        LoanProduct.min_amount <= amount,
        LoanProduct.max_amount >= amount,
        LoanProduct.min_income <= income,
        LoanProduct.max_tenure_months >= tenure
    )
    
    # Get top 5 recommendations
    recommendations = query.join(Bank).order_by(
        LoanProduct.interest_rate_min.asc()
    ).limit(5).all()
    
    results = []
    for loan in recommendations:
        results.append({
            'id': loan.id,
            'name': loan.name,
            'bank': loan.bank.name,
            'interest_rate': f"{loan.interest_rate_min}% - {loan.interest_rate_max}%",
            'amount_range': f"₹{loan.min_amount:,.0f} - ₹{loan.max_amount:,.0f}",
            'tenure': loan.tenure_display,
            'processing_fee': f"{loan.processing_fee}%" if loan.processing_fee else "Nil"
        })
    
    return jsonify({'recommendations': results})

@loan_hub.route('/banks')
def bank_directory():
    """Directory of all partner banks"""
    banks = Bank.query.filter_by(is_active=True).order_by(Bank.rating.desc()).all()
    
    # Get loan count for each bank
    bank_stats = {}
    for bank in banks:
        loan_count = LoanProduct.query.filter_by(bank_id=bank.id, is_active=True).count()
        bank_stats[bank.id] = loan_count
    
    return render_template('loan_hub/banks.html', 
                         banks=banks,
                         bank_stats=bank_stats)

@loan_hub.route('/calculate-emi')
def calculate_emi():
    """EMI Calculator for loan products"""
    amount = request.args.get('amount', type=float, default=100000)
    rate = request.args.get('rate', type=float, default=10.5)
    tenure = request.args.get('tenure', type=int, default=12)
    
    if amount and rate and tenure:
        monthly_rate = rate / (12 * 100)
        emi = amount * monthly_rate * (1 + monthly_rate)**tenure / ((1 + monthly_rate)**tenure - 1)
        total_amount = emi * tenure
        total_interest = total_amount - amount
        
        return jsonify({
            'emi': round(emi, 2),
            'total_amount': round(total_amount, 2),
            'total_interest': round(total_interest, 2),
            'interest_percentage': round((total_interest / amount) * 100, 2)
        })
    
    return jsonify({'error': 'Invalid parameters'})

# Product Management Routes (Admin)
@loan_hub.route('/admin/products')
@login_required
def admin_products():
    """Admin view for managing loan products"""
    if not current_user.is_admin:
        flash('Access denied. Admin privileges required.', 'error')
        return redirect(url_for('loan_hub.index'))
    
    page = request.args.get('page', 1, type=int)
    products = LoanProduct.query.order_by(LoanProduct.created_at.desc()).paginate(
        page=page, per_page=20, error_out=False
    )
    
    return render_template('loan_hub/admin/products.html', products=products)

@loan_hub.route('/admin/products/new', methods=['GET', 'POST'])
@login_required
def admin_new_product():
    """Create new loan product"""
    if not current_user.is_admin:
        flash('Access denied. Admin privileges required.', 'error')
        return redirect(url_for('loan_hub.index'))
    
    form = LoanProductForm()
    
    if form.validate_on_submit():
        product = LoanProduct()
        form.populate_obj(product)
        
        try:
            db.session.add(product)
            db.session.commit()
            
            flash('Loan product created successfully!', 'success')
            return redirect(url_for('loan_hub.admin_products'))
            
        except Exception as e:
            db.session.rollback()
            flash('Error creating product. Please check the product code is unique.', 'error')
    
    return render_template('loan_hub/admin/product_form.html', form=form, title='Create New Loan Product')

@loan_hub.route('/admin/products/<int:product_id>/edit', methods=['GET', 'POST'])
@login_required
def admin_edit_product(product_id):
    """Edit existing loan product"""
    if not current_user.is_admin:
        flash('Access denied. Admin privileges required.', 'error')
        return redirect(url_for('loan_hub.index'))
    
    product = LoanProduct.query.get_or_404(product_id)
    form = LoanProductForm(obj=product)
    
    if form.validate_on_submit():
        form.populate_obj(product)
        product.updated_at = datetime.utcnow()
        
        try:
            db.session.commit()
            flash('Loan product updated successfully!', 'success')
            return redirect(url_for('loan_hub.admin_products'))
            
        except Exception as e:
            db.session.rollback()
            flash('Error updating product. Please check the product code is unique.', 'error')
    
    return render_template('loan_hub/admin/product_form.html', 
                         form=form, 
                         product=product,
                         title='Edit Loan Product')

@loan_hub.route('/admin/products/<int:product_id>/delete', methods=['POST'])
@login_required
def admin_delete_product(product_id):
    """Delete loan product"""
    if not current_user.is_admin:
        flash('Access denied. Admin privileges required.', 'error')
        return redirect(url_for('loan_hub.index'))
    
    product = LoanProduct.query.get_or_404(product_id)
    
    try:
        db.session.delete(product)
        db.session.commit()
        flash('Loan product deleted successfully!', 'success')
    except Exception as e:
        db.session.rollback()
        flash('Error deleting product. It may be referenced by existing applications.', 'error')
    
    return redirect(url_for('loan_hub.admin_products'))

@loan_hub.route('/admin/applications')
@login_required
def admin_applications():
    """Admin view for managing loan applications"""
    if not current_user.is_admin:
        flash('Access denied. Admin privileges required.', 'error')
        return redirect(url_for('loan_hub.index'))
    
    status_filter = request.args.get('status', '')
    page = request.args.get('page', 1, type=int)
    
    query = LoanApplication.query
    if status_filter:
        query = query.filter(LoanApplication.status == status_filter)
    
    applications = query.order_by(LoanApplication.submitted_at.desc()).paginate(
        page=page, per_page=20, error_out=False
    )
    
    return render_template('loan_hub/admin/applications.html', 
                         applications=applications,
                         status_filter=status_filter)

@loan_hub.route('/admin/applications/<int:application_id>/update-status', methods=['POST'])
@login_required
def admin_update_application_status(application_id):
    """Update loan application status"""
    if not current_user.is_admin:
        flash('Access denied. Admin privileges required.', 'error')
        return redirect(url_for('loan_hub.index'))
    
    application = LoanApplication.query.get_or_404(application_id)
    
    new_status = request.form.get('status')
    approved_amount = request.form.get('approved_amount', type=float)
    approved_rate = request.form.get('approved_rate', type=float)
    rejection_reason = request.form.get('rejection_reason')
    
    application.status = new_status
    
    if new_status == 'approved':
        application.approved_amount = approved_amount
        application.approved_rate = approved_rate
        application.approved_at = datetime.utcnow()
    elif new_status == 'rejected':
        application.rejection_reason = rejection_reason
    elif new_status == 'disbursed':
        application.disbursed_at = datetime.utcnow()
    
    application.reviewed_at = datetime.utcnow()
    
    try:
        db.session.commit()
        flash('Application status updated successfully!', 'success')
    except Exception as e:
        db.session.rollback()
        flash('Error updating application status.', 'error')
    
    return redirect(url_for('loan_hub.admin_applications'))