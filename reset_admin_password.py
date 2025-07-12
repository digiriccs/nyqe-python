#!/usr/bin/env python3
"""
Reset admin password for NYQE Wealth Management
"""
from app import app, db
from models import User
from werkzeug.security import generate_password_hash

def reset_admin_password():
    with app.app_context():
        # Find admin user
        admin_user = User.query.filter_by(username='admin').first()
        
        if not admin_user:
            print("Admin user not found, creating new one...")
            admin_user = User(
                username='admin',
                email='admin@nyqewealth.com',
                name='Administrator',
                phone='+91-9999999999',
                is_admin=True,
                is_active=True,
                email_verified=True
            )
            db.session.add(admin_user)
        
        # Set new password
        new_password = 'admin123'
        admin_user.password_hash = generate_password_hash(new_password)
        admin_user.is_admin = True
        admin_user.is_active = True
        
        db.session.commit()
        print(f"✅ Admin password reset successfully!")
        print(f"Username: admin")
        print(f"Password: {new_password}")
        print(f"Admin status: {admin_user.is_admin}")
        print(f"Active status: {admin_user.is_active}")

if __name__ == '__main__':
    reset_admin_password()