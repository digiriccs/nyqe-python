from datetime import datetime
from flask import Blueprint, render_template, redirect, url_for, flash, request, session
from flask_login import login_user, logout_user, login_required, current_user
from urllib.parse import urlparse
from app import db
from models import User, UserProfile
from forms import LoginForm, RegistrationForm, ProfileForm, ChangePasswordForm

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard.index'))
    
    form = LoginForm()
    if form.validate_on_submit():
        # Try to find user by username or email
        user = User.query.filter(
            (User.username == form.username_or_email.data) |
            (User.email == form.username_or_email.data)
        ).first()
        
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password', 'error')
            return redirect(url_for('auth.login'))
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        login_user(user, remember=form.remember_me.data)
        
        next_page = request.args.get('next')
        if not next_page or urlparse(next_page).netloc != '':
            next_page = url_for('dashboard.index')
        
        flash(f'Welcome back, {user.name or user.username}!', 'success')
        return redirect(next_page)
    
    return render_template('auth/login.html', form=form)

@auth.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard.index'))
    
    form = RegistrationForm()
    if form.validate_on_submit():
        try:
            user = User()
            user.username = form.username.data
            user.email = form.email.data
            user.name = form.name.data
            user.phone = form.phone.data
            user.set_password(form.password.data)
            
            db.session.add(user)
            db.session.flush()  # Get user ID
            
            # Create user profile
            profile = UserProfile()
            profile.user_id = user.id
            db.session.add(profile)
            db.session.commit()
            
            # Auto-login after registration
            login_user(user)
            user.last_login = datetime.utcnow()
            db.session.commit()
            
            flash('Welcome to NYQE Wealth! Complete your profile for personalized recommendations.', 'success')
            return redirect(url_for('auth.profile_setup'))
            
        except Exception as e:
            db.session.rollback()
            flash('Registration failed. Please try again.', 'error')
    
    return render_template('auth/register.html', form=form)

@auth.route('/profile-setup', methods=['GET', 'POST'])
@login_required
def profile_setup():
    """Initial profile setup for new users"""
    profile = current_user.profile
    if not profile:
        profile = UserProfile()
        profile.user_id = current_user.id
        db.session.add(profile)
    
    form = ProfileForm()
    if form.validate_on_submit():
        try:
            profile.date_of_birth = form.date_of_birth.data
            profile.occupation = form.occupation.data
            profile.annual_income = form.annual_income.data
            profile.investment_experience = form.investment_experience.data
            profile.risk_tolerance = form.risk_tolerance.data
            profile.financial_dependents = form.financial_dependents.data
            profile.emergency_fund_months = form.emergency_fund_months.data
            profile.preferred_investment_amount = form.preferred_investment_amount.data
            profile.investment_timeline = form.investment_timeline.data
            
            db.session.commit()
            
            flash('Profile setup complete! Your personalized dashboard is ready.', 'success')
            return redirect(url_for('dashboard.index'))
            
        except Exception as e:
            db.session.rollback()
            flash('Profile update failed. Please try again.', 'error')
    
    return render_template('auth/profile_setup.html', form=form, profile=profile)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('index'))

@auth.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    form = ProfileForm()
    
    if form.validate_on_submit():
        # Update user info
        current_user.name = form.name.data
        current_user.phone = form.phone.data
        
        # Update or create profile
        if not current_user.profile:
            profile = UserProfile()
            profile.user_id = current_user.id
            db.session.add(profile)
        else:
            profile = current_user.profile
        
        profile.date_of_birth = form.date_of_birth.data
        profile.occupation = form.occupation.data
        profile.annual_income = form.annual_income.data
        profile.investment_experience = form.investment_experience.data
        profile.risk_tolerance = form.risk_tolerance.data
        profile.financial_dependents = form.financial_dependents.data
        profile.emergency_fund_months = form.emergency_fund_months.data
        profile.preferred_investment_amount = form.preferred_investment_amount.data
        profile.investment_timeline = form.investment_timeline.data
        
        db.session.commit()
        flash('Your profile has been updated!', 'success')
        return redirect(url_for('auth.profile'))
    
    elif request.method == 'GET':
        # Pre-populate form with existing data
        form.name.data = current_user.name
        form.phone.data = current_user.phone
        
        if current_user.profile:
            profile = current_user.profile
            form.date_of_birth.data = profile.date_of_birth
            form.occupation.data = profile.occupation
            form.annual_income.data = profile.annual_income
            form.investment_experience.data = profile.investment_experience
            form.risk_tolerance.data = profile.risk_tolerance
            form.financial_dependents.data = profile.financial_dependents
            form.emergency_fund_months.data = profile.emergency_fund_months
            form.preferred_investment_amount.data = profile.preferred_investment_amount
            form.investment_timeline.data = profile.investment_timeline
    
    return render_template('auth/profile.html', form=form)

@auth.route('/change-password', methods=['GET', 'POST'])
@login_required
def change_password():
    form = ChangePasswordForm()
    
    if form.validate_on_submit():
        if not current_user.check_password(form.current_password.data):
            flash('Invalid current password', 'error')
            return redirect(url_for('auth.change_password'))
        
        current_user.set_password(form.new_password.data)
        db.session.commit()
        
        flash('Your password has been changed!', 'success')
        return redirect(url_for('auth.profile'))
    
    return render_template('auth/change_password.html', form=form)