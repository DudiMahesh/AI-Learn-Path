"""
Test Runner for AI-LearnPath Platform
Discovers and executes all unit and integration tests across tests/
"""

import sys
import os
import unittest
import time

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

BACKEND_DIR = os.path.join(CURRENT_DIR, 'backend')
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)


def run_all_tests():
    print("=" * 65)
    print("AI LearnPath: Automated Test Suite (NEET UG 2026)")
    print("=" * 65)

    tests_dir = os.path.join(CURRENT_DIR, 'tests')
    print(f"Discovering tests in: {tests_dir}")

    loader = unittest.TestLoader()
    suite = loader.discover(start_dir=tests_dir, pattern="test_*.py")

    total_tests = suite.countTestCases()
    print(f"Found {total_tests} test cases across modules.\n")

    start_time = time.time()
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    duration = time.time() - start_time

    print("\n" + "=" * 65)
    print("TEST EXECUTION SUMMARY")
    print("=" * 65)
    print(f"Total Tests Run: {result.testsRun}")
    print(f"Passed:          {result.testsRun - len(result.failures) - len(result.errors)}")
    print(f"Failures:        {len(result.failures)}")
    print(f"Errors:          {len(result.errors)}")
    print(f"Time Elapsed:    {duration:.2f} seconds")
    print("=" * 65)

    if result.wasSuccessful():
        print("[SUCCESS] All test suites passed successfully!")
        return 0
    else:
        print("[FAIL] Some tests failed. Please review the tracebacks above.")
        return 1


if __name__ == '__main__':
    exit_code = run_all_tests()
    sys.exit(exit_code)

