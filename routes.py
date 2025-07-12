from flask import render_template, request, jsonify, redirect, url_for, flash
from flask_login import current_user
from app import app, db
from models import Lead, Service, Investment, Partner, Consultation, Query, Appointment, LoanProduct, FinancialProduct
from forms import LeadForm, QueryForm
from loan_hub import loan_hub
from financial_products import financial_products
from utils.calculator import (
    calculate_sip, calculate_lumpsum, calculate_swp, 
    calculate_fd, calculate_ppf, calculate_retirement,
    calculate_nps, calculate_emi
)
import json

# Market data routes are already registered in app.py

@app.route('/market')
def market_dashboard():
    """Market data dashboard"""
    return render_template('market/dashboard.html')

@app.route('/market/setup')
def market_api_setup():
    """Market API configuration page"""
    return render_template('market/api-setup.html')

@app.route('/submit-query', methods=['GET', 'POST'])
def submit_query():
    """Handle query submission from users"""
    form = QueryForm()
    
    if form.validate_on_submit():
        # Create new query
        query = Query()
        query.user_id = current_user.id if current_user.is_authenticated else None
        query.name = form.name.data
        query.email = form.email.data
        query.phone = form.phone.data
        query.category = form.category.data
        query.subject = form.subject.data
        query.message = form.message.data
        query.status = 'open'
        query.priority = 'medium'
        
        try:
            db.session.add(query)
            db.session.commit()
            
            flash('Your query has been submitted successfully! Our team will get back to you within 24 hours.', 'success')
            return redirect(url_for('submit_query'))
            
        except Exception as e:
            db.session.rollback()
            flash('There was an error submitting your query. Please try again.', 'error')
    
    return render_template('query_submission.html', form=form)

@app.route('/')
def index():
    """Homepage with walkthrough"""
    return render_template('index.html')

@app.route('/services')
def services():
    """Services overview page"""
    services = Service.query.filter_by(is_active=True).all()
    return render_template('services/index.html', services=services)

@app.route('/services/<slug>')
def service_detail(slug):
    """Individual service pages"""
    service = Service.query.filter_by(slug=slug, is_active=True).first_or_404()
    template_map = {
        'investment-advisory': 'services/advisory.html',
        'retirement-planning': 'services/retirement.html',
        'tax-optimization': 'services/tax-planning.html',
        'portfolio-management': 'services/portfolio.html'
    }
    template = template_map.get(slug, 'services/detail.html')
    return render_template(template, service=service)

@app.route('/about')
def about():
    """About us page"""
    return render_template('about.html')

@app.route('/mini-games')
def mini_games():
    """Interactive financial learning mini-games"""
    return render_template('mini_games.html')

@app.route('/investments')
def investments():
    """Investment solutions overview"""
    investments = Investment.query.filter_by(is_active=True).all()
    return render_template('investments/index.html', investments=investments)

@app.route('/investments/<slug>')
def investment_detail(slug):
    """Individual investment pages"""
    investment = Investment.query.filter_by(slug=slug, is_active=True).first_or_404()
    template_map = {
        'mutual-funds': 'investments/mutual-funds.html',
        'alternatives': 'investments/alternatives.html',
        'equity': 'investments/equity.html',
        'fixed-income': 'investments/fixed-income.html'
    }
    template = template_map.get(slug, 'investments/detail.html')
    return render_template(template, investment=investment)

@app.route('/calculators')
def calculators():
    """Calculators overview page"""
    return render_template('calculators/index.html')

@app.route('/calculators/sip')
def sip_calculator_enhanced():
    """Enhanced SIP Calculator with Chart.js"""
    return render_template('calculators/sip_enhanced.html')

@app.route('/calculators/lumpsum')
def lumpsum_calculator_enhanced():
    """Enhanced Lumpsum Calculator with Chart.js"""
    return render_template('calculators/lumpsum_enhanced.html')

@app.route('/calculators/emi')
def emi_calculator_enhanced():
    """Enhanced EMI Calculator with Chart.js"""
    return render_template('calculators/emi_enhanced.html')

@app.route('/calculators/retirement')
def retirement_calculator_enhanced():
    """Enhanced Retirement Calculator with Chart.js"""
    return render_template('calculators/retirement_enhanced.html')

@app.route('/calculators/swp')
def swp_calculator():
    """SWP Calculator"""
    return render_template('calculators/swp.html')

@app.route('/calculators/fd')
def fd_calculator():
    """FD Calculator"""
    return render_template('calculators/fd.html')

@app.route('/calculators/ppf')
def ppf_calculator():
    """PPF Calculator"""
    return render_template('calculators/ppf.html')

@app.route('/calculators/nps')
def nps_calculator():
    """NPS Calculator"""
    return render_template('calculators/nps.html')

@app.route('/tools/comparison')
def comparison_tool():
    """Investment comparison tool"""
    investments = Investment.query.filter_by(is_active=True).all()
    return render_template('tools/comparison.html', investments=investments)

@app.route('/partners')
def partners():
    """Partners page"""
    partners = Partner.query.filter_by(is_active=True).all()
    featured_partners = [p for p in partners if p.is_featured]
    other_partners = [p for p in partners if not p.is_featured]
    return render_template('partners.html', 
                         featured_partners=featured_partners, 
                         other_partners=other_partners)

# Legal document routes
@app.route('/legal/terms.html')
def legal_terms():
    """Terms & Conditions page"""
    return render_template('legal/terms.html')

@app.route('/legal/privacy.html')
def legal_privacy():
    """Privacy Policy page"""
    return render_template('legal/privacy.html')

@app.route('/legal/cookies.html')
def legal_cookies():
    """Cookie Policy page"""
    return render_template('legal/cookies.html')

@app.route('/legal/sebi.html')
def legal_sebi():
    """SEBI Investment Disclaimer page"""
    return render_template('legal/sebi.html')

@app.route('/legal/codeofconduct.html')
def legal_code_of_conduct():
    """Code of Conduct page"""
    return render_template('legal/codeofconduct.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Modern contact page with enhanced UI"""
    form = LeadForm()
    
    if form.validate_on_submit():
        lead = Lead()
        lead.name = form.name.data
        lead.email = form.email.data
        lead.phone = form.phone.data
        lead.service_interest = form.service_interest.data
        lead.investment_amount = form.investment_amount.data
        lead.investment_timeline = form.investment_timeline.data
        lead.risk_tolerance = form.risk_tolerance.data
        lead.message = form.message.data
        
        try:
            db.session.add(lead)
            db.session.commit()
            flash('Thank you for your interest! We will contact you within 24 hours to schedule your free consultation.', 'success')
            return redirect(url_for('modern_contact'))
        except Exception as e:
            db.session.rollback()
            flash('There was an error submitting your form. Please try again.', 'error')
    
    return render_template('modern_contact.html', form=form)

# API Routes for calculators
@app.route('/api/calculate/sip', methods=['POST'])
def api_calculate_sip():
    data = request.get_json()
    try:
        result = calculate_sip(
            monthly_investment=float(data['monthly_investment']),
            annual_return=float(data['annual_return']),
            time_period=int(data['time_period'])
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/calculate/lumpsum', methods=['POST'])
def api_calculate_lumpsum():
    data = request.get_json()
    try:
        result = calculate_lumpsum(
            investment_amount=float(data['investment_amount']),
            annual_return=float(data['annual_return']),
            time_period=int(data['time_period'])
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/calculate/swp', methods=['POST'])
def api_calculate_swp():
    data = request.get_json()
    try:
        result = calculate_swp(
            investment_amount=float(data['investment_amount']),
            monthly_withdrawal=float(data['monthly_withdrawal']),
            annual_return=float(data['annual_return'])
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/calculate/fd', methods=['POST'])
def api_calculate_fd():
    data = request.get_json()
    try:
        result = calculate_fd(
            principal=float(data['principal']),
            annual_rate=float(data['annual_rate']),
            time_period=int(data['time_period']),
            compound_frequency=int(data.get('compound_frequency', 4))
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/calculate/ppf', methods=['POST'])
def api_calculate_ppf():
    data = request.get_json()
    try:
        result = calculate_ppf(
            annual_investment=float(data['annual_investment']),
            years=int(data['years'])
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/calculate/retirement', methods=['POST'])
def api_calculate_retirement():
    data = request.get_json()
    try:
        result = calculate_retirement(
            current_age=int(data['current_age']),
            retirement_age=int(data['retirement_age']),
            current_expenses=float(data['current_expenses']),
            inflation_rate=float(data['inflation_rate']),
            expected_return=float(data['expected_return']),
            life_expectancy=int(data.get('life_expectancy', 85))
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/calculate/nps', methods=['POST'])
def api_calculate_nps():
    data = request.get_json()
    try:
        result = calculate_nps(
            monthly_contribution=float(data['monthly_contribution']),
            current_age=int(data['current_age']),
            retirement_age=int(data.get('retirement_age', 60)),
            expected_return=int(float(data['expected_return']))
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/calculate/emi', methods=['POST'])
def api_calculate_emi():
    data = request.get_json()
    try:
        result = calculate_emi(
            loan_amount=float(data['loan_amount']),
            annual_rate=float(data['annual_rate']),
            tenure_years=int(data['tenure_years'])
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Admin routes are handled by the admin blueprint in admin.py

# Simple Appointment Booking Routes
@app.route('/book-consultation')
def book_consultation():
    """Simple appointment booking form page"""
    return render_template('book_consultation.html')

@app.route('/api/appointments', methods=['POST'])
def api_book_appointment():
    """API endpoint to handle appointment bookings"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or not data.get('name') or not data.get('mobile'):
            return jsonify({'success': False, 'message': 'Name and mobile number are required'}), 400
        
        # Validate mobile number (10 digits)
        mobile = data.get('mobile').strip()
        if not mobile.isdigit() or len(mobile) != 10:
            return jsonify({'success': False, 'message': 'Mobile number must be exactly 10 digits'}), 400
        
        # Create new appointment
        appointment = Appointment()
        appointment.name = data.get('name').strip()
        appointment.mobile = mobile
        appointment.source_page = data.get('source_page', 'book-consultation')
        
        db.session.add(appointment)
        db.session.commit()
        
        return jsonify({
            'success': True, 
            'message': '✅ Thank you, we\'ll get in touch shortly.',
            'appointment_id': appointment.id
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': 'An error occurred. Please try again.'}), 500

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return render_template('errors/404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('errors/500.html'), 500
