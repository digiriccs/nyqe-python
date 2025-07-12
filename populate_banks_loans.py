#!/usr/bin/env python3
"""Populate banks and comprehensive loan products"""

from app import app, db
from models import Bank, LoanProduct
import random

def create_banks():
    """Create major banks in India"""
    banks_data = [
        {
            'name': 'State Bank of India',
            'code': 'SBI',
            'description': 'India\'s largest public sector bank with extensive branch network',
            'customer_care': '1800-425-3800',
            'website': 'https://sbi.co.in',
            'branch_count': 22000,
            'rating': 4.2
        },
        {
            'name': 'HDFC Bank',
            'code': 'HDFC',
            'description': 'Leading private sector bank with innovative digital services',
            'customer_care': '1800-267-3333',
            'website': 'https://www.hdfcbank.com',
            'branch_count': 6000,
            'rating': 4.5
        },
        {
            'name': 'ICICI Bank',
            'code': 'ICICI',
            'description': 'Premier private bank offering comprehensive financial solutions',
            'customer_care': '1800-200-3344',
            'website': 'https://www.icicibank.com',
            'branch_count': 5500,
            'rating': 4.3
        },
        {
            'name': 'Axis Bank',
            'code': 'AXIS',
            'description': 'Third largest private sector bank with strong retail presence',
            'customer_care': '1800-419-5555',
            'website': 'https://www.axisbank.com',
            'branch_count': 4600,
            'rating': 4.1
        },
        {
            'name': 'Kotak Mahindra Bank',
            'code': 'KOTAK',
            'description': 'Leading private bank known for competitive interest rates',
            'customer_care': '1800-209-5566',
            'website': 'https://www.kotak.com',
            'branch_count': 1600,
            'rating': 4.4
        },
        {
            'name': 'Bank of Baroda',
            'code': 'BOB',
            'description': 'Major public sector bank with global presence',
            'customer_care': '1800-258-4455',
            'website': 'https://www.bankofbaroda.in',
            'branch_count': 8200,
            'rating': 3.9
        },
        {
            'name': 'Punjab National Bank',
            'code': 'PNB',
            'description': 'Second largest public sector bank in India',
            'customer_care': '1800-180-2222',
            'website': 'https://www.pnbindia.in',
            'branch_count': 10000,
            'rating': 3.8
        },
        {
            'name': 'IndusInd Bank',
            'code': 'INDUS',
            'description': 'New generation private bank with focus on technology',
            'customer_care': '1800-209-7777',
            'website': 'https://www.indusind.com',
            'branch_count': 2000,
            'rating': 4.2
        },
        {
            'name': 'Yes Bank',
            'code': 'YES',
            'description': 'Private bank offering innovative banking solutions',
            'customer_care': '1800-1200',
            'website': 'https://www.yesbank.in',
            'branch_count': 1100,
            'rating': 3.7
        },
        {
            'name': 'IDFC First Bank',
            'code': 'IDFC',
            'description': 'New age bank with customer-first approach',
            'customer_care': '1800-209-4151',
            'website': 'https://www.idfcfirstbank.com',
            'branch_count': 800,
            'rating': 4.0
        }
    ]
    
    banks = []
    for data in banks_data:
        bank = Bank(**data)
        banks.append(bank)
        db.session.add(bank)
    
    db.session.commit()
    return banks

def create_comprehensive_loan_products(banks):
    """Create extensive loan products for all banks"""
    
    # Loan categories with detailed variations
    loan_templates = {
        'home': [
            {'name': 'Dream Home Loan', 'min_rate': 8.5, 'max_rate': 9.5, 'max_amount': 50000000, 'tenure': 360},
            {'name': 'Affordable Housing Loan', 'min_rate': 7.5, 'max_rate': 8.5, 'max_amount': 5000000, 'tenure': 240},
            {'name': 'Home Construction Loan', 'min_rate': 9.0, 'max_rate': 10.0, 'max_amount': 30000000, 'tenure': 300},
            {'name': 'Home Renovation Loan', 'min_rate': 9.5, 'max_rate': 11.0, 'max_amount': 10000000, 'tenure': 180},
            {'name': 'Plot Purchase Loan', 'min_rate': 9.0, 'max_rate': 10.5, 'max_amount': 20000000, 'tenure': 240},
            {'name': 'NRI Home Loan', 'min_rate': 9.5, 'max_rate': 11.0, 'max_amount': 100000000, 'tenure': 300},
        ],
        'personal': [
            {'name': 'Instant Personal Loan', 'min_rate': 10.5, 'max_rate': 16.0, 'max_amount': 4000000, 'tenure': 60},
            {'name': 'Salary Account Personal Loan', 'min_rate': 10.0, 'max_rate': 14.0, 'max_amount': 5000000, 'tenure': 84},
            {'name': 'Wedding Loan', 'min_rate': 11.0, 'max_rate': 18.0, 'max_amount': 3000000, 'tenure': 60},
            {'name': 'Medical Emergency Loan', 'min_rate': 11.5, 'max_rate': 15.0, 'max_amount': 2000000, 'tenure': 48},
            {'name': 'Travel Loan', 'min_rate': 12.0, 'max_rate': 19.0, 'max_amount': 1500000, 'tenure': 36},
            {'name': 'Debt Consolidation Loan', 'min_rate': 13.0, 'max_rate': 20.0, 'max_amount': 5000000, 'tenure': 72},
        ],
        'business': [
            {'name': 'MSME Business Loan', 'min_rate': 11.0, 'max_rate': 14.0, 'max_amount': 20000000, 'tenure': 84},
            {'name': 'Working Capital Loan', 'min_rate': 12.0, 'max_rate': 16.0, 'max_amount': 10000000, 'tenure': 48},
            {'name': 'Term Loan for Business', 'min_rate': 11.5, 'max_rate': 15.0, 'max_amount': 50000000, 'tenure': 120},
            {'name': 'Machinery Finance', 'min_rate': 10.5, 'max_rate': 13.5, 'max_amount': 30000000, 'tenure': 84},
            {'name': 'Startup Business Loan', 'min_rate': 13.0, 'max_rate': 18.0, 'max_amount': 5000000, 'tenure': 60},
            {'name': 'Overdraft Facility', 'min_rate': 12.5, 'max_rate': 17.0, 'max_amount': 15000000, 'tenure': 12},
        ],
        'education': [
            {'name': 'Student Education Loan', 'min_rate': 9.0, 'max_rate': 11.5, 'max_amount': 2000000, 'tenure': 180},
            {'name': 'Foreign Education Loan', 'min_rate': 10.0, 'max_rate': 12.5, 'max_amount': 10000000, 'tenure': 180},
            {'name': 'Skill Development Loan', 'min_rate': 9.5, 'max_rate': 11.0, 'max_amount': 500000, 'tenure': 60},
            {'name': 'Professional Course Loan', 'min_rate': 10.5, 'max_rate': 13.0, 'max_amount': 4000000, 'tenure': 120},
            {'name': 'Parent Loan for Education', 'min_rate': 11.0, 'max_rate': 14.0, 'max_amount': 5000000, 'tenure': 84},
        ],
        'auto': [
            {'name': 'New Car Loan', 'min_rate': 8.5, 'max_rate': 11.0, 'max_amount': 5000000, 'tenure': 84},
            {'name': 'Used Car Loan', 'min_rate': 11.0, 'max_rate': 15.0, 'max_amount': 2000000, 'tenure': 60},
            {'name': 'Two Wheeler Loan', 'min_rate': 10.0, 'max_rate': 16.0, 'max_amount': 300000, 'tenure': 48},
            {'name': 'Electric Vehicle Loan', 'min_rate': 7.5, 'max_rate': 10.0, 'max_amount': 3000000, 'tenure': 72},
            {'name': 'Commercial Vehicle Loan', 'min_rate': 10.0, 'max_rate': 14.0, 'max_amount': 10000000, 'tenure': 60},
        ],
        'gold': [
            {'name': 'Gold Loan', 'min_rate': 7.0, 'max_rate': 12.0, 'max_amount': 5000000, 'tenure': 36},
            {'name': 'Agri Gold Loan', 'min_rate': 6.5, 'max_rate': 10.0, 'max_amount': 2000000, 'tenure': 24},
            {'name': 'Gold Overdraft', 'min_rate': 9.0, 'max_rate': 14.0, 'max_amount': 10000000, 'tenure': 12},
        ],
        'property': [
            {'name': 'Loan Against Property', 'min_rate': 9.0, 'max_rate': 12.5, 'max_amount': 100000000, 'tenure': 180},
            {'name': 'Commercial Property Loan', 'min_rate': 10.0, 'max_rate': 13.5, 'max_amount': 200000000, 'tenure': 240},
            {'name': 'Lease Rental Discounting', 'min_rate': 11.0, 'max_rate': 14.0, 'max_amount': 50000000, 'tenure': 120},
        ]
    }
    
    product_count = 0
    for bank in banks:
        for category, products in loan_templates.items():
            # Each bank gets 2-3 products per category with variations
            selected_products = random.sample(products, min(len(products), random.randint(2, 3)))
            
            for product_template in selected_products:
                # Add bank-specific variations
                rate_variation = random.uniform(-0.5, 0.5)
                
                loan_product = LoanProduct(
                    name=f"{bank.name} {product_template['name']}",
                    product_code=f"{bank.code}_{category.upper()}_{random.randint(1000, 9999)}",
                    bank_id=bank.id,
                    category=category,
                    loan_type='secured' if category in ['home', 'auto', 'gold', 'property'] else 'unsecured',
                    min_amount=50000 if category != 'business' else 100000,
                    max_amount=product_template['max_amount'],
                    min_tenure_months=12,
                    max_tenure_months=product_template['tenure'],
                    interest_rate_min=max(5.0, product_template['min_rate'] + rate_variation),
                    interest_rate_max=product_template['max_rate'] + rate_variation,
                    processing_fee=random.uniform(0.5, 2.0),
                    processing_fee_flat=random.choice([0, 999, 1999, 2999]),
                    min_age=21 if category != 'education' else 18,
                    max_age=65 if category != 'education' else 35,
                    min_income=25000 if category == 'personal' else 50000,
                    employment_types=['salaried', 'self_employed', 'business'],
                    credit_score_min=random.choice([650, 700, 750]),
                    amfi_registered=True,
                    risk_category=random.choice(['low', 'moderate', 'moderate', 'high']),
                    description=f"Get {product_template['name']} from {bank.name} with competitive rates and flexible terms.",
                    features=[
                        'Quick approval process',
                        'Minimal documentation',
                        'Flexible repayment options',
                        'No prepayment charges',
                        'Online application'
                    ],
                    benefits=[
                        'Competitive interest rates',
                        'Long repayment tenure',
                        'Easy eligibility criteria',
                        'Doorstep service available',
                        'Dedicated relationship manager'
                    ],
                    documents_required=[
                        'Identity proof (Aadhaar/PAN)',
                        'Address proof',
                        'Income proof (Salary slips/ITR)',
                        'Bank statements',
                        'Employment proof'
                    ],
                    is_active=True,
                    is_featured=random.random() < 0.2,  # 20% featured
                    display_order=product_count
                )
                
                db.session.add(loan_product)
                product_count += 1
    
    db.session.commit()
    print(f"Created {product_count} loan products across {len(banks)} banks")

def main():
    with app.app_context():
        # Clear existing data
        LoanProduct.query.delete()
        Bank.query.delete()
        db.session.commit()
        
        # Create banks
        print("Creating banks...")
        banks = create_banks()
        print(f"Created {len(banks)} banks")
        
        # Create loan products
        print("Creating comprehensive loan products...")
        create_comprehensive_loan_products(banks)
        
        print("Database populated successfully!")

if __name__ == '__main__':
    main()