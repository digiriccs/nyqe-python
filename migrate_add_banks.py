#!/usr/bin/env python3
"""Add Bank table and update loan products"""

from app import app, db
from sqlalchemy import text

def migrate_database():
    """Add banks table and bank_id to loan_products"""
    with app.app_context():
        # Create banks table if it doesn't exist
        create_banks_table = """
        CREATE TABLE IF NOT EXISTS banks (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            code VARCHAR(20) UNIQUE NOT NULL,
            logo_url VARCHAR(500),
            description TEXT,
            customer_care VARCHAR(50),
            website VARCHAR(200),
            branch_count INTEGER,
            rating NUMERIC(3, 2),
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
        
        # Add bank_id column to loan_products if it doesn't exist
        add_bank_id_column = """
        DO $$ 
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                          WHERE table_name='loan_products' AND column_name='bank_id') THEN
                ALTER TABLE loan_products ADD COLUMN bank_id INTEGER;
            END IF;
        END $$;
        """
        
        # Create a default bank first
        create_default_bank = """
        INSERT INTO banks (name, code, description, rating)
        VALUES ('Default Bank', 'DEFAULT', 'Default bank for existing products', 4.0)
        ON CONFLICT (name) DO NOTHING;
        """
        
        # Update existing loan products with default bank
        update_existing_products = """
        UPDATE loan_products 
        SET bank_id = (SELECT id FROM banks WHERE code = 'DEFAULT')
        WHERE bank_id IS NULL;
        """
        
        # Make bank_id NOT NULL after updating existing records
        make_bank_id_not_null = """
        DO $$ 
        BEGIN
            IF EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='loan_products' AND column_name='bank_id' 
                      AND is_nullable='YES') THEN
                ALTER TABLE loan_products ALTER COLUMN bank_id SET NOT NULL;
            END IF;
        END $$;
        """
        
        # Add foreign key constraint
        add_foreign_key = """
        DO $$ 
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                          WHERE table_name='loan_products' 
                          AND constraint_name='loan_products_bank_id_fkey') THEN
                ALTER TABLE loan_products 
                ADD CONSTRAINT loan_products_bank_id_fkey 
                FOREIGN KEY (bank_id) REFERENCES banks(id);
            END IF;
        END $$;
        """
        
        try:
            # Execute migrations
            db.session.execute(text(create_banks_table))
            print("✓ Created banks table")
            
            db.session.execute(text(add_bank_id_column))
            print("✓ Added bank_id column to loan_products")
            
            db.session.execute(text(create_default_bank))
            print("✓ Created default bank")
            
            db.session.execute(text(update_existing_products))
            print("✓ Updated existing products with default bank")
            
            db.session.execute(text(make_bank_id_not_null))
            print("✓ Made bank_id NOT NULL")
            
            db.session.execute(text(add_foreign_key))
            print("✓ Added foreign key constraint")
            
            db.session.commit()
            print("\nDatabase migration completed successfully!")
            
        except Exception as e:
            db.session.rollback()
            print(f"Error during migration: {e}")
            raise

if __name__ == '__main__':
    migrate_database()