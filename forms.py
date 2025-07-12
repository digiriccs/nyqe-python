from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, DecimalField, DateField, TimeField, HiddenField, PasswordField, IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Email, Optional, NumberRange, Length, EqualTo, ValidationError
from models import User
from wtforms.widgets import HiddenInput

class LeadForm(FlaskForm):
    name = StringField('Full Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    phone = StringField('Phone Number', validators=[Optional()])
    service_interest = SelectField('Service Interest', choices=[
        ('', 'Select Service'),
        ('investment-advisory', 'Investment Advisory'),
        ('financial-planning', 'Financial Planning'),
        ('retirement-planning', 'Retirement Planning'),
        ('tax-optimization', 'Tax Optimization'),
        ('portfolio-management', 'Portfolio Management')
    ], validators=[Optional()])
    investment_amount = DecimalField('Investment Amount (₹)', validators=[Optional(), NumberRange(min=0)])
    investment_timeline = SelectField('Investment Timeline', choices=[
        ('', 'Select Timeline'),
        ('less-than-1-year', 'Less than 1 year'),
        ('1-3-years', '1-3 years'),
        ('3-5-years', '3-5 years'),
        ('5-10-years', '5-10 years'),
        ('more-than-10-years', 'More than 10 years')
    ], validators=[Optional()])
    risk_tolerance = SelectField('Risk Tolerance', choices=[
        ('', 'Select Risk Level'),
        ('conservative', 'Conservative'),
        ('moderate', 'Moderate'),
        ('aggressive', 'Aggressive')
    ], validators=[Optional()])
    message = TextAreaField('Message', validators=[Optional()])

class ConsultationForm(FlaskForm):
    lead_id = HiddenField()
    preferred_date = DateField('Preferred Date', validators=[DataRequired()])
    preferred_time = TimeField('Preferred Time', validators=[DataRequired()])
    consultation_type = SelectField('Consultation Type', choices=[
        ('online', 'Online Meeting'),
        ('offline', 'Office Visit'),
        ('phone', 'Phone Call')
    ], validators=[DataRequired()])

class ContactForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    subject = StringField('Subject', validators=[DataRequired()])
    message = TextAreaField('Message', validators=[DataRequired()])

# Authentication Forms
class LoginForm(FlaskForm):
    username_or_email = StringField('Username or Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember me')

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[
        DataRequired(), 
        Length(min=4, max=20, message='Username must be 4-20 characters long')
    ])
    email = StringField('Email', validators=[DataRequired(), Email()])
    name = StringField('Full Name', validators=[DataRequired(), Length(max=100)])
    phone = StringField('Mobile Number', validators=[DataRequired(), Length(max=20)])
    password = PasswordField('Password', validators=[
        DataRequired(),
        Length(min=8, message='Password must be at least 8 characters long')
    ])
    password2 = PasswordField('Confirm Password', validators=[
        DataRequired(),
        EqualTo('password', message='Passwords must match')
    ])
    
    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError('Please use a different username.')
    
    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('Please use a different email address.')

class ProfileForm(FlaskForm):
    name = StringField('Full Name', validators=[DataRequired(), Length(max=100)])
    phone = StringField('Mobile Number', validators=[DataRequired(), Length(max=20)])
    date_of_birth = DateField('Date of Birth', validators=[Optional()])
    occupation = StringField('Occupation', validators=[Optional(), Length(max=100)])
    annual_income = DecimalField('Annual Income (₹)', validators=[Optional(), NumberRange(min=0)])
    
    investment_experience = SelectField('Investment Experience', choices=[
        ('', 'Select Experience Level'),
        ('beginner', 'Beginner (0-2 years)'),
        ('intermediate', 'Intermediate (2-5 years)'),
        ('advanced', 'Advanced (5+ years)')
    ], validators=[Optional()])
    
    risk_tolerance = SelectField('Risk Tolerance', choices=[
        ('', 'Select Risk Level'),
        ('conservative', 'Conservative'),
        ('moderate', 'Moderate'),
        ('aggressive', 'Aggressive')
    ], validators=[Optional()])
    
    financial_dependents = IntegerField('Financial Dependents', validators=[Optional(), NumberRange(min=0)])
    emergency_fund_months = IntegerField('Emergency Fund (Months)', validators=[Optional(), NumberRange(min=0)])
    preferred_investment_amount = DecimalField('Preferred Investment Amount (₹)', validators=[Optional(), NumberRange(min=0)])
    
    investment_timeline = SelectField('Investment Timeline', choices=[
        ('', 'Select Timeline'),
        ('less-than-1-year', 'Less than 1 year'),
        ('1-3-years', '1-3 years'),
        ('3-5-years', '3-5 years'),
        ('5-10-years', '5-10 years'),
        ('more-than-10-years', 'More than 10 years')
    ], validators=[Optional()])

class ChangePasswordForm(FlaskForm):
    current_password = PasswordField('Current Password', validators=[DataRequired()])
    new_password = PasswordField('New Password', validators=[
        DataRequired(),
        Length(min=8, message='Password must be at least 8 characters long')
    ])
    new_password2 = PasswordField('Confirm New Password', validators=[
        DataRequired(),
        EqualTo('new_password', message='Passwords must match')
    ])

class GoalForm(FlaskForm):
    name = StringField('Goal Name', validators=[DataRequired(), Length(max=100)])
    description = TextAreaField('Description', validators=[Optional()])
    target_amount = DecimalField('Target Amount (₹)', validators=[DataRequired(), NumberRange(min=1)])
    target_date = DateField('Target Date', validators=[Optional()])
    monthly_contribution = DecimalField('Monthly Contribution (₹)', validators=[Optional(), NumberRange(min=0)])
    
    priority = SelectField('Priority', choices=[
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low')
    ], validators=[DataRequired()])
    
    category = SelectField('Category', choices=[
        ('retirement', 'Retirement'),
        ('education', 'Education'),
        ('home', 'Home Purchase'),
        ('emergency', 'Emergency Fund'),
        ('vacation', 'Vacation'),
        ('other', 'Other')
    ], validators=[DataRequired()])

# CMS Forms for Admin Panel
class ServiceForm(FlaskForm):
    name = StringField('Service Name', validators=[DataRequired(), Length(max=100)])
    slug = StringField('URL Slug', validators=[DataRequired(), Length(max=100)])
    title = StringField('Page Title', validators=[Optional(), Length(max=200)])
    description = TextAreaField('Short Description', validators=[Optional()])
    content = TextAreaField('Full Content', validators=[Optional()])
    features = TextAreaField('Features (JSON)', validators=[Optional()])
    benefits = TextAreaField('Benefits (JSON)', validators=[Optional()])
    is_active = BooleanField('Active')
    submit = SubmitField('Save Service')

class InvestmentForm(FlaskForm):
    name = StringField('Investment Name', validators=[DataRequired(), Length(max=100)])
    slug = StringField('URL Slug', validators=[DataRequired(), Length(max=100)])
    category = SelectField('Category', choices=[
        ('mutual_funds', 'Mutual Funds'),
        ('fixed_income', 'Fixed Income'),
        ('equity', 'Direct Equity'),
        ('alternative', 'Alternative Investments'),
        ('bonds', 'Bonds'),
        ('commodities', 'Commodities')
    ], validators=[DataRequired()])
    risk_level = SelectField('Risk Level', choices=[
        ('low', 'Low'),
        ('moderate', 'Moderate'),
        ('high', 'High')
    ], validators=[DataRequired()])
    min_investment = DecimalField('Minimum Investment (₹)', validators=[Optional(), NumberRange(min=0)])
    expected_returns = StringField('Expected Returns', validators=[Optional(), Length(max=20)])
    lock_in_period = StringField('Lock-in Period', validators=[Optional(), Length(max=50)])
    liquidity = SelectField('Liquidity', choices=[
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low')
    ], validators=[Optional()])
    tax_benefits = BooleanField('Tax Benefits Available')
    description = TextAreaField('Description', validators=[Optional()])
    features = TextAreaField('Features (JSON)', validators=[Optional()])
    is_active = BooleanField('Active')
    submit = SubmitField('Save Investment')

class PartnerForm(FlaskForm):
    name = StringField('Partner Name', validators=[DataRequired(), Length(max=100)])
    logo_url = StringField('Logo URL', validators=[Optional(), Length(max=200)])
    website = StringField('Website', validators=[Optional(), Length(max=200)])
    category = SelectField('Category', choices=[
        ('broker', 'Broker'),
        ('fund_house', 'Fund House'),
        ('insurance', 'Insurance'),
        ('bank', 'Bank'),
        ('platform', 'Platform'),
        ('other', 'Other')
    ], validators=[Optional()])
    is_featured = BooleanField('Featured Partner')
    is_active = BooleanField('Active')
    submit = SubmitField('Save Partner')

class QueryForm(FlaskForm):
    name = StringField('Full Name', validators=[DataRequired(), Length(max=100)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    phone = StringField('Phone Number', validators=[Optional(), Length(max=20)])
    category = SelectField('Category', choices=[
        ('investment', 'Investment'),
        ('tax-planning', 'Tax Planning'),
        ('retirement', 'Retirement Planning'),
        ('portfolio-management', 'Portfolio Management'),
        ('financial-planning', 'Financial Planning'),
        ('insurance', 'Insurance'),
        ('general', 'General Inquiry')
    ], validators=[DataRequired()])
    subject = StringField('Subject', validators=[Optional(), Length(max=200)])
    message = TextAreaField('Your Message', validators=[DataRequired(), Length(min=10, max=2000)])
    submit = SubmitField('Submit Query')

class SiteSettingsForm(FlaskForm):
    site_title = StringField('Site Title', validators=[Optional(), Length(max=100)])
    site_description = TextAreaField('Site Description', validators=[Optional()])
    contact_email = StringField('Contact Email', validators=[Optional(), Email()])
    contact_phone = StringField('Contact Phone', validators=[Optional(), Length(max=20)])
    office_address = TextAreaField('Office Address', validators=[Optional()])
    social_facebook = StringField('Facebook URL', validators=[Optional(), Length(max=200)])
    social_linkedin = StringField('LinkedIn URL', validators=[Optional(), Length(max=200)])
    social_twitter = StringField('Twitter URL', validators=[Optional(), Length(max=200)])
    hero_title = StringField('Hero Title', validators=[Optional(), Length(max=200)])
    hero_subtitle = TextAreaField('Hero Subtitle', validators=[Optional()])
    about_content = TextAreaField('About Us Content', validators=[Optional()])
    submit = SubmitField('Save Settings')

# Loan Product Management Forms
class LoanProductForm(FlaskForm):
    name = StringField('Product Name', validators=[DataRequired(), Length(max=200)])
    product_code = StringField('Product Code', validators=[DataRequired(), Length(max=50)])
    category = SelectField('Category', choices=[
        ('personal', 'Personal Loan'),
        ('home', 'Home Loan'),
        ('auto', 'Auto Loan'),
        ('business', 'Business Loan'),
        ('education', 'Education Loan')
    ], validators=[DataRequired()])
    loan_type = SelectField('Loan Type', choices=[
        ('secured', 'Secured'),
        ('unsecured', 'Unsecured')
    ], validators=[DataRequired()])
    
    # Loan Details
    min_amount = DecimalField('Minimum Amount (₹)', validators=[DataRequired(), NumberRange(min=1000)])
    max_amount = DecimalField('Maximum Amount (₹)', validators=[DataRequired(), NumberRange(min=1000)])
    min_tenure_months = IntegerField('Minimum Tenure (Months)', validators=[DataRequired(), NumberRange(min=1)])
    max_tenure_months = IntegerField('Maximum Tenure (Months)', validators=[DataRequired(), NumberRange(min=1)])
    interest_rate_min = DecimalField('Minimum Interest Rate (%)', validators=[DataRequired(), NumberRange(min=0)])
    interest_rate_max = DecimalField('Maximum Interest Rate (%)', validators=[DataRequired(), NumberRange(min=0)])
    processing_fee = DecimalField('Processing Fee (%)', validators=[Optional(), NumberRange(min=0)])
    processing_fee_flat = DecimalField('Processing Fee Flat (₹)', validators=[Optional(), NumberRange(min=0)])
    
    # Eligibility
    min_age = IntegerField('Minimum Age', validators=[DataRequired(), NumberRange(min=18, max=100)])
    max_age = IntegerField('Maximum Age', validators=[DataRequired(), NumberRange(min=18, max=100)])
    min_income = DecimalField('Minimum Income (₹)', validators=[Optional(), NumberRange(min=0)])
    credit_score_min = IntegerField('Minimum Credit Score', validators=[Optional(), NumberRange(min=300, max=900)])
    
    # AMFI Compliance
    amfi_registered = BooleanField('AMFI Registered')
    risk_category = SelectField('Risk Category', choices=[
        ('low', 'Low Risk'),
        ('moderate', 'Moderate Risk'),
        ('high', 'High Risk')
    ], validators=[DataRequired()])
    regulatory_info = TextAreaField('Regulatory Information')
    compliance_notes = TextAreaField('Compliance Notes')
    
    # Product Information
    description = TextAreaField('Description')
    terms_conditions = TextAreaField('Terms & Conditions')
    
    # Status
    is_active = BooleanField('Active')
    is_featured = BooleanField('Featured')
    display_order = IntegerField('Display Order', validators=[Optional(), NumberRange(min=0)])
    
    submit = SubmitField('Save Product')

class LoanApplicationForm(FlaskForm):
    product_id = SelectField('Loan Product', coerce=int, validators=[DataRequired()])
    requested_amount = DecimalField('Requested Amount (₹)', validators=[DataRequired(), NumberRange(min=1000)])
    tenure_months = IntegerField('Tenure (Months)', validators=[DataRequired(), NumberRange(min=1)])
    purpose = StringField('Purpose of Loan', validators=[Optional(), Length(max=200)])
    
    # Applicant Information
    employment_type = SelectField('Employment Type', choices=[
        ('salaried', 'Salaried'),
        ('self_employed', 'Self Employed'),
        ('business', 'Business Owner')
    ], validators=[DataRequired()])
    monthly_income = DecimalField('Monthly Income (₹)', validators=[DataRequired(), NumberRange(min=0)])
    credit_score = IntegerField('Credit Score', validators=[Optional(), NumberRange(min=300, max=900)])
    
    submit = SubmitField('Submit Application')

class FinancialProductForm(FlaskForm):
    name = StringField('Product Name', validators=[DataRequired(), Length(max=200)])
    product_code = StringField('Product Code', validators=[DataRequired(), Length(max=50)])
    category = SelectField('Category', choices=[
        ('mutual_funds', 'Mutual Funds'),
        ('insurance', 'Insurance'),
        ('bonds', 'Bonds'),
        ('fd', 'Fixed Deposits'),
        ('rd', 'Recurring Deposits'),
        ('nps', 'National Pension Scheme'),
        ('ulip', 'ULIP')
    ], validators=[DataRequired()])
    sub_category = StringField('Sub Category', validators=[Optional(), Length(max=50)])
    
    # Product Details
    fund_house = StringField('Fund House', validators=[Optional(), Length(max=100)])
    aum = DecimalField('AUM (₹ Crores)', validators=[Optional(), NumberRange(min=0)])
    nav = DecimalField('NAV', validators=[Optional(), NumberRange(min=0)])
    
    # Investment Details
    min_investment = DecimalField('Minimum Investment (₹)', validators=[Optional(), NumberRange(min=0)])
    min_additional = DecimalField('Minimum Additional (₹)', validators=[Optional(), NumberRange(min=0)])
    exit_load = StringField('Exit Load', validators=[Optional(), Length(max=100)])
    expense_ratio = DecimalField('Expense Ratio (%)', validators=[Optional(), NumberRange(min=0)])
    
    # Performance
    returns_1y = DecimalField('1 Year Returns (%)', validators=[Optional()])
    returns_3y = DecimalField('3 Year Returns (%)', validators=[Optional()])
    returns_5y = DecimalField('5 Year Returns (%)', validators=[Optional()])
    benchmark_index = StringField('Benchmark Index', validators=[Optional(), Length(max=100)])
    
    # Risk and Ratings
    risk_level = SelectField('Risk Level', choices=[
        ('low', 'Low'),
        ('moderate', 'Moderate'),
        ('high', 'High')
    ], validators=[Optional()])
    risk_grade = StringField('Risk Grade', validators=[Optional(), Length(max=10)])
    
    # AMFI Compliance
    amfi_code = StringField('AMFI Code', validators=[Optional(), Length(max=20)])
    scheme_type = StringField('Scheme Type', validators=[Optional(), Length(max=50)])
    plan_type = SelectField('Plan Type', choices=[
        ('growth', 'Growth'),
        ('dividend', 'Dividend')
    ], validators=[Optional()])
    
    # Product Information
    description = TextAreaField('Description')
    investment_objective = TextAreaField('Investment Objective')
    
    # Status
    is_active = BooleanField('Active')
    is_recommended = BooleanField('Recommended')
    
    submit = SubmitField('Save Product')
