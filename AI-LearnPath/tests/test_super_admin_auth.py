"""
Unit & Integration Tests for Super Admin Authentication & Privilege Suite
Validates hierarchical RBAC, decorators, route aliases,
and Super Administrator clearance identification.
"""

import sys
import os
import unittest
from unittest.mock import MagicMock, patch

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(PROJECT_ROOT, 'backend')
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

APP_JSX_PATH = os.path.join(PROJECT_ROOT, 'frontend', 'src', 'App.jsx')
AUTH_CONTEXT_PATH = os.path.join(PROJECT_ROOT, 'frontend', 'src', 'context', 'AuthContext.jsx')
ADMIN_LOGIN_PATH = os.path.join(PROJECT_ROOT, 'frontend', 'src', 'pages', 'admin', 'AdminLoginPage.jsx')
ADMIN_LAYOUT_PATH = os.path.join(PROJECT_ROOT, 'frontend', 'src', 'pages', 'admin', 'AdminLayout.jsx')

from app import create_app
from config.settings import Config
from backend.utils.auth import require_admin, require_super_admin


class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SQLALCHEMY_ENGINE_OPTIONS = {}
    JWT_SECRET_KEY = 'test-secret-key-super-admin-tests'


class TestSuperAdminAuthSuite(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.app = create_app(TestConfig)

    def test_app_jsx_has_superadmin_route_aliases(self):
        """Verifies that /superadmin and /super-admin routes render AdminLoginPage."""
        self.assertTrue(os.path.exists(APP_JSX_PATH))
        with open(APP_JSX_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        self.assertIn('path="/superadmin"', content)
        self.assertIn('path="/super-admin"', content)
        self.assertIn('<AdminLoginPage />', content)

    def test_auth_context_exports_is_super_admin(self):
        """Verifies that AuthContext provides isSuperAdmin in its context value."""
        self.assertTrue(os.path.exists(AUTH_CONTEXT_PATH))
        with open(AUTH_CONTEXT_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        self.assertIn('isSuperAdmin', content)
        self.assertIn("user?.role === 'super_admin'", content)

    def test_admin_login_page_verifies_super_admin_and_has_clean_ui(self):
        """Verifies that AdminLoginPage checks super_admin role and has a clean UI without demo box."""
        self.assertTrue(os.path.exists(ADMIN_LOGIN_PATH))
        with open(ADMIN_LOGIN_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        self.assertNotIn('handleFillDemoSuperAdmin', content, "Demo credentials box should be removed")
        self.assertIn("data.user?.role === 'super_admin'", content)

    def test_admin_layout_displays_super_admin_clearance_badge(self):
        """Verifies that AdminLayout displays the Super Administrator badge."""
        self.assertTrue(os.path.exists(ADMIN_LAYOUT_PATH))
        with open(ADMIN_LAYOUT_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        self.assertIn('isSuperAdmin', content)
        self.assertIn('Super Administrator', content)

    def test_require_admin_allows_super_admin(self):
        """Confirms that require_admin allows both 'admin' and 'super_admin' roles."""
        mock_super_admin = MagicMock()
        mock_super_admin.role = 'super_admin'

        @require_admin
        def dummy_action():
            return "SUCCESS"

        with self.app.test_request_context():
            with patch('backend.utils.auth.get_current_user', return_value=mock_super_admin):
                with patch('flask_jwt_extended.view_decorators.verify_jwt_in_request'):
                    res = dummy_action()
                    self.assertEqual(res, "SUCCESS")

    def test_require_super_admin_denies_standard_admin(self):
        """Confirms that require_super_admin rejects a standard admin user."""
        mock_admin = MagicMock()
        mock_admin.role = 'admin'

        @require_super_admin
        def root_action():
            return "ROOT_ALLOWED"

        with self.app.test_request_context():
            with patch('backend.utils.auth.get_current_user', return_value=mock_admin):
                with patch('flask_jwt_extended.view_decorators.verify_jwt_in_request'):
                    response, status = root_action()
                    self.assertEqual(status, 403)
                    data = response.get_json()
                    self.assertIn("Super Admin privileges required", data.get("message", ""))


if __name__ == '__main__':
    unittest.main()
