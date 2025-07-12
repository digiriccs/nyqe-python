import math

def calculate_sip(monthly_investment, annual_return, time_period):
    """Calculate SIP returns"""
    monthly_rate = annual_return / 100 / 12
    total_months = time_period * 12
    
    if monthly_rate == 0:
        future_value = monthly_investment * total_months
    else:
        future_value = monthly_investment * (((1 + monthly_rate) ** total_months - 1) / monthly_rate) * (1 + monthly_rate)
    
    total_investment = monthly_investment * total_months
    total_returns = future_value - total_investment
    
    # Calculate year-wise breakdown
    yearly_breakdown = []
    for year in range(1, time_period + 1):
        months = year * 12
        if monthly_rate == 0:
            year_value = monthly_investment * months
        else:
            year_value = monthly_investment * (((1 + monthly_rate) ** months - 1) / monthly_rate) * (1 + monthly_rate)
        yearly_breakdown.append({
            'year': year,
            'investment': monthly_investment * months,
            'value': round(year_value, 2),
            'returns': round(year_value - (monthly_investment * months), 2)
        })
    
    return {
        'future_value': round(future_value, 2),
        'total_investment': round(total_investment, 2),
        'total_returns': round(total_returns, 2),
        'yearly_breakdown': yearly_breakdown
    }

def calculate_lumpsum(investment_amount, annual_return, time_period):
    """Calculate lumpsum returns"""
    future_value = investment_amount * ((1 + annual_return / 100) ** time_period)
    total_returns = future_value - investment_amount
    
    # Calculate year-wise breakdown
    yearly_breakdown = []
    for year in range(1, time_period + 1):
        year_value = investment_amount * ((1 + annual_return / 100) ** year)
        yearly_breakdown.append({
            'year': year,
            'investment': investment_amount,
            'value': round(year_value, 2),
            'returns': round(year_value - investment_amount, 2)
        })
    
    return {
        'future_value': round(future_value, 2),
        'total_investment': round(investment_amount, 2),
        'total_returns': round(total_returns, 2),
        'yearly_breakdown': yearly_breakdown
    }

def calculate_swp(investment_amount, monthly_withdrawal, annual_return):
    """Calculate SWP (Systematic Withdrawal Plan)"""
    monthly_rate = annual_return / 100 / 12
    remaining_amount = investment_amount
    months_sustainable = 0
    monthly_breakdown = []
    
    while remaining_amount > 0 and months_sustainable < 600:  # Max 50 years
        months_sustainable += 1
        remaining_amount = remaining_amount * (1 + monthly_rate) - monthly_withdrawal
        
        if months_sustainable <= 120:  # Show first 10 years monthly
            monthly_breakdown.append({
                'month': months_sustainable,
                'withdrawal': monthly_withdrawal,
                'remaining': max(0, round(remaining_amount, 2))
            })
        
        if remaining_amount <= 0:
            break
    
    years_sustainable = months_sustainable / 12
    total_withdrawal = monthly_withdrawal * months_sustainable
    
    return {
        'months_sustainable': months_sustainable,
        'years_sustainable': round(years_sustainable, 2),
        'total_withdrawal': round(total_withdrawal, 2),
        'monthly_breakdown': monthly_breakdown
    }

def calculate_fd(principal, annual_rate, time_period, compound_frequency=4):
    """Calculate Fixed Deposit returns"""
    rate = annual_rate / 100
    maturity_amount = principal * ((1 + rate / compound_frequency) ** (compound_frequency * time_period))
    interest_earned = maturity_amount - principal
    
    # Calculate year-wise breakdown
    yearly_breakdown = []
    for year in range(1, time_period + 1):
        year_amount = principal * ((1 + rate / compound_frequency) ** (compound_frequency * year))
        yearly_breakdown.append({
            'year': year,
            'principal': principal,
            'amount': round(year_amount, 2),
            'interest': round(year_amount - principal, 2)
        })
    
    return {
        'maturity_amount': round(maturity_amount, 2),
        'principal': round(principal, 2),
        'interest_earned': round(interest_earned, 2),
        'yearly_breakdown': yearly_breakdown
    }

def calculate_ppf(annual_investment, years=15):
    """Calculate PPF returns (fixed at 7.1% current rate)"""
    annual_rate = 7.1 / 100
    total_investment = annual_investment * years
    
    # PPF calculation with annual compounding
    maturity_amount = 0
    yearly_breakdown = []
    
    for year in range(1, years + 1):
        if year == 1:
            year_amount = annual_investment
        else:
            year_amount = (yearly_breakdown[-1]['amount'] + annual_investment) * (1 + annual_rate)
        
        yearly_breakdown.append({
            'year': year,
            'investment': annual_investment * year,
            'amount': round(year_amount, 2),
            'returns': round(year_amount - (annual_investment * year), 2)
        })
    
    maturity_amount = yearly_breakdown[-1]['amount']
    total_returns = maturity_amount - total_investment
    
    return {
        'maturity_amount': round(maturity_amount, 2),
        'total_investment': round(total_investment, 2),
        'total_returns': round(total_returns, 2),
        'yearly_breakdown': yearly_breakdown
    }

def calculate_retirement(current_age, retirement_age, current_expenses, inflation_rate, expected_return, life_expectancy=85):
    """Calculate retirement planning"""
    years_to_retirement = retirement_age - current_age
    years_in_retirement = life_expectancy - retirement_age
    
    # Future monthly expenses at retirement
    future_monthly_expenses = current_expenses * ((1 + inflation_rate / 100) ** years_to_retirement)
    
    # Annual expenses in retirement
    annual_expenses_retirement = future_monthly_expenses * 12
    
    # Corpus needed at retirement (considering inflation during retirement)
    real_return = (expected_return - inflation_rate) / 100
    if real_return <= 0:
        corpus_needed = annual_expenses_retirement * years_in_retirement
    else:
        corpus_needed = annual_expenses_retirement * ((1 - (1 + real_return) ** (-years_in_retirement)) / real_return)
    
    # Monthly SIP needed
    monthly_rate = expected_return / 100 / 12
    months_to_retirement = years_to_retirement * 12
    
    if monthly_rate == 0:
        monthly_sip_needed = corpus_needed / months_to_retirement
    else:
        monthly_sip_needed = corpus_needed / (((1 + monthly_rate) ** months_to_retirement - 1) / monthly_rate * (1 + monthly_rate))
    
    return {
        'corpus_needed': round(corpus_needed, 2),
        'monthly_sip_needed': round(monthly_sip_needed, 2),
        'future_monthly_expenses': round(future_monthly_expenses, 2),
        'years_to_retirement': years_to_retirement,
        'years_in_retirement': years_in_retirement
    }

def calculate_nps(monthly_contribution, current_age, retirement_age=60, expected_return=10):
    """Calculate NPS returns"""
    years = retirement_age - current_age
    total_months = years * 12
    monthly_rate = expected_return / 100 / 12
    
    # Calculate corpus at retirement
    if monthly_rate == 0:
        corpus_at_retirement = monthly_contribution * total_months
    else:
        corpus_at_retirement = monthly_contribution * (((1 + monthly_rate) ** total_months - 1) / monthly_rate) * (1 + monthly_rate)
    
    total_investment = monthly_contribution * total_months
    
    # NPS rules: 60% can be withdrawn, 40% must be used for annuity
    lump_sum_withdrawal = corpus_at_retirement * 0.6
    annuity_amount = corpus_at_retirement * 0.4
    
    # Monthly pension (assuming 6% annuity rate)
    monthly_pension = (annuity_amount * 0.06) / 12
    
    return {
        'corpus_at_retirement': round(corpus_at_retirement, 2),
        'total_investment': round(total_investment, 2),
        'lump_sum_withdrawal': round(lump_sum_withdrawal, 2),
        'annuity_amount': round(annuity_amount, 2),
        'monthly_pension': round(monthly_pension, 2),
        'total_returns': round(corpus_at_retirement - total_investment, 2)
    }

def calculate_emi(loan_amount, annual_rate, tenure_years):
    """Calculate EMI for loans"""
    monthly_rate = annual_rate / 100 / 12
    total_months = tenure_years * 12
    
    if monthly_rate == 0:
        emi = loan_amount / total_months
    else:
        emi = loan_amount * monthly_rate * ((1 + monthly_rate) ** total_months) / (((1 + monthly_rate) ** total_months) - 1)
    
    total_payment = emi * total_months
    total_interest = total_payment - loan_amount
    
    # Calculate year-wise breakdown
    yearly_breakdown = []
    remaining_principal = loan_amount
    
    for year in range(1, tenure_years + 1):
        year_interest = 0
        year_principal = 0
        
        for month in range(12):
            if remaining_principal <= 0:
                break
            
            monthly_interest = remaining_principal * monthly_rate
            monthly_principal = emi - monthly_interest
            
            year_interest += monthly_interest
            year_principal += monthly_principal
            remaining_principal -= monthly_principal
        
        yearly_breakdown.append({
            'year': year,
            'emi': round(emi, 2),
            'principal': round(year_principal, 2),
            'interest': round(year_interest, 2),
            'remaining_balance': round(max(0, remaining_principal), 2)
        })
    
    return {
        'emi': round(emi, 2),
        'total_payment': round(total_payment, 2),
        'total_interest': round(total_interest, 2),
        'loan_amount': round(loan_amount, 2),
        'yearly_breakdown': yearly_breakdown
    }
