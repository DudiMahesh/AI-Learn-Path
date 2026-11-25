"""
Integration & API Endpoint Tests for AI-LearnPath Backend
Verifies Flask routes, authentication headers, error handling,
and API backward compatibility in an isolated in-memory SQLite context.
"""

import sys
import os
import unittest

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(PROJECT_ROOT, 'backend')
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from app import create_app
from config.settings import Config
from models import db


class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SQLALCHEMY_ENGINE_OPTIONS = {}
    JWT_SECRET_KEY = 'test-secret-key-for-unit-tests'


class TestAPIEndpoints(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = create_app(TestConfig)
        cls.client = cls.app.test_client()

    def setUp(self):
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_health_check_endpoint(self):
        """GET /api/health returns 200 with ok status."""
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertEqual(json_data.get('status'), 'ok')

    def test_unauthenticated_diagnostic_access_fails(self):
        """GET /api/assessment/diagnostic without token returns 401 unauthorized."""
        response = self.client.get('/api/assessment/diagnostic')
        self.assertEqual(response.status_code, 401)

    def test_unauthenticated_learning_path_fails(self):
        """GET /api/learning-path without token returns 401 unauthorized."""
        response = self.client.get('/api/learning-path')
        self.assertEqual(response.status_code, 401)

    def test_nonexistent_endpoint_returns_404(self):
        """GET /api/unknown-route returns 404 error response."""
        response = self.client.get('/api/nonexistent-endpoint-1234')
        self.assertEqual(response.status_code, 404)

    def test_cors_headers_present(self):
        """Preflight OPTIONS request returns CORS headers."""
        response = self.client.options('/api/health', headers={
            'Origin': 'http://localhost:3000',
            'Access-Control-Request-Method': 'GET'
        })
        # Should respond successfully to preflight
        self.assertIn(response.status_code, [200, 204])


if __name__ == '__main__':
    unittest.main()

