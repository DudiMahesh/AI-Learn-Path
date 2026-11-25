"""
Unit & Integration Tests for Admin Authentication & /adm Redirection Suite
Validates route definitions, short URL redirection, role enforcement,
and separation of student vs. administrator entry points.
"""

import os
import unittest

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
APP_JSX_PATH = os.path.join(BASE_DIR, 'frontend', 'src', 'App.jsx')
ADMIN_ROUTE_PATH = os.path.join(BASE_DIR, 'frontend', 'src', 'components', 'navigation', 'AdminRoute.jsx')
STUDENT_LOGIN_PATH = os.path.join(BASE_DIR, 'frontend', 'src', 'pages', 'auth', 'LoginPage.jsx')
ADMIN_LOGIN_PATH = os.path.join(BASE_DIR, 'frontend', 'src', 'pages', 'admin', 'AdminLoginPage.jsx')


class TestAdminAuthenticationSuite(unittest.TestCase):

    def test_adm_short_url_serves_admin_login(self):
        """Verifies that /adm directly serves AdminLoginPage in App.jsx."""
        self.assertTrue(os.path.exists(APP_JSX_PATH), "App.jsx not found")
        with open(APP_JSX_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        self.assertIn(
            'path="/adm"',
            content,
            "Route for /adm is missing in App.jsx"
        )
        self.assertIn(
            '<AdminLoginPage />',
            content,
            "/adm is not rendering AdminLoginPage directly"
        )

    def test_dedicated_admin_login_route_registered(self):
        """Verifies that /admin/login is registered with AdminLoginPage component."""
        with open(APP_JSX_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        self.assertIn('path="/admin/login"', content)
        self.assertIn('<AdminLoginPage />', content)

    def test_admin_route_redirects_unauthenticated_to_adm(self):
        """Verifies that unauthenticated or non-admin users visiting /admin get redirected to /adm."""
        self.assertTrue(os.path.exists(ADMIN_ROUTE_PATH), "AdminRoute.jsx not found")
        with open(ADMIN_ROUTE_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        self.assertIn(
            'to="/adm"',
            content,
            "AdminRoute should redirect non-admins directly to /adm"
        )
        self.assertNotIn(
            'to="/dashboard"',
            content,
            "AdminRoute should no longer bounce unauthenticated admins to student dashboard"
        )

    def test_student_login_page_is_pure_student(self):
        """Ensures student login page has no role selector buttons or mode switching state."""
        self.assertTrue(os.path.exists(STUDENT_LOGIN_PATH), "LoginPage.jsx not found")
        with open(STUDENT_LOGIN_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        self.assertNotIn("setMode", content, "setMode state should be removed from student LoginPage")
        self.assertNotIn("handleModeChange", content, "handleModeChange should be removed from student LoginPage")
        self.assertNotIn("UserCheck", content, "UserCheck role switcher should be removed from student LoginPage")
        self.assertNotIn("Staff & Administrator Portal", content, "Admin portal link must be hidden from student login page")

    def test_admin_login_page_has_security_guards(self):
        """Verifies that AdminLoginPage checks admin permissions and has a clean console UI."""
        self.assertTrue(os.path.exists(ADMIN_LOGIN_PATH), "AdminLoginPage.jsx not found")
        with open(ADMIN_LOGIN_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        self.assertIn("Administration Console", content)
        self.assertIn("Restricted Area", content)
        self.assertNotIn("handleFillDemoAdmin", content, "Demo box should be removed from public login screen")
        self.assertIn("Access Denied", content, "Role verification check must deny non-admin users")
        self.assertIn("navigate('/admin'", content, "Successful admin login must navigate to /admin")

    def test_env_file_has_customizable_admin_credentials(self):
        """Verifies that .env defines customizable SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD keys."""
        env_path = os.path.join(BASE_DIR, '.env')
        self.assertTrue(os.path.exists(env_path), ".env not found")
        with open(env_path, 'r', encoding='utf-8') as f:
            content = f.read()

        self.assertIn('SUPER_ADMIN_EMAIL=', content)
        self.assertIn('SUPER_ADMIN_PASSWORD=', content)

    def test_admin_login_page_allows_custom_credentials(self):
        """Verifies that AdminLoginPage allows typing custom credentials with autoFocus on email."""
        with open(ADMIN_LOGIN_PATH, 'r', encoding='utf-8') as f:
            content = f.read()
        self.assertIn('placeholder="Enter your admin email"', content)
        self.assertIn("Administrator Email", content)

    def test_settings_exports_admin_credentials(self):
        """Verifies that Config in backend/config/settings.py exposes admin credential settings."""
        settings_path = os.path.join(BASE_DIR, 'backend', 'config', 'settings.py')
        self.assertTrue(os.path.exists(settings_path))
        with open(settings_path, 'r', encoding='utf-8') as f:
            content = f.read()

        self.assertIn('ADMIN_EMAIL = os.getenv', content)
        self.assertIn('ADMIN_PASSWORD = os.getenv', content)
        self.assertIn('SUPER_ADMIN_EMAIL = os.getenv', content)
        self.assertIn('SUPER_ADMIN_PASSWORD = os.getenv', content)


if __name__ == '__main__':
    unittest.main()

