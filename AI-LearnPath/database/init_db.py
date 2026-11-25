#!/usr/bin/env python3
"""
AI LearnPath - Database Setup Script
Initializes the PostgreSQL database with schema and seed data.

Usage:
    python database/init_db.py

Environment Variables Required:
    DATABASE_URL: PostgreSQL connection string
    
Example:
    DATABASE_URL=postgresql://user:pass@host/dbname python database/init_db.py
"""

import os
import sys
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT


def get_db_connection():
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        print("ERROR: DATABASE_URL environment variable not set.")
        print("Example: DATABASE_URL=postgresql://user:pass@host/dbname python database/init_db.py")
        sys.exit(1)
    
    try:
        conn = psycopg2.connect(database_url)
        return conn
    except Exception as e:
        print(f"ERROR: Could not connect to database: {e}")
        sys.exit(1)


def run_sql_file(conn, filepath):
    """Run a SQL file against the database."""
    print(f"Running {filepath}...")
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            sql = f.read()
        
        with conn.cursor() as cur:
            cur.execute(sql)
        conn.commit()
        print(f"  ✓ {filepath} completed successfully")
    except Exception as e:
        conn.rollback()
        print(f"  ✗ Error in {filepath}: {e}")
        raise


def main():
    print("=" * 60)
    print("AI LearnPath - Database Initialization")
    print("=" * 60)
    
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    schema_path = os.path.join(script_dir, 'schema.sql')
    seed_path = os.path.join(script_dir, 'seed.sql')
    
    if not os.path.exists(schema_path):
        print(f"ERROR: schema.sql not found at {schema_path}")
        sys.exit(1)
    
    print("\nConnecting to database...")
    conn = get_db_connection()
    print("  ✓ Connected successfully")
    
    print("\nInitializing schema...")
    run_sql_file(conn, schema_path)
    
    if os.path.exists(seed_path):
        seed_response = input("\nDo you want to load seed data? (y/N): ").strip().lower()
        if seed_response == 'y':
            print("\nLoading seed data...")
            run_sql_file(conn, seed_path)
        else:
            print("Skipping seed data.")
    
    conn.close()
    
    print("\n" + "=" * 60)
    print("Database initialization complete!")
    print("=" * 60)
    print("\nNext steps:")
    print("  1. cd backend && pip install -r requirements.txt")
    print("  2. cd ml && python train_random_forest.py")
    print("  3. cd ml && python train_kmeans.py")
    print("  4. cd ml && python build_recommendation_index.py")
    print("  5. python rag/ingest_knowledge_base.py")
    print("  6. cd backend && python app.py")
    print("  7. cd frontend && npm install && npm run dev")


if __name__ == '__main__':
    main()
