from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_required, current_user
from app import db
from models import User, Lead, Service, Investment, Partner, SiteSettings, Query
from forms import ServiceForm, InvestmentForm, PartnerForm, SiteSettingsForm
from functools import wraps
import json

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

def admin_required(f):
    @wraps(f)
    @login_required
    def decorated_function(*args, **kwargs):
        if not current_user.is_admin:
            flash('Access denied. Admin privileges required.', 'error')
            return redirect(url_for('dashboard.index'))
        return f(*args, **kwargs)
    return decorated_function

@admin_bp.route('/')
@admin_required
def dashboard():
    """Admin dashboard with overview statistics"""
    stats = {
        'total_users': User.query.count(),
        'total_leads': Lead.query.count(),
        'new_leads': Lead.query.filter_by(status='new').count(),
        'total_queries': Query.query.count(),
        'open_queries': Query.query.filter_by(status='open').count(),
        'active_services': Service.query.filter_by(is_active=True).count(),
        'active_investments': Investment.query.filter_by(is_active=True).count(),
        'partners': Partner.query.filter_by(is_active=True).count()
    }
    
    recent_leads = Lead.query.order_by(Lead.created_at.desc()).limit(5).all()
    
    return render_template('admin/dashboard.html', stats=stats, recent_leads=recent_leads)

@admin_bp.route('/content')
@admin_required
def content_management():
    """Content management overview"""
    services = Service.query.all()
    investments = Investment.query.all()
    partners = Partner.query.all()
    settings = SiteSettings.query.all()
    
    return render_template('admin/content.html', 
                         services=services, 
                         investments=investments, 
                         partners=partners,
                         settings=settings)

# Service Management
@admin_bp.route('/services')
@admin_required
def services():
    """Manage services"""
    services = Service.query.all()
    return render_template('admin/services.html', services=services)

@admin_bp.route('/services/new', methods=['GET', 'POST'])
@admin_required
def new_service():
    """Create new service"""
    form = ServiceForm()
    if form.validate_on_submit():
        try:
            features = json.loads(form.features.data) if form.features.data else []
        except json.JSONDecodeError:
            flash('Invalid JSON format in features field.', 'error')
            return render_template('admin/service_form.html', form=form, title='New Service')
        
        try:
            benefits = json.loads(form.benefits.data) if form.benefits.data else []
        except json.JSONDecodeError:
            flash('Invalid JSON format in benefits field.', 'error')
            return render_template('admin/service_form.html', form=form, title='New Service')
        
        service = Service()
        service.name = form.name.data
        service.slug = form.slug.data
        service.title = form.title.data
        service.description = form.description.data
        service.content = form.content.data
        service.features = features
        service.benefits = benefits
        service.is_active = form.is_active.data
        db.session.add(service)
        db.session.commit()
        flash('Service created successfully!', 'success')
        return redirect(url_for('admin.services'))
    
    return render_template('admin/service_form.html', form=form, title='New Service')

@admin_bp.route('/services/<int:id>/edit', methods=['GET', 'POST'])
@admin_required
def edit_service(id):
    """Edit existing service"""
    service = Service.query.get_or_404(id)
    form = ServiceForm(obj=service)
    
    if form.validate_on_submit():
        try:
            features = json.loads(form.features.data) if form.features.data else []
        except json.JSONDecodeError:
            flash('Invalid JSON format in features field.', 'error')
            return render_template('admin/service_form.html', form=form, service=service, title='Edit Service')
        
        try:
            benefits = json.loads(form.benefits.data) if form.benefits.data else []
        except json.JSONDecodeError:
            flash('Invalid JSON format in benefits field.', 'error')
            return render_template('admin/service_form.html', form=form, service=service, title='Edit Service')
        
        service.name = form.name.data
        service.slug = form.slug.data
        service.title = form.title.data
        service.description = form.description.data
        service.content = form.content.data
        service.features = features
        service.benefits = benefits
        service.is_active = form.is_active.data
        
        db.session.commit()
        flash('Service updated successfully!', 'success')
        return redirect(url_for('admin.services'))
    
    # Pre-populate JSON fields
    if service.features:
        form.features.data = json.dumps(service.features)
    if service.benefits:
        form.benefits.data = json.dumps(service.benefits)
    
    return render_template('admin/service_form.html', form=form, service=service, title='Edit Service')

@admin_bp.route('/services/<int:id>/delete', methods=['POST'])
@admin_required
def delete_service(id):
    """Delete service"""
    service = Service.query.get_or_404(id)
    db.session.delete(service)
    db.session.commit()
    flash('Service deleted successfully!', 'success')
    return redirect(url_for('admin.services'))

# Investment Management
@admin_bp.route('/investments')
@admin_required
def investments():
    """Manage investments"""
    investments = Investment.query.all()
    return render_template('admin/investments.html', investments=investments)

@admin_bp.route('/investments/new', methods=['GET', 'POST'])
@admin_required
def new_investment():
    """Create new investment"""
    form = InvestmentForm()
    if form.validate_on_submit():
        try:
            features = json.loads(form.features.data) if form.features.data else []
        except json.JSONDecodeError:
            flash('Invalid JSON format in features field.', 'error')
            return render_template('admin/investment_form.html', form=form, title='New Investment')
        
        investment = Investment()
        investment.name = form.name.data
        investment.slug = form.slug.data
        investment.category = form.category.data
        investment.risk_level = form.risk_level.data
        investment.min_investment = form.min_investment.data
        investment.expected_returns = form.expected_returns.data
        investment.lock_in_period = form.lock_in_period.data
        investment.liquidity = form.liquidity.data
        investment.tax_benefits = form.tax_benefits.data
        investment.description = form.description.data
        investment.features = features
        investment.is_active = form.is_active.data
        db.session.add(investment)
        db.session.commit()
        flash('Investment created successfully!', 'success')
        return redirect(url_for('admin.investments'))
    
    return render_template('admin/investment_form.html', form=form, title='New Investment')

@admin_bp.route('/investments/<int:id>/edit', methods=['GET', 'POST'])
@admin_required
def edit_investment(id):
    """Edit existing investment"""
    investment = Investment.query.get_or_404(id)
    form = InvestmentForm(obj=investment)
    
    if form.validate_on_submit():
        investment.name = form.name.data
        investment.slug = form.slug.data
        investment.category = form.category.data
        investment.risk_level = form.risk_level.data
        investment.min_investment = form.min_investment.data
        investment.expected_returns = form.expected_returns.data
        investment.lock_in_period = form.lock_in_period.data
        investment.liquidity = form.liquidity.data
        investment.tax_benefits = form.tax_benefits.data
        investment.description = form.description.data
        investment.features = json.loads(form.features.data) if form.features.data else []
        investment.is_active = form.is_active.data
        
        db.session.commit()
        flash('Investment updated successfully!', 'success')
        return redirect(url_for('admin.investments'))
    
    # Pre-populate JSON fields
    if investment.features:
        form.features.data = json.dumps(investment.features)
    
    return render_template('admin/investment_form.html', form=form, investment=investment, title='Edit Investment')

# Site Settings Management
@admin_bp.route('/settings')
@admin_required
def settings():
    """Manage site settings"""
    settings = {}
    for setting in SiteSettings.query.all():
        settings[setting.key] = setting
    
    return render_template('admin/settings.html', settings=settings)

@admin_bp.route('/settings/update', methods=['POST'])
@admin_required
def update_settings():
    """Update site settings"""
    for key, value in request.form.items():
        if key.startswith('setting_'):
            setting_key = key.replace('setting_', '')
            setting = SiteSettings.query.filter_by(key=setting_key).first()
            
            if setting:
                setting.value = value
            else:
                setting = SiteSettings()
                setting.key = setting_key
                setting.value = value
                db.session.add(setting)
    
    db.session.commit()
    flash('Settings updated successfully!', 'success')
    return redirect(url_for('admin.settings'))

# Lead Management
@admin_bp.route('/leads')
@admin_required
def leads():
    """Manage leads"""
    page = request.args.get('page', 1, type=int)
    status_filter = request.args.get('status', 'all')
    
    query = Lead.query
    if status_filter != 'all':
        query = query.filter_by(status=status_filter)
    
    leads = query.order_by(Lead.created_at.desc()).paginate(
        page=page, per_page=20, error_out=False
    )
    
    return render_template('admin/leads.html', leads=leads, status_filter=status_filter)

@admin_bp.route('/leads/<int:id>')
@admin_required
def lead_detail(id):
    """View lead details"""
    lead = Lead.query.get_or_404(id)
    return render_template('admin/lead_detail.html', lead=lead)

@admin_bp.route('/leads/<int:id>/update-status', methods=['POST'])
@admin_required
def update_lead_status(id):
    """Update lead status"""
    lead = Lead.query.get_or_404(id)
    new_status = request.form.get('status')
    
    if new_status in ['new', 'contacted', 'qualified', 'converted', 'closed']:
        lead.status = new_status
        db.session.commit()
        flash('Lead status updated successfully!', 'success')
    else:
        flash('Invalid status provided!', 'error')
    
    return redirect(url_for('admin.lead_detail', id=id))

# Public test endpoint to verify CMS data structure
@admin_bp.route('/test-cms', methods=['GET', 'POST'])
def test_cms_structure():
    """Test endpoint to verify CMS data structure (no auth required)"""
    if request.method == 'POST':
        # Test POST functionality
        try:
            data = request.get_json()
            key = data.get('key')
            value = data.get('value')
            
            if not key:
                return jsonify({'error': 'Key is required'}), 400
            
            # Find existing setting or create new one
            setting = SiteSettings.query.filter_by(key=key).first()
            if setting:
                setting.value = json.dumps(value) if isinstance(value, (dict, list)) else str(value)
            else:
                setting = SiteSettings()
                setting.key = key
                setting.value = json.dumps(value) if isinstance(value, (dict, list)) else str(value)
                setting.description = f'CMS content for {key}'
                db.session.add(setting)
            
            db.session.commit()
            return jsonify({'success': True, 'message': f'{key} updated successfully'})
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    # GET request
    cms_data = {}
    settings = SiteSettings.query.all()
    
    for setting in settings:
        try:
            cms_data[setting.key] = json.loads(setting.value) if setting.value.startswith('{') or setting.value.startswith('[') else setting.value
        except:
            cms_data[setting.key] = setting.value
    
    return jsonify({
        'success': True,
        'total_settings': len(settings),
        'sample_data': cms_data
    })

# CMS Data API endpoints
@admin_bp.route('/api/cms-data', methods=['GET'])
@admin_required
def get_cms_data():
    """Get all CMS data"""
    cms_data = {}
    settings = SiteSettings.query.all()
    
    for setting in settings:
        try:
            # Try to parse as JSON, fallback to string
            cms_data[setting.key] = json.loads(setting.value) if setting.value.startswith('{') or setting.value.startswith('[') else setting.value
        except:
            cms_data[setting.key] = setting.value
    
    return jsonify(cms_data)

@admin_bp.route('/api/cms-data', methods=['POST'])
@admin_required
def update_cms_data():
    """Update CMS data"""
    try:
        data = request.get_json()
        key = data.get('key')
        value = data.get('value')
        
        if not key:
            return jsonify({'error': 'Key is required'}), 400
        
        # Find existing setting or create new one
        setting = SiteSettings.query.filter_by(key=key).first()
        if setting:
            setting.value = json.dumps(value) if isinstance(value, (dict, list)) else str(value)
        else:
            setting = SiteSettings()
            setting.key = key
            setting.value = json.dumps(value) if isinstance(value, (dict, list)) else str(value)
            setting.description = f'CMS content for {key}'
            db.session.add(setting)
        
        db.session.commit()
        return jsonify({'success': True, 'message': f'{key} updated successfully'})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# API endpoints for AJAX updates
@admin_bp.route('/api/quick-stats')
@admin_required
def api_quick_stats():
    """Get quick stats for dashboard"""
    stats = {
        'users': User.query.count(),
        'leads': Lead.query.count(),
        'new_leads': Lead.query.filter_by(status='new').count(),
        'services': Service.query.filter_by(is_active=True).count()
    }
    return jsonify(stats)

@admin_bp.route('/api/content/toggle/<string:content_type>/<int:id>', methods=['POST'])
@admin_required
def toggle_content_status(content_type, id):
    """Toggle active status of content"""
    if content_type == 'service':
        item = Service.query.get_or_404(id)
    elif content_type == 'investment':
        item = Investment.query.get_or_404(id)
    elif content_type == 'partner':
        item = Partner.query.get_or_404(id)
    else:
        return jsonify({'error': 'Invalid content type'}), 400
    
    item.is_active = not item.is_active
    db.session.commit()
    
    return jsonify({
        'success': True, 
        'is_active': item.is_active,
        'message': f'{content_type.title()} {"activated" if item.is_active else "deactivated"} successfully!'
    })