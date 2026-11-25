"""
Test Suite for Diagram Enhancer and 3D Vector Synthesis
Verifies that ASCII art diagrams are automatically detected and replaced with 
high-resolution, multi-color 3D vector SVG schematics.
"""

import unittest
import sys
import os

# Ensure backend and root are in sys.path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
backend_dir = os.path.join(root_dir, 'backend')
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from backend.services.diagram_enhancer import (
    enhance_diagrams_in_answer,
    get_fallback_svg_for_query,
    CELL_3D_SVG,
    BERNOULLI_3D_SVG
)

class TestVectorDiagramEnhancer(unittest.TestCase):
    def test_replaces_fenced_ascii_diagram(self):
        ascii_cell_response = r"""### 📖 1. First Principles
The cell is the basic structural unit.

### 📊 3. Visual Diagram
```ascii
|  Nucleus               |
|  (double membrane)     |
|  + nucleolus           |
|  + chromatin           |
|                        |
|  Mitochondrion (cristae) <-- double-membrane, inner folds
|   /\/\/\               |
|  /      \              |
| |  0  0  |  Lysosome   |
|  \______/   (hydrolytic)|
```

### 🔍 4. Mechanism
Nucleus contains genetic material."""

        enhanced = enhance_diagrams_in_answer(ascii_cell_response, query="Explain cell organelles", subject="Biology")
        
        # Verify no crude ASCII art remains
        self.assertNotIn(r"/\\/\\", enhanced)
        self.assertNotIn(r"/\/\/", enhanced)
        self.assertNotIn(r"\______/", enhanced)
        
        # Verify valid SVG block is present
        self.assertIn("```svg", enhanced)
        self.assertIn("<svg viewBox=", enhanced)
        self.assertIn("Nucleus (Double Membrane)", enhanced)
        self.assertIn("Mitochondrion (Cristae Folds)", enhanced)
        self.assertIn("Lysosome (Hydrolytic Enzymes)", enhanced)
        self.assertIn("</svg>", enhanced)

    def test_replaces_unfenced_ascii_diagram(self):
        unfenced_text = r"""Here is the organelle layout:
|  Nucleus               |
|  (double membrane)     |
|  + nucleolus           |
|  + chromatin           |
|                        |
|  Mitochondrion (cristae) <-- double-membrane, inner folds
|   /\/\/\               |
|  /      \              |
| |  0  0  |  Lysosome   |
|  \______/   (hydrolytic)|
This demonstrates double-membrane compartmentalization."""

        enhanced = enhance_diagrams_in_answer(unfenced_text, query="Explain cell", subject="Biology")
        self.assertIn("<svg viewBox=", enhanced)
        self.assertIn("Mitochondrion (Cristae Folds)", enhanced)

    def test_preserves_valid_svg_diagram(self):
        valid_svg_response = """### 📊 3. High-Resolution Diagram
```svg
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="50" fill="#10b981"/>
</svg>
```"""
        enhanced = enhance_diagrams_in_answer(valid_svg_response, query="Circle diagram", subject="Physics")
        self.assertIn('<circle cx="100" cy="100" r="50" fill="#10b981"/>', enhanced)

    def test_bernoulli_fallback(self):
        ascii_physics = r"""```text
[Pipe Inlet P1, v1] -------\______/------- [Narrow Throat P2, v2]
```"""
        enhanced = enhance_diagrams_in_answer(ascii_physics, query="bernoulli principle fluid dynamics", subject="Physics")
        self.assertIn("<svg viewBox=", enhanced)
        self.assertIn("Bernoulli Law", enhanced)

if __name__ == '__main__':
    unittest.main()
