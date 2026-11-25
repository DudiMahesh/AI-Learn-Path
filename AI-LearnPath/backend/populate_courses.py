"""
populate_courses.py — Populates rich courses, topics, and full lessons in the database.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from models import db
from models.career import Career
from models.course import Course
from models.topic import Topic
from models.lesson import Lesson

app = create_app()

RICH_COURSES = [
    {
        "title": "Python for Data Science & AI",
        "description": "Master Python programming from scratch to building data analysis pipelines, numerical computing with NumPy, and data manipulation with Pandas.",
        "career": "Data Scientist",
        "difficulty": "beginner",
        "topics": [
            {
                "title": "Python Core Essentials",
                "description": "Fundamental syntax, variables, data structures, and functional programming in Python.",
                "lessons": [
                    {
                        "title": "Variables, Data Types & Control Flow",
                        "content": "# Variables, Data Types & Control Flow\n\nPython is a dynamically typed, expressive language. In this lesson, we cover essential data types (`int`, `float`, `str`, `bool`), conditionals (`if`, `elif`, `else`), and iterative loops (`for`, `while`).\n\n```python\n# Example: List Comprehension\nnumbers = [1, 2, 3, 4, 5]\nsquares = [n ** 2 for n in numbers if n % 2 == 0]\nprint(squares)  # [4, 16]\n```\n\n### Key Takeaways\n- Use lists for ordered sequences and dicts for key-value lookups.\n- List comprehensions provide clean, pythonic transformations."
                    },
                    {
                        "title": "Functions, Lambdas & Modular Code",
                        "content": "# Functions, Lambdas & Modular Code\n\nWriting clean, reusable functions with type hints and docstrings is crucial for maintainable AI pipelines.\n\n```python\ndef calculate_metrics(y_true: list, y_pred: list) -> float:\n    \"\"\"Calculates simple accuracy between true and predicted labels.\"\"\"\n    correct = sum(1 for yt, yp in zip(y_true, y_pred) if yt == yp)\n    return correct / len(y_true)\n```\n\n- Define clear inputs and return values.\n- Use `*args` and `**kwargs` for flexible arguments."
                    }
                ]
            },
            {
                "title": "Data Manipulation with Pandas & NumPy",
                "description": "High-performance vector operations and tabular data transformation.",
                "lessons": [
                    {
                        "title": "NumPy Arrays & Vectorized Math",
                        "content": "# NumPy Arrays & Vectorized Math\n\nNumPy brings C-speed array calculations to Python, forming the bedrock of modern ML libraries.\n\n```python\nimport numpy as np\n\na = np.array([1.0, 2.0, 3.0])\nb = np.array([4.0, 5.0, 6.0])\n# Vectorized dot product\ndot_product = np.dot(a, b)\n```"
                    },
                    {
                        "title": "Pandas DataFrames & Aggregation",
                        "content": "# Pandas DataFrames & Aggregation\n\nLearn how to load CSV/JSON datasets, handle missing values, and group data by key dimensions.\n\n```python\nimport pandas as pd\n\ndf = pd.read_csv('dataset.csv')\nclean_df = df.dropna().groupby('category')['score'].mean()\n```"
                    }
                ]
            }
        ]
    },
    {
        "title": "Full-Stack Web Development with React & Node",
        "description": "Build production-grade web applications from front-end user interfaces in React to scalable REST APIs with Node.js and Express.",
        "career": "Full Stack Developer",
        "difficulty": "intermediate",
        "topics": [
            {
                "title": "Modern Frontend with React & TailwindCSS",
                "description": "Component design, hooks, state management, and modern styling.",
                "lessons": [
                    {
                        "title": "React State, Effects & Custom Hooks",
                        "content": "# React State, Effects & Custom Hooks\n\nReact enables declarative UI development. Use `useState` for local state and `useEffect` for asynchronous side effects.\n\n```jsx\nimport { useState, useEffect } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    document.title = `Count: ${count}`;\n  }, [count]);\n\n  return <button onClick={() => setCount(c => c + 1)}>Increment: {count}</button>;\n}\n```"
                    }
                ]
            },
            {
                "title": "Backend APIs with Node & Express",
                "description": "Routing, middleware, JWT token verification, and database integration.",
                "lessons": [
                    {
                        "title": "RESTful Route Architecture & JWT Auth",
                        "content": "# RESTful Route Architecture & JWT Auth\n\nBuild secure APIs that validate tokens and handle error boundaries properly.\n\n```javascript\nconst express = require('express');\nconst app = express();\n\napp.use(express.json());\n\napp.get('/api/health', (req, res) => {\n  res.json({ status: 'ok', uptime: process.uptime() });\n});\n```"
                    }
                ]
            }
        ]
    },
    {
        "title": "Machine Learning & Predictive Modeling",
        "description": "Supervised and unsupervised machine learning algorithms using Scikit-Learn with real-world classification, regression, and clustering tasks.",
        "career": "Machine Learning Engineer",
        "difficulty": "intermediate",
        "topics": [
            {
                "title": "Supervised Learning Algorithms",
                "description": "Linear regression, logistic classification, decision trees, and ensemble methods.",
                "lessons": [
                    {
                        "title": "Training & Evaluating Scikit-Learn Classifiers",
                        "content": "# Training & Evaluating Scikit-Learn Classifiers\n\nLearn how to split datasets into train/validation sets, train Random Forest classifiers, and inspect confusion matrices.\n\n```python\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report\n\nclf = RandomForestClassifier(n_estimators=100, random_state=42)\nclf.fit(X_train, y_train)\npreds = clf.predict(X_test)\nprint(classification_report(y_test, preds))\n```"
                    }
                ]
            }
        ]
    },
    {
        "title": "Cloud Architecture & Docker Containers",
        "description": "Containerize microservices with Docker, orchestrate deployments, and manage resilient cloud infrastructure on AWS.",
        "career": "Cloud Engineer",
        "difficulty": "intermediate",
        "topics": [
            {
                "title": "Docker Containers & Compose",
                "description": "Creating lightweight Docker images and multi-container environments.",
                "lessons": [
                    {
                        "title": "Building Production Dockerfiles",
                        "content": "# Building Production Dockerfiles\n\nMulti-stage Docker builds reduce image size and improve security posture.\n\n```dockerfile\n# Stage 1: Build\nFROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Stage 2: Serve\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\nEXPOSE 80\nCMD [\"nginx\", \"-g\", \"daemon off;\"]\n```"
                    }
                ]
            }
        ]
    },
    {
        "title": "Cybersecurity & Threat Defense",
        "description": "Core concepts of information security, network monitoring, vulnerability assessment, and defensive cryptography.",
        "career": "Cybersecurity Analyst",
        "difficulty": "beginner",
        "topics": [
            {
                "title": "Network Defense & Access Control",
                "description": "Firewalls, packet inspection, authentication protocols, and zero-trust architecture.",
                "lessons": [
                    {
                        "title": "The CIA Triad & Cryptographic Primitives",
                        "content": "# The CIA Triad & Cryptographic Primitives\n\nSecurity rests on three pillars: **Confidentiality**, **Integrity**, and **Availability**.\n\n### Core Tenets:\n- **Symmetric Encryption**: AES-256 for fast payload encryption.\n- **Asymmetric Encryption**: RSA/ECC for key exchange and digital signatures.\n- **Hashing**: SHA-256 for integrity verification."
                    }
                ]
            }
        ]
    }
]

def populate():
    with app.app_context():
        print("[*] Seeding rich course content, topics, and lessons...")
        for cdata in RICH_COURSES:
            career = Career.query.filter_by(name=cdata['career']).first()
            course = Course.query.filter_by(title=cdata['title']).first()
            if not course:
                course = Course(
                    title=cdata['title'],
                    description=cdata['description'],
                    difficulty=cdata['difficulty'],
                    career_id=career.id if career else None
                )
                db.session.add(course)
                db.session.flush()
                print(f"  + Course added: {course.title}")
            else:
                course.description = cdata['description']
                course.difficulty = cdata['difficulty']

            for t_idx, tdata in enumerate(cdata.get('topics', [])):
                topic = Topic.query.filter_by(course_id=course.id, title=tdata['title']).first()
                if not topic:
                    topic = Topic(
                        course_id=course.id,
                        title=tdata['title'],
                        description=tdata['description'],
                        order_index=t_idx + 1
                    )
                    db.session.add(topic)
                    db.session.flush()
                    print(f"    - Topic: {topic.title}")

                for l_idx, ldata in enumerate(tdata.get('lessons', [])):
                    lesson = Lesson.query.filter_by(topic_id=topic.id, title=ldata['title']).first()
                    if not lesson:
                        lesson = Lesson(
                            topic_id=topic.id,
                            title=ldata['title'],
                            content=ldata['content'],
                            order_index=l_idx + 1
                        )
                        db.session.add(lesson)
                        print(f"      * Lesson: {lesson.title}")

        db.session.commit()
        print("[OK] Rich course dataset successfully populated in database!")

if __name__ == '__main__':
    populate()
