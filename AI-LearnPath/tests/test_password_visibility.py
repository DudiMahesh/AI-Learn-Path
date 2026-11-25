"""
Unit & Integration Tests for Password Visibility Toggle Suite
Validates that student login, admin console login, and registration pages
provide interactive password reveal / conceal toggles with button safety.
"""

import os
import unittest

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
LOGIN_PAGE_PATH = os.path.join(BASE_DIR, 'frontend', 'src', 'pages', 'auth', 'LoginPage.jsx')
ADMIN_LOGIN_PATH = os.path.join(BASE_DIR, 'frontend', 'src', 'pages', 'admin', 'AdminLoginPage.jsx')
REGISTER_PAGE_PATH = os.path.join(BASE_DIR, 'frontend', 'src', 'pages', 'auth', 'RegisterPage.jsx')


class TestPasswordVisibilityToggle(unittest.TestCase):

    def test_student_login_has_password_visibility_toggle(self):
        """Verifies LoginPage.jsx includes showPassword state and Eye/EyeOff toggle button."""
        self.assertTrue(os.path.exists(LOGIN_PAGE_PATH))
        with open(LOGIN_PAGE_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        self.assertIn('Eye', content)
        self.assertIn('EyeOff', content)
        self.assertIn('showPassword', content)
        self.assertIn("type={showPassword ? 'text' : 'password'}", content)
        self.assertIn('type="button"', content, "Toggle button must use type='button' to avoid form submit")
        self.assertIn('Check password', content)

    def test_admin_login_has_password_visibility_toggle(self):
        """Verifies AdminLoginPage.jsx includes showPassword state and Eye/EyeOff toggle button."""
        self.assertTrue(os.path.exists(ADMIN_LOGIN_PATH))
        with open(ADMIN_LOGIN_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        self.assertIn('Eye', content)
        self.assertIn('EyeOff', content)
        self.assertIn('showPassword', content)
        self.assertIn("type={showPassword ? 'text' : 'password'}", content)
        self.assertIn('type="button"', content, "Admin toggle button must use type='button'")
        self.assertIn('Check password', content)

    def test_register_page_has_dual_password_visibility_toggles(self):
        """Verifies RegisterPage.jsx includes toggles for both Password and Confirm Password."""
        self.assertTrue(os.path.exists(REGISTER_PAGE_PATH))
        with open(REGISTER_PAGE_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        self.assertIn('Eye', content)
        self.assertIn('EyeOff', content)
        self.assertIn('showPassword', content)
        self.assertIn('showConfirmPassword', content)
        self.assertIn("type={showPassword ? 'text' : 'password'}", content)
        self.assertIn("type={showConfirmPassword ? 'text' : 'password'}", content)


if __name__ == '__main__':
    unittest.main()

