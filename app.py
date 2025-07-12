import os
import logging

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from sqlalchemy.orm import DeclarativeBase
from werkzeug.middleware.proxy_fix import ProxyFix

# Configure logging
logging.basicConfig(level=logging.DEBUG)

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

# create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "nyqe-wealth-secret-key-2025")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# configure the database
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///nyqe_wealth.db")
# app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://rickyriccs:9646353337@localhost/nyqe_wealth"
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth.login'
login_manager.login_message = 'Please log in to access this page.'
login_manager.login_message_category = 'info'

# initialize the app with the extension
db.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    from models import User
    return User.query.get(int(user_id))

with app.app_context():
    # Import models to ensure tables are created
    import models  # noqa: F401
    db.create_all()
    
    # Import and register routes
    import routes  # noqa: F401
    
    # Register blueprints
    from auth import auth
    from dashboard import dashboard
    from admin import admin_bp
    from market_data import market_bp
    from loan_hub import loan_hub
    from financial_products import financial_products
    
    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(dashboard)
    app.register_blueprint(admin_bp)
    app.register_blueprint(market_bp)
    app.register_blueprint(loan_hub)
    app.register_blueprint(financial_products)
