from datetime import datetime
from app import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256))
    name = db.Column(db.String(100))
    phone = db.Column(db.String(20), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    email_verified = db.Column(db.Boolean, default=False)
    last_login = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    profile = db.relationship('UserProfile', backref='user', uselist=False, cascade='all, delete-orphan')
    portfolios = db.relationship('Portfolio', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    transactions = db.relationship('Transaction', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    @property
    def full_name(self):
        return self.name or self.username
    
    def get_total_portfolio_value(self):
        return sum(portfolio.current_value for portfolio in self.portfolios)
    
    def __repr__(self):
        return f'<User {self.username}>'

class Lead(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    service_interest = db.Column(db.String(100))
    message = db.Column(db.Text)
    investment_amount = db.Column(db.Numeric(15, 2))
    investment_timeline = db.Column(db.String(50))
    risk_tolerance = db.Column(db.String(20))
    status = db.Column(db.String(20), default='new')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(100), unique=True, nullable=False)
    title = db.Column(db.String(200))
    description = db.Column(db.Text)
    content = db.Column(db.Text)
    features = db.Column(db.JSON)  # MySQL 5.7+ supports JSON type
    benefits = db.Column(db.JSON)
    
    # For MySQL < 5.7, you would use Text and serialize manually:
    # features = db.Column(db.Text)
    # Then use json.loads()/json.dumps() when accessing
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Investment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(100), unique=True, nullable=False)
    category = db.Column(db.String(50))
    risk_level = db.Column(db.String(20))
    min_investment = db.Column(db.Numeric(15, 2))
    expected_returns = db.Column(db.String(20))
    lock_in_period = db.Column(db.String(50))
    liquidity = db.Column(db.String(20))
    tax_benefits = db.Column(db.Boolean, default=False)
    description = db.Column(db.Text)
    features = db.Column(db.JSON)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Partner(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    logo_url = db.Column(db.String(200))
    website = db.Column(db.String(200))
    category = db.Column(db.String(50))
    is_featured = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Consultation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lead_id = db.Column(db.Integer, db.ForeignKey('lead.id'), nullable=False)
    preferred_date = db.Column(db.Date)
    preferred_time = db.Column(db.Time)
    consultation_type = db.Column(db.String(50))  # online, offline, phone
    status = db.Column(db.String(20), default='scheduled')
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    lead = db.relationship('Lead', backref='consultations')

class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date_of_birth = db.Column(db.Date)
    occupation = db.Column(db.String(100))
    annual_income = db.Column(db.Numeric(15, 2))
    investment_experience = db.Column(db.String(20))  # beginner, intermediate, advanced
    risk_tolerance = db.Column(db.String(20))  # conservative, moderate, aggressive
    investment_goals = db.Column(db.JSON)  # List of goals
    financial_dependents = db.Column(db.Integer, default=0)
    emergency_fund_months = db.Column(db.Integer)
    preferred_investment_amount = db.Column(db.Numeric(15, 2))
    investment_timeline = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Portfolio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    portfolio_type = db.Column(db.String(50))  # sip, lumpsum, mixed
    initial_value = db.Column(db.Numeric(15, 2), default=0)
    current_value = db.Column(db.Numeric(15, 2), default=0)
    total_invested = db.Column(db.Numeric(15, 2), default=0)
    total_returns = db.Column(db.Numeric(15, 2), default=0)
    return_percentage = db.Column(db.Numeric(8, 4), default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    investments = db.relationship('PortfolioInvestment', backref='portfolio', lazy='dynamic', cascade='all, delete-orphan')

class PortfolioInvestment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolio.id'), nullable=False)
    investment_name = db.Column(db.String(100), nullable=False)
    investment_type = db.Column(db.String(50))  # mutual_fund, stock, bond, aif, etc.
    units = db.Column(db.Numeric(15, 6), default=0)
    avg_purchase_price = db.Column(db.Numeric(15, 4), default=0)
    current_price = db.Column(db.Numeric(15, 4), default=0)
    invested_amount = db.Column(db.Numeric(15, 2), default=0)
    current_value = db.Column(db.Numeric(15, 2), default=0)
    returns = db.Column(db.Numeric(15, 2), default=0)
    return_percentage = db.Column(db.Numeric(8, 4), default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolio.id'))
    transaction_type = db.Column(db.String(20), nullable=False)  # buy, sell, sip, dividend
    investment_name = db.Column(db.String(100), nullable=False)
    units = db.Column(db.Numeric(15, 6))
    price_per_unit = db.Column(db.Numeric(15, 4))
    amount = db.Column(db.Numeric(15, 2), nullable=False)
    fee = db.Column(db.Numeric(15, 2), default=0)
    net_amount = db.Column(db.Numeric(15, 2))
    transaction_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='completed')  # pending, completed, failed
    reference_number = db.Column(db.String(100), unique=True)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Goal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    target_amount = db.Column(db.Numeric(15, 2), nullable=False)
    current_amount = db.Column(db.Numeric(15, 2), default=0)
    target_date = db.Column(db.Date)
    priority = db.Column(db.String(20))  # high, medium, low
    category = db.Column(db.String(50))  # retirement, education, home, emergency, etc.
    monthly_contribution = db.Column(db.Numeric(15, 2))
    is_achieved = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    @property
    def progress_percentage(self):
        if self.target_amount > 0:
            return min((float(self.current_amount) / float(self.target_amount)) * 100, 100)
        return 0

class Query(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # Optional for anonymous queries
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    category = db.Column(db.String(50), nullable=False)  # Investment, Tax Planning, Retirement, etc.
    subject = db.Column(db.String(200))
    message = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='open')  # open, in_progress, resolved, closed
    priority = db.Column(db.String(10), default='medium')  # low, medium, high, urgent
    assigned_to = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # Admin user ID
    resolved_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', foreign_keys=[user_id], backref='queries')
    assigned_admin = db.relationship('User', foreign_keys=[assigned_to])

class Appointment(db.Model):
    __tablename__ = 'appointments'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    mobile = db.Column(db.Text, nullable=False)
    source_page = db.Column(db.String(100), default='homepage')
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='new')
    notes = db.Column(db.Text)

class SiteSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), unique=True, nullable=False)
    value = db.Column(db.Text)
    description = db.Column(db.Text)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Bank Model for Loan Comparisons
class Bank(db.Model):
    __tablename__ = 'banks'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    code = db.Column(db.String(20), unique=True, nullable=False)  # e.g., SBI, HDFC, ICICI
    logo_url = db.Column(db.String(500))
    description = db.Column(db.Text)
    customer_care = db.Column(db.String(50))
    website = db.Column(db.String(200))
    branch_count = db.Column(db.Integer)
    rating = db.Column(db.Numeric(3, 2))  # Out of 5
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    loan_products = db.relationship('LoanProduct', backref='bank', lazy='dynamic')

# Loan Product Management Models
class LoanProduct(db.Model):
    __tablename__ = 'loan_products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    product_code = db.Column(db.String(50), unique=True, nullable=False)
    bank_id = db.Column(db.Integer, db.ForeignKey('banks.id'), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # personal, home, auto, business, education, gold, property, car
    loan_type = db.Column(db.String(50), nullable=False)  # secured, unsecured
    
    # Loan Details
    min_amount = db.Column(db.Numeric(15, 2), nullable=False)
    max_amount = db.Column(db.Numeric(15, 2), nullable=False)
    min_tenure_months = db.Column(db.Integer, nullable=False)
    max_tenure_months = db.Column(db.Integer, nullable=False)
    interest_rate_min = db.Column(db.Numeric(5, 2), nullable=False)
    interest_rate_max = db.Column(db.Numeric(5, 2), nullable=False)
    processing_fee = db.Column(db.Numeric(5, 2))  # Percentage
    processing_fee_flat = db.Column(db.Numeric(10, 2))  # Flat amount
    
    # Eligibility Criteria
    min_age = db.Column(db.Integer, default=21)
    max_age = db.Column(db.Integer, default=65)
    min_income = db.Column(db.Numeric(10, 2))
    employment_types = db.Column(db.JSON)  # ['salaried', 'self_employed', 'business']
    credit_score_min = db.Column(db.Integer, default=650)
    
    # AMFI Compliance
    amfi_registered = db.Column(db.Boolean, default=True)
    risk_category = db.Column(db.String(20), nullable=False)  # low, moderate, high
    regulatory_info = db.Column(db.Text)
    compliance_notes = db.Column(db.Text)
    
    # Product Information
    description = db.Column(db.Text)
    features = db.Column(db.JSON)
    benefits = db.Column(db.JSON)
    documents_required = db.Column(db.JSON)
    terms_conditions = db.Column(db.Text)
    
    # Status and Metadata
    is_active = db.Column(db.Boolean, default=True)
    is_featured = db.Column(db.Boolean, default=False)
    display_order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    applications = db.relationship('LoanApplication', backref='product', lazy='dynamic')
    
    @property
    def average_interest_rate(self):
        return (self.interest_rate_min + self.interest_rate_max) / 2
    
    @property
    def tenure_display(self):
        if self.min_tenure_months == self.max_tenure_months:
            return f"{self.min_tenure_months} months"
        return f"{self.min_tenure_months}-{self.max_tenure_months} months"

class LoanApplication(db.Model):
    __tablename__ = 'loan_applications'
    
    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(db.String(50), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('loan_products.id'), nullable=False)
    
    # Application Details
    requested_amount = db.Column(db.Numeric(15, 2), nullable=False)
    tenure_months = db.Column(db.Integer, nullable=False)
    purpose = db.Column(db.String(200))
    
    # Applicant Information
    employment_type = db.Column(db.String(50))
    monthly_income = db.Column(db.Numeric(10, 2))
    existing_loans = db.Column(db.JSON)
    credit_score = db.Column(db.Integer)
    
    # Application Status
    status = db.Column(db.String(30), default='submitted')  # submitted, under_review, approved, rejected, disbursed
    approved_amount = db.Column(db.Numeric(15, 2))
    approved_rate = db.Column(db.Numeric(5, 2))
    rejection_reason = db.Column(db.Text)
    
    # Documents
    documents_uploaded = db.Column(db.JSON)
    verification_status = db.Column(db.String(30), default='pending')
    
    # Timestamps
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    reviewed_at = db.Column(db.DateTime)
    approved_at = db.Column(db.DateTime)
    disbursed_at = db.Column(db.DateTime)
    
    # Relationships
    user = db.relationship('User', backref='loan_applications')
    
    @property
    def emi_amount(self):
        if self.approved_amount and self.approved_rate and self.tenure_months:
            monthly_rate = float(self.approved_rate) / (12 * 100)
            return float(self.approved_amount) * monthly_rate * (1 + monthly_rate)**self.tenure_months / ((1 + monthly_rate)**self.tenure_months - 1)
        return 0

class FinancialProduct(db.Model):
    __tablename__ = 'financial_products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    product_code = db.Column(db.String(50), unique=True, nullable=False)
    category = db.Column(db.String(50), nullable=False)  # mutual_funds, insurance, bonds, fd, rd, nps, ulip
    sub_category = db.Column(db.String(50))
    
    # Product Details
    fund_house = db.Column(db.String(100))
    aum = db.Column(db.Numeric(15, 2))  # Assets Under Management
    inception_date = db.Column(db.Date)
    nav = db.Column(db.Numeric(10, 4))
    
    # Investment Details
    min_investment = db.Column(db.Numeric(15, 2))
    min_additional = db.Column(db.Numeric(15, 2))
    exit_load = db.Column(db.String(100))
    expense_ratio = db.Column(db.Numeric(5, 4))
    
    # Performance
    returns_1y = db.Column(db.Numeric(8, 4))
    returns_3y = db.Column(db.Numeric(8, 4))
    returns_5y = db.Column(db.Numeric(8, 4))
    benchmark_index = db.Column(db.String(100))
    
    # Risk and Ratings
    risk_level = db.Column(db.String(20))  # low, moderate, high
    risk_grade = db.Column(db.String(10))  # A+, A, B+, B, C
    rating_agencies = db.Column(db.JSON)
    
    # AMFI Compliance
    amfi_code = db.Column(db.String(20))
    scheme_type = db.Column(db.String(50))
    plan_type = db.Column(db.String(30))  # growth, dividend
    
    # Product Information
    description = db.Column(db.Text)
    investment_objective = db.Column(db.Text)
    asset_allocation = db.Column(db.JSON)
    top_holdings = db.Column(db.JSON)
    
    # Status and Metadata
    is_active = db.Column(db.Boolean, default=True)
    is_recommended = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    @property
    def latest_return(self):
        return self.returns_1y or 0
