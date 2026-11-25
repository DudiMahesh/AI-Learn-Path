"""
Unit & Integration Tests for NEET Resources Catalog & Navigation State
Validates data integrity, subject balance, URL validity,
removal of legacy software resources, and removal from UI navigation menus.
"""

import os
import re
import unittest

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
RESOURCES_DATA_PATH = os.path.join(BASE_DIR, 'frontend', 'src', 'data', 'neetResourcesData.js')
SIDEBAR_PATH = os.path.join(BASE_DIR, 'frontend', 'src', 'components', 'layout', 'Sidebar.jsx')
NAVBAR_PATH = os.path.join(BASE_DIR, 'frontend', 'src', 'components', 'layout', 'Navbar.jsx')
LANDING_PAGE_PATH = os.path.join(BASE_DIR, 'frontend', 'src', 'pages', 'public', 'LandingPage.jsx')
APP_JSX_PATH = os.path.join(BASE_DIR, 'frontend', 'src', 'App.jsx')

EXPECTED_CATEGORIES = {
    'Official NTA & NCERT',
    'Biology',
    'Physics',
    'Chemistry',
    'PYQ & Mock Tests',
    'Revision & Formulas'
}

LEGACY_CS_KEYWORDS = [
    'python official documentation',
    'mdn web docs',
    'docker official documentation',
    'owasp top 10',
    'leetcode algorithm',
    'fastapi high-performance',
    'scikit-learn machine learning user guide',
    'postgresql tutorial',
    'aws cloud architecture'
]


class TestNEETResourcesCatalog(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Loads and extracts raw text from neetResourcesData.js."""
        cls.assertTrue(
            os.path.exists(RESOURCES_DATA_PATH),
            f"File not found: {RESOURCES_DATA_PATH}"
        )
        with open(RESOURCES_DATA_PATH, 'r', encoding='utf-8') as f:
            cls.raw_content = f.read()

    def test_file_exists_and_contains_neet_header(self):
        """Validates that the file contains the NEET (UG) 2026 header."""
        self.assertIn('NEET (UG) 2026', self.raw_content)
        self.assertIn('NEET_RESOURCES', self.raw_content)
        self.assertIn('NEET_RESOURCE_CATEGORIES', self.raw_content)

    def test_zero_legacy_computer_science_resources(self):
        """Ensures all legacy software development keywords are completely eliminated."""
        content_lower = self.raw_content.lower()
        for kw in LEGACY_CS_KEYWORDS:
            self.assertNotIn(
                kw,
                content_lower,
                f"Legacy CS keyword '{kw}' found in NEET resources file!"
            )

    def test_resource_count_and_id_uniqueness(self):
        """Verifies at least 20 resources exist and all IDs are strictly unique."""
        ids = [int(m) for m in re.findall(r'id:\s*(\d+)', self.raw_content)]
        self.assertGreaterEqual(
            len(ids),
            20,
            f"Expected at least 20 NEET resources, found {len(ids)}"
        )
        self.assertEqual(
            len(ids),
            len(set(ids)),
            "Duplicate resource IDs detected in catalog!"
        )

    def test_all_expected_categories_present(self):
        """Ensures all 6 primary NEET preparation categories are defined."""
        for cat in EXPECTED_CATEGORIES:
            self.assertIn(
                cat,
                self.raw_content,
                f"Expected category '{cat}' missing from resources file"
            )

    def test_subject_balance(self):
        """Confirms balanced distribution across core NEET exam subjects."""
        cat_matches = re.findall(r"category:\s*'([^']+)'", self.raw_content)
        cat_counts = {}
        for c in cat_matches:
            cat_counts[c] = cat_counts.get(c, 0) + 1

        self.assertGreaterEqual(cat_counts.get('Physics', 0), 3, "Insufficient Physics resources")
        self.assertGreaterEqual(cat_counts.get('Chemistry', 0), 3, "Insufficient Chemistry resources")
        self.assertGreaterEqual(cat_counts.get('Biology', 0), 3, "Insufficient Biology resources")
        self.assertGreaterEqual(cat_counts.get('Official NTA & NCERT', 0), 3, "Insufficient Official/NCERT resources")
        self.assertGreaterEqual(cat_counts.get('PYQ & Mock Tests', 0), 2, "Insufficient PYQ resources")

    def test_urls_are_well_formed(self):
        """Verifies that all URLs either start with https://, http://, or an in-app route '/'."""
        urls = re.findall(r"url:\s*'([^']+)'", self.raw_content)
        self.assertGreater(len(urls), 0)
        for u in urls:
            is_valid = u.startswith('https://') or u.startswith('http://') or u.startswith('/')
            self.assertTrue(
                is_valid,
                f"Malformed URL detected: '{u}'"
            )

    def test_resources_removed_from_sidebar_and_navbar(self):
        """Verifies that the Resources menu item is removed from Sidebar and Navbar."""
        with open(SIDEBAR_PATH, 'r', encoding='utf-8') as f:
            sidebar_content = f.read()
        self.assertNotIn(
            "'/resources'",
            sidebar_content,
            "Resources navigation link still present in Sidebar.jsx"
        )

        with open(NAVBAR_PATH, 'r', encoding='utf-8') as f:
            navbar_content = f.read()
        self.assertNotIn(
            "path: '/resources'",
            navbar_content,
            "Resources navigation link still present in Navbar.jsx"
        )

    def test_resources_route_redirects_gracefully(self):
        """Confirms backward-compatible redirect from /resources to /courses in App.jsx."""
        with open(APP_JSX_PATH, 'r', encoding='utf-8') as f:
            app_content = f.read()
        self.assertIn(
            'path="/resources"',
            app_content,
            "Route for /resources missing from App.jsx"
        )
        self.assertIn(
            '<Navigate to="/courses" replace />',
            app_content,
            "/resources route is not gracefully redirecting to /courses"
        )


if __name__ == '__main__':
    unittest.main()
