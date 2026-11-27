import os
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'backend'))

from services.visual_learning_service import (
    identify_subject,
    classify_image_type,
    generate_educational_visual,
)
from app import create_app


class TestVisualLearningFeature(unittest.TestCase):
    def test_subject_identification_all_branches(self):
        self.assertEqual(identify_subject("Explain ray optics and focal length"), "Physics")
        self.assertEqual(identify_subject("Explain the structure of benzene"), "Chemistry")
        self.assertEqual(identify_subject("Explain photosynthesis in chloroplast"), "Botany")
        self.assertEqual(identify_subject("Explain animalia coelom and chordata"), "Zoology")
        self.assertEqual(identify_subject("Explain the human heart chambers"), "Biology")

    def test_intelligent_image_type_detection(self):
        self.assertEqual(classify_image_type("Explain the human heart.", "Biology"), "Labelled Anatomy Diagram")
        self.assertEqual(classify_image_type("Explain photosynthesis.", "Botany"), "Scientific Process Infographic")
        self.assertEqual(classify_image_type("Explain Newton's third law.", "Physics"), "Physics Concept Illustration")
        self.assertEqual(classify_image_type("Explain the structure of benzene.", "Chemistry"), "Chemical Molecular Structure")
        self.assertEqual(classify_image_type("Explain mitosis.", "Biology"), "Step-by-Step Biological Diagram")
        self.assertEqual(classify_image_type("Explain ray optics.", "Physics"), "Ray Diagram")

    def test_syllabus_grounding_and_limitation_note(self):
        chunks = [
            {
                "content": "Photosynthesis occurs in chloroplasts where light reactions produce ATP and NADPH.",
                "metadata": {"title": "NCERT Class 11 Biology"}
            }
        ]
        grounded = generate_educational_visual("Explain photosynthesis", retrieved_chunks=chunks)
        self.assertTrue(grounded["syllabus_grounded"])
        self.assertIsNone(grounded["limitation_note"])
        self.assertIn("<svg", grounded["image_svg"])
        self.assertEqual(grounded["subject"], "Botany")
        self.assertEqual(grounded["image_type"], "Scientific Process Infographic")

        ungrounded = generate_educational_visual("Explain photosynthesis", retrieved_chunks=[])
        self.assertFalse(ungrounded["syllabus_grounded"])
        self.assertIsNotNone(ungrounded["limitation_note"])

    def test_visual_generate_endpoint(self):
        app = create_app()
        client = app.test_client()
        resp = client.post("/api/visual/generate", json={"question": "Explain ray optics", "subject": "Physics"})
        self.assertEqual(resp.status_code, 200)
        body = resp.get_json()
        self.assertTrue(body["success"])
        data = body["data"]
        self.assertEqual(data["subject"], "Physics")
        self.assertEqual(data["image_type"], "Ray Diagram")
        self.assertIn("<svg", data["image_svg"])
        self.assertTrue(len(data["important_concepts"]) >= 1)
        self.assertTrue(len(data["neet_exam_notes"]) >= 1)

        bad_resp = client.post("/api/visual/generate", json={"question": ""})
        self.assertEqual(bad_resp.status_code, 400)


if __name__ == "__main__":
    unittest.main()

