from datetime import datetime, timedelta
from flask import Blueprint, render_template, redirect, url_for, flash, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy import func, desc
from app import db
from models import User, Portfolio, PortfolioInvestment, Transaction, Goal, UserProfile
from forms import GoalForm

dashboard = Blueprint('dashboard', __name__, url_prefix='/dashboard')

@dashboard.route('/')
@login_required
def index():
    """Main dashboard overview with comprehensive user analytics"""
    # Get user profile for personalization
    profile = current_user.profile or UserProfile()
    
    # Portfolio analytics
    portfolios = current_user.portfolios.filter_by(is_active=True).all()
    total_portfolio_value = sum(float(p.current_value or 0) for p in portfolios)
    total_invested = sum(float(p.total_invested or 0) for p in portfolios)
    total_returns = total_portfolio_value - total_invested
    return_percentage = (total_returns / total_invested * 100) if total_invested > 0 else 0
    
    # Recent transactions (last 10)
    recent_transactions = Transaction.query.filter_by(user_id=current_user.id)\
        .order_by(desc(Transaction.transaction_date))\
        .limit(10).all()
    
    # Goals progress
    goals = Goal.query.filter_by(user_id=current_user.id, is_achieved=False)\
        .order_by(Goal.priority.desc(), Goal.target_date).all()
    
    # Monthly investment trend (last 6 months)
    six_months_ago = datetime.now() - timedelta(days=180)
    # Use DATE_FORMAT for MySQL, strftime for SQLite
    if db.engine.url.get_backend_name() == "sqlite":
        month_expr = func.strftime('%Y-%m-01', Transaction.transaction_date)
    else:
        month_expr = func.DATE_FORMAT(Transaction.transaction_date, '%Y-%m-01')
    monthly_investments = db.session.query(
        month_expr.label('month'),
        func.sum(Transaction.amount).label('total_amount')
    ).filter(
        Transaction.user_id == current_user.id,
        Transaction.transaction_type.in_(['buy', 'sip']),
        Transaction.transaction_date >= six_months_ago
    ).group_by(month_expr)\
     .order_by('month').all()
    
    # Asset allocation
    asset_allocation = {}
    for portfolio in portfolios:
        for investment in portfolio.investments:
            asset_type = investment.investment_type or 'Other'
            if asset_type not in asset_allocation:
                asset_allocation[asset_type] = 0
            asset_allocation[asset_type] += float(investment.current_value or 0)
    
    # Performance metrics
    best_performer = None
    worst_performer = None
    if portfolios:
        portfolio_performance = [(p, float(p.return_percentage or 0)) for p in portfolios]
        if portfolio_performance:
            best_performer = max(portfolio_performance, key=lambda x: x[1])
            worst_performer = min(portfolio_performance, key=lambda x: x[1])
    
    dashboard_data = {
        'total_portfolio_value': total_portfolio_value,
        'total_invested': total_invested,
        'total_returns': total_returns,
        'return_percentage': return_percentage,
        'portfolios_count': len(portfolios),
        'goals_count': len(goals),
        'recent_transactions': recent_transactions,
        'goals': goals[:5],  # Top 5 priority goals
        'monthly_investments': monthly_investments,
        'asset_allocation': asset_allocation,
        'best_performer': best_performer,
        'worst_performer': worst_performer,
        'profile': profile
    }
    
    return render_template('dashboard/enhanced_index.html', **dashboard_data)

@dashboard.route('/portfolios')
@login_required
def portfolios():
    """Portfolio management page"""
    user_portfolios = current_user.portfolios.order_by(desc(Portfolio.created_at)).all()
    
    return render_template('dashboard/portfolios.html', portfolios=user_portfolios)

@dashboard.route('/portfolio/<int:portfolio_id>')
@login_required
def portfolio_detail(portfolio_id):
    """Individual portfolio details"""
    portfolio = Portfolio.query.filter_by(id=portfolio_id, user_id=current_user.id).first_or_404()
    
    # Get portfolio investments
    investments = portfolio.investments.all()
    
    # Get portfolio transactions
    transactions = Transaction.query.filter_by(portfolio_id=portfolio_id, user_id=current_user.id).order_by(desc(Transaction.transaction_date)).all()
    
    return render_template('dashboard/portfolio_detail.html',
                         portfolio=portfolio,
                         investments=investments,
                         transactions=transactions)

@dashboard.route('/goals')
@login_required
def goals():
    """Financial goals management"""
    user_goals = Goal.query.filter_by(user_id=current_user.id).order_by(Goal.target_date).all()
    
    return render_template('dashboard/goals.html', goals=user_goals)

@dashboard.route('/goals/new', methods=['GET', 'POST'])
@login_required
def new_goal():
    """Create a new financial goal"""
    form = GoalForm()
    
    if form.validate_on_submit():
        goal = Goal(
            user_id=current_user.id,
            name=form.name.data,
            description=form.description.data,
            target_amount=form.target_amount.data,
            target_date=form.target_date.data,
            monthly_contribution=form.monthly_contribution.data,
            priority=form.priority.data,
            category=form.category.data
        )
        
        db.session.add(goal)
        db.session.commit()
        
        flash('Goal created successfully!', 'success')
        return redirect(url_for('dashboard.goals'))
    
    return render_template('dashboard/goal_form.html', form=form, title='New Goal')

@dashboard.route('/goals/<int:goal_id>/edit', methods=['GET', 'POST'])
@login_required
def edit_goal(goal_id):
    """Edit an existing goal"""
    goal = Goal.query.filter_by(id=goal_id, user_id=current_user.id).first_or_404()
    form = GoalForm()
    
    if form.validate_on_submit():
        goal.name = form.name.data
        goal.description = form.description.data
        goal.target_amount = form.target_amount.data
        goal.target_date = form.target_date.data
        goal.monthly_contribution = form.monthly_contribution.data
        goal.priority = form.priority.data
        goal.category = form.category.data
        
        db.session.commit()
        flash('Goal updated successfully!', 'success')
        return redirect(url_for('dashboard.goals'))
    
    elif request.method == 'GET':
        form.name.data = goal.name
        form.description.data = goal.description
        form.target_amount.data = goal.target_amount
        form.target_date.data = goal.target_date
        form.monthly_contribution.data = goal.monthly_contribution
        form.priority.data = goal.priority
        form.category.data = goal.category
    
    return render_template('dashboard/goal_form.html', form=form, goal=goal, title='Edit Goal')

@dashboard.route('/transactions')
@login_required
def transactions():
    """Transaction history"""
    page = request.args.get('page', 1, type=int)
    user_transactions = current_user.transactions.order_by(desc(Transaction.transaction_date)).paginate(
        page=page, per_page=20, error_out=False
    )
    
    return render_template('dashboard/transactions.html', transactions=user_transactions)

@dashboard.route('/analytics')
@login_required
def analytics():
    """Investment analytics and insights"""
    # Portfolio performance over time
    portfolios = current_user.portfolios.filter_by(is_active=True).all()
    
    # Asset allocation
    asset_allocation = {}
    for portfolio in portfolios:
        for investment in portfolio.investments:
            asset_type = investment.investment_type
            if asset_type in asset_allocation:
                asset_allocation[asset_type] += float(investment.current_value)
            else:
                asset_allocation[asset_type] = float(investment.current_value)
    
    # Risk analysis based on user profile
    risk_score = 0
    if current_user.profile:
        risk_tolerance = current_user.profile.risk_tolerance
        if risk_tolerance == 'aggressive':
            risk_score = 8
        elif risk_tolerance == 'moderate':
            risk_score = 5
        else:
            risk_score = 3
    
    return render_template('dashboard/analytics.html',
                         portfolios=portfolios,
                         asset_allocation=asset_allocation,
                         risk_score=risk_score)

@dashboard.route('/api/portfolio-data')
@login_required
def api_portfolio_data():
    """API endpoint for portfolio chart data"""
    portfolios = current_user.portfolios.filter_by(is_active=True).all()
    
    data = []
    for portfolio in portfolios:
        data.append({
            'name': portfolio.name,
            'value': float(portfolio.current_value),
            'returns': float(portfolio.total_returns),
            'return_percentage': float(portfolio.return_percentage)
        })
    
    return jsonify(data)

@dashboard.route('/recommendations')
@login_required
def recommendations():
    """Personalized investment recommendations"""
    recommendations = []
    
    # Basic recommendations based on user profile
    if current_user.profile:
        profile = current_user.profile
        
        # Age-based recommendations
        if profile.date_of_birth:
            age = (datetime.now().date() - profile.date_of_birth).days // 365
            if age < 30:
                recommendations.append({
                    'title': 'Start SIP in Equity Funds',
                    'description': 'At your age, you can take higher risks for potentially higher returns.',
                    'action': 'Explore Equity Funds',
                    'priority': 'high'
                })
            elif age < 50:
                recommendations.append({
                    'title': 'Balanced Portfolio Approach',
                    'description': 'Consider a mix of equity and debt instruments for balanced growth.',
                    'action': 'View Balanced Funds',
                    'priority': 'medium'
                })
            else:
                recommendations.append({
                    'title': 'Focus on Income Generation',
                    'description': 'Consider debt funds and dividend-paying investments.',
                    'action': 'Explore Debt Funds',
                    'priority': 'high'
                })
        
        # Income-based recommendations
        if profile.annual_income:
            if profile.annual_income > 1000000:  # 10 Lakhs+
                recommendations.append({
                    'title': 'Tax Saving Opportunities',
                    'description': 'Explore ELSS funds for tax benefits under Section 80C.',
                    'action': 'View ELSS Funds',
                    'priority': 'high'
                })
    
    return render_template('dashboard/recommendations.html', recommendations=recommendations)