"""
Runner for Evaluation.
"""
import sys
import os

base_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(base_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)
if base_dir not in sys.path:
    sys.path.insert(0, base_dir)

from ml.evaluation.evaluate_models import main

if __name__ == '__main__':
    main()
