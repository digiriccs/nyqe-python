"""
Initialize sample loan products and financial products for testing
"""
from app import app, db
from models import LoanProduct, FinancialProduct
from datetime import datetime, date

def create_sample_loan_products():
    """Create sample loan products"""
    
    loan_products = [
        {
            'name': 'Personal Loan Express',
            'product_code': 'PL001',
            'category': 'personal',
            'loan_type': 'unsecured',
            'min_amount': 50000,
            'max_amount': 2000000,
            'min_tenure_months': 12,
            'max_tenure_months': 60,
            'interest_rate_min': 10.99,
            'interest_rate_max': 18.99,
            'processing_fee': 2.5,
            'min_age': 21,
            'max_age': 60,
            'min_income': 25000,
            'employment_types': ['salaried', 'self_employed'],
            'credit_score_min': 700,
            'amfi_registered': True,
            'risk_category': 'moderate',
            'description': 'Quick personal loan with minimal documentation and fast approval process.',
            'features': [
                'No collateral required',
                'Quick approval in 24 hours',
                'Minimal documentation',
                'Flexible repayment options',
                'Pre-closure facility available'
            ],
            'benefits': [
                'Competitive interest rates',
                'No hidden charges',
                'Online application process',
                'Dedicated customer support',
                'EMI holiday facility'
            ],
            'documents_required': [
                'PAN Card',
                'Aadhaar Card',
                'Salary slips (3 months)',
                'Bank statements (6 months)',
                'Form 16'
            ],
            'is_active': True,
            'is_featured': True,
            'display_order': 1
        },
        {
            'name': 'Home Loan Premium',
            'product_code': 'HL001',
            'category': 'home',
            'loan_type': 'secured',
            'min_amount': 500000,
            'max_amount': 50000000,
            'min_tenure_months': 60,
            'max_tenure_months': 300,
            'interest_rate_min': 8.50,
            'interest_rate_max': 12.00,
            'processing_fee': 0.50,
            'min_age': 23,
            'max_age': 65,
            'min_income': 40000,
            'employment_types': ['salaried', 'self_employed', 'business'],
            'credit_score_min': 750,
            'amfi_registered': True,
            'risk_category': 'low',
            'description': 'Premium home loan with attractive rates for purchasing or constructing your dream home.',
            'features': [
                'Property as collateral',
                'Longest tenure up to 25 years',
                'Tax benefits under Section 80C and 24',
                'Step-up EMI facility',
                'Balance transfer facility'
            ],
            'benefits': [
                'Lowest interest rates',
                'High loan amount eligibility',
                'Flexible repayment options',
                'Free property valuation',
                'Life insurance cover'
            ],
            'documents_required': [
                'Property documents',
                'Income proof',
                'Identity and address proof',
                'Bank statements',
                'Property valuation report'
            ],
            'regulatory_info': 'Regulated by RBI guidelines for housing finance companies.',
            'is_active': True,
            'is_featured': True,
            'display_order': 2
        },
        {
            'name': 'Auto Loan Smart',
            'product_code': 'AL001',
            'category': 'auto',
            'loan_type': 'secured',
            'min_amount': 100000,
            'max_amount': 5000000,
            'min_tenure_months': 12,
            'max_tenure_months': 84,
            'interest_rate_min': 9.25,
            'interest_rate_max': 14.50,
            'processing_fee': 1.5,
            'min_age': 21,
            'max_age': 65,
            'min_income': 20000,
            'employment_types': ['salaried', 'self_employed'],
            'credit_score_min': 650,
            'amfi_registered': True,
            'risk_category': 'low',
            'description': 'Smart auto loan for new and used vehicles with competitive rates.',
            'features': [
                'Up to 90% vehicle financing',
                'New and used car loans',
                'Quick approval process',
                'Flexible tenure options',
                'Easy documentation'
            ],
            'benefits': [
                'Competitive interest rates',
                'No prepayment charges',
                'Insurance facility',
                'Fast loan processing',
                'Doorstep service'
            ],
            'is_active': True,
            'is_featured': False,
            'display_order': 3
        },
        {
            'name': 'Business Growth Loan',
            'product_code': 'BL001',
            'category': 'business',
            'loan_type': 'secured',
            'min_amount': 1000000,
            'max_amount': 100000000,
            'min_tenure_months': 12,
            'max_tenure_months': 120,
            'interest_rate_min': 11.50,
            'interest_rate_max': 16.00,
            'processing_fee': 1.0,
            'processing_fee_flat': 25000,
            'min_age': 25,
            'max_age': 65,
            'min_income': 100000,
            'employment_types': ['business', 'self_employed'],
            'credit_score_min': 700,
            'amfi_registered': True,
            'risk_category': 'moderate',
            'description': 'Fuel your business growth with our comprehensive business loan solutions.',
            'features': [
                'Working capital financing',
                'Equipment purchase loans',
                'Business expansion funding',
                'Flexible collateral options',
                'Overdraft facility'
            ],
            'benefits': [
                'Competitive business rates',
                'Customized repayment schedule',
                'Quick turnaround time',
                'Dedicated relationship manager',
                'Tax benefits on interest'
            ],
            'is_active': True,
            'is_featured': False,
            'display_order': 4
        },
        {
            'name': 'Education Loan Scholar',
            'product_code': 'EL001',
            'category': 'education',
            'loan_type': 'secured',
            'min_amount': 100000,
            'max_amount': 10000000,
            'min_tenure_months': 60,
            'max_tenure_months': 180,
            'interest_rate_min': 9.50,
            'interest_rate_max': 13.50,
            'processing_fee': 1.0,
            'min_age': 18,
            'max_age': 35,
            'min_income': 25000,
            'employment_types': ['salaried', 'self_employed', 'student'],
            'credit_score_min': 650,
            'amfi_registered': True,
            'risk_category': 'low',
            'description': 'Comprehensive education loan for higher studies in India and abroad.',
            'features': [
                'Covers tuition and living expenses',
                'Moratorium period available',
                'Covers domestic and international studies',
                'No collateral for loans up to ₹4 lakhs',
                'Simple interest during study period'
            ],
            'benefits': [
                'Tax benefits under Section 80E',
                'Flexible repayment options',
                'Special rates for premier institutions',
                'Scholar support program',
                'Career guidance assistance'
            ],
            'is_active': True,
            'is_featured': True,
            'display_order': 5
        }
    ]
    
    for product_data in loan_products:
        existing = LoanProduct.query.filter_by(product_code=product_data['product_code']).first()
        if not existing:
            product = LoanProduct(**product_data)
            db.session.add(product)
    
    db.session.commit()
    print(f"Created {len(loan_products)} loan products")

def create_sample_financial_products():
    """Create sample financial products"""
    
    financial_products = [
        {
            'name': 'SBI Large Cap Fund - Growth',
            'product_code': 'MF001',
            'category': 'mutual_funds',
            'sub_category': 'large_cap',
            'fund_house': 'SBI Mutual Fund',
            'aum': 15000.0,
            'inception_date': date(2010, 3, 15),
            'nav': 145.67,
            'min_investment': 1000,
            'min_additional': 100,
            'exit_load': '1% if redeemed within 1 year',
            'expense_ratio': 1.85,
            'returns_1y': 12.5,
            'returns_3y': 14.2,
            'returns_5y': 11.8,
            'benchmark_index': 'Nifty 100',
            'risk_level': 'moderate',
            'risk_grade': 'A+',
            'amfi_code': 'SBI001',
            'scheme_type': 'Open Ended',
            'plan_type': 'growth',
            'description': 'Diversified large cap equity fund focusing on blue chip companies.',
            'investment_objective': 'To provide long term capital appreciation by investing in large cap stocks.',
            'asset_allocation': {
                'equity': 95,
                'debt': 3,
                'cash': 2
            },
            'top_holdings': [
                'Reliance Industries - 8.5%',
                'TCS - 7.2%',
                'HDFC Bank - 6.8%',
                'Infosys - 5.4%',
                'ICICI Bank - 4.9%'
            ],
            'is_active': True,
            'is_recommended': True
        },
        {
            'name': 'HDFC Balanced Advantage Fund',
            'product_code': 'MF002',
            'category': 'mutual_funds',
            'sub_category': 'hybrid',
            'fund_house': 'HDFC Mutual Fund',
            'aum': 8500.0,
            'inception_date': date(2012, 8, 20),
            'nav': 89.34,
            'min_investment': 5000,
            'min_additional': 500,
            'exit_load': '1% if redeemed within 1 year',
            'expense_ratio': 2.10,
            'returns_1y': 10.8,
            'returns_3y': 12.1,
            'returns_5y': 9.5,
            'benchmark_index': 'Nifty 50 Hybrid Composite Debt 15:85 Index',
            'risk_level': 'moderate',
            'risk_grade': 'A',
            'amfi_code': 'HDFC002',
            'scheme_type': 'Open Ended',
            'plan_type': 'growth',
            'description': 'Dynamic asset allocation fund balancing equity and debt based on market conditions.',
            'investment_objective': 'To provide capital appreciation and income distribution through dynamic asset allocation.',
            'is_active': True,
            'is_recommended': True
        },
        {
            'name': 'ICICI Prudential Gilt Fund',
            'product_code': 'MF003',
            'category': 'mutual_funds',
            'sub_category': 'debt',
            'fund_house': 'ICICI Prudential Mutual Fund',
            'aum': 3200.0,
            'inception_date': date(2008, 5, 12),
            'nav': 67.89,
            'min_investment': 5000,
            'min_additional': 1000,
            'exit_load': 'Nil',
            'expense_ratio': 1.95,
            'returns_1y': 6.2,
            'returns_3y': 7.1,
            'returns_5y': 6.8,
            'benchmark_index': 'Nifty 10 year Benchmark G-Sec Index',
            'risk_level': 'low',
            'risk_grade': 'AA',
            'amfi_code': 'ICICI003',
            'scheme_type': 'Open Ended',
            'plan_type': 'growth',
            'description': 'Government securities fund providing stable returns with low risk.',
            'investment_objective': 'To provide stable income and capital preservation through government securities.',
            'is_active': True,
            'is_recommended': False
        },
        {
            'name': 'LIC Jeevan Anand Policy',
            'product_code': 'INS001',
            'category': 'insurance',
            'sub_category': 'life_insurance',
            'fund_house': 'Life Insurance Corporation of India',
            'min_investment': 50000,
            'description': 'Comprehensive life insurance with savings benefits.',
            'investment_objective': 'To provide life cover with guaranteed returns and bonus participation.',
            'risk_level': 'low',
            'is_active': True,
            'is_recommended': True
        },
        {
            'name': 'SBI Fixed Deposit',
            'product_code': 'FD001',
            'category': 'fd',
            'sub_category': 'term_deposit',
            'fund_house': 'State Bank of India',
            'min_investment': 1000,
            'returns_1y': 6.5,
            'risk_level': 'low',
            'risk_grade': 'AAA',
            'description': 'Safe and secure fixed deposit with guaranteed returns.',
            'investment_objective': 'To provide guaranteed returns with capital protection.',
            'is_active': True,
            'is_recommended': False
        }
    ]
    
    for product_data in financial_products:
        existing = FinancialProduct.query.filter_by(product_code=product_data['product_code']).first()
        if not existing:
            product = FinancialProduct(**product_data)
            db.session.add(product)
    
    db.session.commit()
    print(f"Created {len(financial_products)} financial products")

def main():
    """Initialize all sample data"""
    with app.app_context():
        print("Creating sample loan products...")
        create_sample_loan_products()
        
        print("Creating sample financial products...")
        create_sample_financial_products()
        
        print("Sample data initialization completed!")

if __name__ == '__main__':
    main()