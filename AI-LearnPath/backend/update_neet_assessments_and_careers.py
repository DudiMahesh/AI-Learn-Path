"""
Updates database assessments, careers, and questions to 100% NEET UG 2026.
Replaces all legacy computer science / MCA diagnostic assessments and questions.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from models import db
from models.career import Career
from models.skill import Skill, CareerSkill
from models.assessment import Assessment, Question, AssessmentAttempt, AssessmentAnswer
from models.user import User

app = create_app()

NEET_CAREERS = [
    {
        "name": "MBBS (AIIMS / Top Central Medical College)",
        "description": "Comprehensive preparation targeting 680+ score for premier national medical institutes."
    },
    {
        "name": "MBBS (State Govt Medical College)",
        "description": "Balanced high-yield preparation targeting 620-670 score for state quota government medical seats."
    },
    {
        "name": "BDS (Dental Surgery & Sciences)",
        "description": "Focused medical entrance preparation for government dental colleges with strong Biology emphasis."
    },
    {
        "name": "BAMS / BHMS (Ayush Medical Sciences)",
        "description": "Targeted preparation for Ayurveda, Homeopathy, and allied traditional medical disciplines."
    },
    {
        "name": "NEET 680+ Rank Booster Track",
        "description": "Intensive revision and numerical problem-solving drill track for high-percentile aspirants."
    },
    {
        "name": "NEET PCB Conceptual Mastery",
        "description": "Foundational NCERT mastery across Physics, Chemistry, and Biology from base to advanced."
    }
]

NEET_SKILLS = [
    ("NEET Physics - Mechanics & Kinematics", "Laws of motion, work power energy, gravitation, and kinematics numericals"),
    ("NEET Physics - Electrodynamics & Magnetism", "Electrostatics, current electricity, magnetic effects, and induction"),
    ("NEET Physics - Optics & Modern Physics", "Ray and wave optics, dual nature, atoms, nuclei, and semiconductors"),
    ("NEET Chemistry - Physical Chemistry", "Mole concept, thermodynamics, equilibrium, solutions, and electrochemistry"),
    ("NEET Chemistry - Organic Reaction Mechanisms", "Hydrocarbons, haloalkanes, carbonyl compounds, and biomolecules"),
    ("NEET Chemistry - Inorganic & Periodic Trends", "Chemical bonding, p-block, d/f-block, and coordination compounds"),
    ("NEET Biology - Botany & Plant Physiology", "Plant kingdom, morphology, photosynthesis, and respiration in plants"),
    ("NEET Biology - Zoology & Human Physiology", "Digestion, circulation, neural control, and chemical coordination"),
    ("NEET Biology - Genetics & Molecular Basis", "Mendelian genetics, DNA replication, transcription, and translation"),
    ("NEET Biology - Ecology & Environment", "Organisms and populations, ecosystems, biodiversity, and conservation")
]

NEET_QUESTIONS = [
    {
        "skill": "NEET Physics - Mechanics & Kinematics",
        "text": "A particle starts from rest and moves with uniform acceleration. If the distance covered in the first 10 seconds is S1 and that covered in the first 20 seconds is S2, then what is the relationship between S1 and S2?",
        "options": {
            "A": "S2 = 4 S1",
            "B": "S2 = 2 S1",
            "C": "S2 = 3 S1",
            "D": "S2 = S1 / 4"
        },
        "correct": "A"
    },
    {
        "skill": "NEET Physics - Optics & Modern Physics",
        "text": "In photoelectric effect, if the frequency of incident light on a metal surface is doubled, the stopping potential becomes:",
        "options": {
            "A": "Exactly double",
            "B": "More than double",
            "C": "Less than double",
            "D": "Remains unchanged"
        },
        "correct": "B"
    },
    {
        "skill": "NEET Physics - Optics & Modern Physics",
        "text": "In Young's double slit experiment, if the distance between the two slits is halved and the distance to the screen is doubled, the fringe width (β):",
        "options": {
            "A": "Is halved",
            "B": "Remains constant",
            "C": "Becomes four times",
            "D": "Becomes two times"
        },
        "correct": "C"
    },
    {
        "skill": "NEET Chemistry - Inorganic & Periodic Trends",
        "text": "Which of the following molecules has a linear geometry according to VSEPR theory and sp hybridization?",
        "options": {
            "A": "SO2",
            "B": "BeCl2",
            "C": "H2O",
            "D": "O3"
        },
        "correct": "B"
    },
    {
        "skill": "NEET Chemistry - Organic Reaction Mechanisms",
        "text": "When propene reacts with HBr in the presence of benzoyl peroxide, the major organic product formed is:",
        "options": {
            "A": "2-Bromopropane",
            "B": "1-Bromopropane",
            "C": "1,2-Dibromopropane",
            "D": "2,2-Dibromopropane"
        },
        "correct": "B"
    },
    {
        "skill": "NEET Chemistry - Physical Chemistry",
        "text": "For an endothermic reaction at chemical equilibrium (ΔH > 0), what is the effect of increasing temperature on the equilibrium constant K?",
        "options": {
            "A": "K increases and equilibrium shifts forward",
            "B": "K decreases and equilibrium shifts backward",
            "C": "K remains constant",
            "D": "K becomes zero"
        },
        "correct": "A"
    },
    {
        "skill": "NEET Biology - Botany & Plant Physiology",
        "text": "During which phase of meiosis do homologous chromosomes undergo crossing over and exchange of genetic material?",
        "options": {
            "A": "Leptotene",
            "B": "Zygotene",
            "C": "Pachytene",
            "D": "Diakinesis"
        },
        "correct": "C"
    },
    {
        "skill": "NEET Biology - Genetics & Molecular Basis",
        "text": "Which codon functions as the universal initiation codon for translation and codes for Methionine in eukaryotes?",
        "options": {
            "A": "UAA",
            "B": "AUG",
            "C": "UGA",
            "D": "UAG"
        },
        "correct": "B"
    },
    {
        "skill": "NEET Biology - Zoology & Human Physiology",
        "text": "The primary structural and functional filtration unit of the human kidney responsible for blood ultrafiltration is the:",
        "options": {
            "A": "Nephron (Glomerulus and Bowman's capsule)",
            "B": "Loop of Henle only",
            "C": "Collecting duct",
            "D": "Urinary bladder"
        },
        "correct": "A"
    },
    {
        "skill": "NEET Biology - Ecology & Environment",
        "text": "According to Lindeman's 10% law of energy transfer, if producers capture 10,000 J of energy, how much energy is available to tertiary consumers?",
        "options": {
            "A": "1,000 J",
            "B": "100 J",
            "C": "10 J",
            "D": "1 J"
        },
        "correct": "C"
    },
    {
        "skill": "NEET Physics - Electrodynamics & Magnetism",
        "text": "Two point charges +q and -q are placed at a distance 2a apart. The electric potential at the midpoint of the line joining them is:",
        "options": {
            "A": "Zero",
            "B": "q / (4πε0 a)",
            "C": "2q / (4πε0 a)",
            "D": "-q / (4πε0 a)"
        },
        "correct": "A"
    },
    {
        "skill": "NEET Chemistry - Physical Chemistry",
        "text": "What is the pH of a 1.0 × 10^-3 M aqueous solution of HCl at 25°C?",
        "options": {
            "A": "1.0",
            "B": "3.0",
            "C": "11.0",
            "D": "7.0"
        },
        "correct": "B"
    },
    {
        "skill": "NEET Biology - Zoology & Human Physiology",
        "text": "In a healthy human heart, the primary natural pacemaker that initiates cardiac electrical impulses is the:",
        "options": {
            "A": "Atrioventricular (AV) Node",
            "B": "Sinoatrial (SA) Node",
            "C": "Bundle of His",
            "D": "Purkinje fibers"
        },
        "correct": "B"
    },
    {
        "skill": "NEET Chemistry - Inorganic & Periodic Trends",
        "text": "Which of the following transition metal coordination complexes exhibits optical isomerism (chirality)?",
        "options": {
            "A": "cis-[Co(en)2Cl2]+",
            "B": "trans-[Co(en)2Cl2]+",
            "C": "[Co(NH3)4Cl2]+",
            "D": "[Ni(CO)4]"
        },
        "correct": "A"
    },
    {
        "skill": "NEET Biology - Botany & Plant Physiology",
        "text": "The primary carbon dioxide acceptor molecule in C4 photosynthetic pathway plants (like Maize and Sugarcane) is:",
        "options": {
            "A": "Ribulose-1,5-bisphosphate (RuBP)",
            "B": "Phosphoenolpyruvate (PEP)",
            "C": "Oxaloacetic acid (OAA)",
            "D": "3-Phosphoglycerate (PGA)"
        },
        "correct": "B"
    }
]

def migrate_database():
    with app.app_context():
        print("Starting NEET database migration...")

        # 1. Update/insert Careers
        career_objects = {}
        for c_data in NEET_CAREERS:
            career = Career.query.filter_by(name=c_data["name"]).first()
            if not career:
                career = Career(name=c_data["name"], description=c_data["description"])
                db.session.add(career)
                db.session.flush()
            else:
                career.description = c_data["description"]
            career_objects[c_data["name"]] = career

        # Update any old careers to the primary NEET career
        first_neet_career = list(career_objects.values())[0]
        old_careers = Career.query.filter(~Career.name.in_([c["name"] for c in NEET_CAREERS])).all()
        for oc in old_careers:
            print(f"Updating old career '{oc.name}' -> '{first_neet_career.name}'")
            # Point users with old career to first NEET career
            User.query.filter_by(career_id=oc.id).update({"career_id": first_neet_career.id})

        # 2. Update/insert Skills
        skill_objects = {}
        for s_name, s_desc in NEET_SKILLS:
            skill = Skill.query.filter_by(name=s_name).first()
            if not skill:
                skill = Skill(name=s_name, description=s_desc)
                db.session.add(skill)
                db.session.flush()
            else:
                skill.description = s_desc
            skill_objects[s_name] = skill

        # Link skills to careers
        for career in career_objects.values():
            for skill in skill_objects.values():
                cs = CareerSkill.query.filter_by(career_id=career.id, skill_id=skill.id).first()
                if not cs:
                    cs = CareerSkill(career_id=career.id, skill_id=skill.id, target_score=85.0)
                    db.session.add(cs)

        # 3. Clean up legacy questions and assessments in proper FK dependency order
        AssessmentAnswer.query.delete()
        AssessmentAttempt.query.delete()
        Question.query.delete()
        Assessment.query.delete()
        db.session.flush()

        # 4. Create NEET Diagnostic Assessments
        for career in career_objects.values():
            assessment = Assessment(
                title=f"NEET UG 2026 Core Diagnostic Assessment ({career.name})",
                type="diagnostic",
                career_id=career.id
            )
            db.session.add(assessment)
            db.session.flush()

            # Add questions
            for q_data in NEET_QUESTIONS:
                skill_obj = skill_objects.get(q_data["skill"])
                q = Question(
                    assessment_id=assessment.id,
                    skill_id=skill_obj.id if skill_obj else None,
                    text=q_data["text"],
                    options=q_data["options"],
                    correct_option=q_data["correct"]
                )
                db.session.add(q)

        # Also create general NEET assessments
        general_assessments = [
            ("NEET Physics Diagnostic Test", "NEET Physics - Mechanics & Kinematics"),
            ("NEET Chemistry Diagnostic Test", "NEET Chemistry - Physical Chemistry"),
            ("NEET Biology Diagnostic Test", "NEET Biology - Botany & Plant Physiology"),
        ]
        for a_title, default_skill in general_assessments:
            gen_assess = Assessment(
                title=a_title,
                type="standard",
                career_id=first_neet_career.id
            )
            db.session.add(gen_assess)
            db.session.flush()
            for q_data in NEET_QUESTIONS[:8]:
                q = Question(
                    assessment_id=gen_assess.id,
                    skill_id=skill_objects[default_skill].id,
                    text=q_data["text"],
                    options=q_data["options"],
                    correct_option=q_data["correct"]
                )
                db.session.add(q)

        # Update all existing users
        User.query.update({"career_id": first_neet_career.id})

        db.session.commit()
        print("NEET database migration completed successfully!")
        print(f"Total NEET Careers: {Career.query.count()}")
        print(f"Total NEET Skills: {Skill.query.count()}")
        print(f"Total NEET Assessments: {Assessment.query.count()}")
        print(f"Total NEET Questions: {Question.query.count()}")

if __name__ == "__main__":
    migrate_database()
