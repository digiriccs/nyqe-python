#!/usr/bin/env python3
"""
Sample data initialization script for NYQE Wealth Management
This script creates demo users with sample portfolios and transactions for testing
"""

from datetime import datetime, timedelta
from decimal import Decimal
import random

from app import app, db
from models import User, UserProfile, Portfolio, PortfolioInvestment, Transaction, Goal

def create_sample_users():
    """Create sample users with different profiles"""
    
    # Demo user 1: Beginner investor
    user1 = User()
    user1.username = 'demo_user'
    user1.email = 'demo@example.com'
    user1.name = 'John Smith'
    user1.phone = '+91-9876543210'
    user1.set_password('demo123')
    user1.email_verified = True
    
    db.session.add(user1)
    db.session.flush()
    
    # Profile for user1
    profile1 = UserProfile()
    profile1.user_id = user1.id
    profile1.annual_income = Decimal('600000')
    profile1.investment_experience = 'beginner'
    profile1.risk_tolerance = 'moderate'
    profile1.financial_dependents = 2
    profile1.emergency_fund_months = 6
    profile1.preferred_investment_amount = Decimal('10000')
    profile1.investment_timeline = '3-5-years'
    profile1.occupation = 'Software Engineer'
    
    db.session.add(profile1)
    
    # Demo user 2: Advanced investor
    user2 = User()
    user2.username = 'advanced_user'
    user2.email = 'advanced@example.com'
    user2.name = 'Sarah Johnson'
    user2.phone = '+91-8765432109'
    user2.set_password('demo123')
    user2.email_verified = True
    
    db.session.add(user2)
    db.session.flush()
    
    # Profile for user2
    profile2 = UserProfile()
    profile2.user_id = user2.id
    profile2.annual_income = Decimal('1200000')
    profile2.investment_experience = 'advanced'
    profile2.risk_tolerance = 'aggressive'
    profile2.financial_dependents = 1
    profile2.emergency_fund_months = 12
    profile2.preferred_investment_amount = Decimal('50000')
    profile2.investment_timeline = '5-10-years'
    profile2.occupation = 'Investment Banker'
    
    db.session.add(profile2)
    
    return [user1, user2]

def create_sample_portfolios(users):
    """Create sample portfolios for demo users"""
    portfolios = []
    
    for user in users:
        # Portfolio 1: SIP Portfolio
        portfolio1 = Portfolio()
        portfolio1.user_id = user.id
        portfolio1.name = 'Monthly SIP Portfolio'
        portfolio1.description = 'Systematic Investment Plan for long-term wealth creation'
        portfolio1.portfolio_type = 'sip'
        portfolio1.initial_value = Decimal('50000')
        portfolio1.current_value = Decimal('65000')
        portfolio1.total_invested = Decimal('60000')
        portfolio1.total_returns = Decimal('5000')
        portfolio1.return_percentage = Decimal('8.33')
        
        db.session.add(portfolio1)
        db.session.flush()
        
        # Add investments to portfolio1
        investments1 = [
            {
                'name': 'HDFC Top 100 Fund',
                'type': 'mutual_fund',
                'units': Decimal('500.25'),
                'avg_price': Decimal('65.50'),
                'current_price': Decimal('72.30'),
                'invested': Decimal('32750'),
                'current': Decimal('36168')
            },
            {
                'name': 'SBI BlueChip Fund',
                'type': 'mutual_fund',
                'units': Decimal('320.75'),
                'avg_price': Decimal('85.20'),
                'current_price': Decimal('90.15'),
                'invested': Decimal('27332'),
                'current': Decimal('28892')
            }
        ]
        
        for inv_data in investments1:
            inv = PortfolioInvestment()
            inv.portfolio_id = portfolio1.id
            inv.investment_name = inv_data['name']
            inv.investment_type = inv_data['type']
            inv.units = inv_data['units']
            inv.avg_purchase_price = inv_data['avg_price']
            inv.current_price = inv_data['current_price']
            inv.invested_amount = inv_data['invested']
            inv.current_value = inv_data['current']
            inv.returns = inv_data['current'] - inv_data['invested']
            inv.return_percentage = (inv.returns / inv_data['invested']) * 100
            
            db.session.add(inv)
        
        # Portfolio 2: Equity Portfolio (for advanced user)
        if user.profile.investment_experience == 'advanced':
            portfolio2 = Portfolio()
            portfolio2.user_id = user.id
            portfolio2.name = 'Direct Equity Portfolio'
            portfolio2.description = 'Direct stock investments for higher returns'
            portfolio2.portfolio_type = 'lumpsum'
            portfolio2.initial_value = Decimal('200000')
            portfolio2.current_value = Decimal('245000')
            portfolio2.total_invested = Decimal('220000')
            portfolio2.total_returns = Decimal('25000')
            portfolio2.return_percentage = Decimal('11.36')
            
            db.session.add(portfolio2)
            db.session.flush()
            
            # Add equity investments
            equity_investments = [
                {
                    'name': 'Reliance Industries',
                    'type': 'stock',
                    'units': Decimal('50'),
                    'avg_price': Decimal('2450.00'),
                    'current_price': Decimal('2680.00'),
                    'invested': Decimal('122500'),
                    'current': Decimal('134000')
                },
                {
                    'name': 'TCS Limited',
                    'type': 'stock',
                    'units': Decimal('30'),
                    'avg_price': Decimal('3250.00'),
                    'current_price': Decimal('3700.00'),
                    'invested': Decimal('97500'),
                    'current': Decimal('111000')
                }
            ]
            
            for inv_data in equity_investments:
                inv = PortfolioInvestment()
                inv.portfolio_id = portfolio2.id
                inv.investment_name = inv_data['name']
                inv.investment_type = inv_data['type']
                inv.units = inv_data['units']
                inv.avg_purchase_price = inv_data['avg_price']
                inv.current_price = inv_data['current_price']
                inv.invested_amount = inv_data['invested']
                inv.current_value = inv_data['current']
                inv.returns = inv_data['current'] - inv_data['invested']
                inv.return_percentage = (inv.returns / inv_data['invested']) * 100
                
                db.session.add(inv)
        
        portfolios.extend([portfolio1] + ([portfolio2] if user.profile.investment_experience == 'advanced' else []))
    
    return portfolios

def create_sample_transactions(users, portfolios):
    """Create sample transaction history"""
    transactions = []
    
    # Generate transactions for the last 6 months
    start_date = datetime.now() - timedelta(days=180)
    
    for user in users:
        user_portfolios = [p for p in portfolios if p.user_id == user.id]
        
        # Generate monthly SIP transactions
        for i in range(6):
            transaction_date = start_date + timedelta(days=30 * i)
            
            # SIP transaction
            sip_transaction = Transaction()
            sip_transaction.user_id = user.id
            sip_transaction.portfolio_id = user_portfolios[0].id if user_portfolios else None
            sip_transaction.transaction_type = 'sip'
            sip_transaction.investment_name = 'HDFC Top 100 Fund'
            sip_transaction.amount = Decimal('10000')
            sip_transaction.units = Decimal('150.0') + Decimal(random.uniform(-20, 20))
            sip_transaction.price_per_unit = sip_transaction.amount / sip_transaction.units
            sip_transaction.fee = Decimal('0')
            sip_transaction.net_amount = sip_transaction.amount
            sip_transaction.transaction_date = transaction_date
            sip_transaction.status = 'completed'
            sip_transaction.reference_number = f'TXN{user.id}{i:02d}{random.randint(1000, 9999)}'
            
            transactions.append(sip_transaction)
            db.session.add(sip_transaction)
        
        # Add some buy/sell transactions for advanced users
        if user.profile.investment_experience == 'advanced':
            for i in range(3):
                buy_date = start_date + timedelta(days=45 * i)
                
                buy_transaction = Transaction()
                buy_transaction.user_id = user.id
                buy_transaction.portfolio_id = user_portfolios[1].id if len(user_portfolios) > 1 else None
                buy_transaction.transaction_type = 'buy'
                buy_transaction.investment_name = 'Reliance Industries'
                buy_transaction.amount = Decimal('50000')
                buy_transaction.units = Decimal('20')
                buy_transaction.price_per_unit = Decimal('2500')
                buy_transaction.fee = Decimal('250')
                buy_transaction.net_amount = buy_transaction.amount + buy_transaction.fee
                buy_transaction.transaction_date = buy_date
                buy_transaction.status = 'completed'
                buy_transaction.reference_number = f'TXN{user.id}B{i:02d}{random.randint(1000, 9999)}'
                
                transactions.append(buy_transaction)
                db.session.add(buy_transaction)
    
    return transactions

def create_sample_goals(users):
    """Create sample financial goals"""
    goals = []
    
    for user in users:
        # Goal 1: Emergency Fund
        goal1 = Goal()
        goal1.user_id = user.id
        goal1.name = 'Emergency Fund'
        goal1.description = 'Build emergency fund for 6 months of expenses'
        goal1.target_amount = Decimal('300000')
        goal1.current_amount = Decimal('180000')
        goal1.priority = 'high'
        goal1.category = 'emergency'
        goal1.monthly_contribution = Decimal('15000')
        goal1.target_date = datetime.now().date() + timedelta(days=365)
        
        goals.append(goal1)
        db.session.add(goal1)
        
        # Goal 2: Retirement Planning
        goal2 = Goal()
        goal2.user_id = user.id
        goal2.name = 'Retirement Corpus'
        goal2.description = 'Build retirement corpus for comfortable post-retirement life'
        goal2.target_amount = Decimal('10000000')
        goal2.current_amount = Decimal('500000')
        goal2.priority = 'medium'
        goal2.category = 'retirement'
        goal2.monthly_contribution = Decimal('25000')
        goal2.target_date = datetime.now().date() + timedelta(days=7300)  # 20 years
        
        goals.append(goal2)
        db.session.add(goal2)
        
        # Goal 3: Home Purchase (for younger users)
        if user.profile.investment_experience == 'beginner':
            goal3 = Goal()
            goal3.user_id = user.id
            goal3.name = 'Dream Home'
            goal3.description = 'Save for down payment on dream home'
            goal3.target_amount = Decimal('2000000')
            goal3.current_amount = Decimal('350000')
            goal3.priority = 'high'
            goal3.category = 'home'
            goal3.monthly_contribution = Decimal('30000')
            goal3.target_date = datetime.now().date() + timedelta(days=1825)  # 5 years
            
            goals.append(goal3)
            db.session.add(goal3)
    
    return goals

def main():
    """Initialize sample data"""
    with app.app_context():
        print("Creating sample data for NYQE Wealth Management...")
        
        # Create users
        print("Creating demo users...")
        users = create_sample_users()
        
        # Create portfolios
        print("Creating sample portfolios...")
        portfolios = create_sample_portfolios(users)
        
        # Create transactions
        print("Creating sample transactions...")
        transactions = create_sample_transactions(users, portfolios)
        
        # Create goals
        print("Creating sample goals...")
        goals = create_sample_goals(users)
        
        # Commit all changes
        db.session.commit()
        
        print(f"Sample data created successfully!")
        print(f"- Users: {len(users)}")
        print(f"- Portfolios: {len(portfolios)}")
        print(f"- Transactions: {len(transactions)}")
        print(f"- Goals: {len(goals)}")
        print("\nDemo login credentials:")
        print("Username: demo_user | Password: demo123 (Beginner)")
        print("Username: advanced_user | Password: demo123 (Advanced)")

if __name__ == '__main__':
    main()