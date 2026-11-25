"""
populate_all_courses.py
Populates comprehensive, high-quality modules, topics, and full educational lessons for all courses in AI-LearnPath.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from models import db
from models.course import Course
from models.topic import Topic
from models.lesson import Lesson

app = create_app()

COURSE_CURRICULA = {
    "Python for Data Science": [
        {
            "title": "Python Basics & Core Data Structures",
            "description": "Variables, collections (lists, dictionaries, sets), control flow, and functions.",
            "lessons": [
                {
                    "title": "Python Data Types, Indexing & Slicing",
                    "content": """# Python Data Types, Indexing & Slicing

Python is one of the most popular programming languages for Data Science and Artificial Intelligence due to its readability and powerful ecosystem.

## Core Data Types
In Python, numbers, strings, and booleans form the primitive building blocks:
- `int` and `float` for numerical computations
- `str` for text manipulation
- `bool` for conditional logic (`True` / `False`)

```python
# Working with lists and list slicing
dataset_scores = [88, 92, 79, 95, 100, 84, 91]

# Slicing the top 3 scores
top_three = sorted(dataset_scores, reverse=True)[:3]
print(f"Top 3 scores: {top_three}")  # [100, 95, 92]
```

### Key Takeaways
1. Python lists are zero-indexed and mutable.
2. Slicing syntax `[start:stop:step]` allows extraction without copying full lists manually.
3. List comprehensions allow fast, vector-like data transformations.
"""
                },
                {
                    "title": "Dictionaries & Lambda Functions in Data Pipelines",
                    "content": """# Dictionaries & Lambda Functions in Data Pipelines

Dictionaries provide fast $O(1)$ key-value lookups, making them ideal for caching, entity mapping, and JSON response parsing.

```python
student_records = {
    "user_101": {"name": "Alice", "score": 94, "category": "AI/ML"},
    "user_102": {"name": "Bob", "score": 82, "category": "Web Dev"}
}

# Filter students with score > 90 using lambda & filter
high_performers = list(filter(lambda u: u["score"] >= 90, student_records.values()))
print(high_performers)
```

### Best Practices:
- Always use `.get(key, default)` to avoid `KeyError` exceptions when parsing external datasets.
- Prefer dictionary comprehensions for reshaping raw API payloads into feature tables.
"""
                }
            ]
        },
        {
            "title": "Data Analysis with Pandas & NumPy",
            "description": "High-performance vector operations, DataFrame cleaning, aggregation, and filtering.",
            "lessons": [
                {
                    "title": "NumPy Arrays & Fast Matrix Computations",
                    "content": """# NumPy Arrays & Fast Matrix Computations

NumPy (Numerical Python) provides multidimensional array objects (`ndarray`) with contiguous C-memory layouts for lightning-fast numerical processing.

```python
import numpy as np

# Create matrix of simulated sensor readings (1000 samples, 4 features)
X = np.random.randn(1000, 4)

# Calculate mean and standard deviation along feature columns
mean_vector = np.mean(X, axis=0)
std_vector = np.std(X, axis=0)

# Feature normalization (Z-score standard scaling)
X_scaled = (X - mean_vector) / std_vector
print(f"Scaled shape: {X_scaled.shape}, Mean approx: {np.round(np.mean(X_scaled, axis=0), 2)}")
```
"""
                },
                {
                    "title": "Pandas Data Cleaning & Aggregation Workflows",
                    "content": """# Pandas Data Cleaning & Aggregation Workflows

Pandas is the industry standard for tabular data manipulation, handling missing values, grouped aggregations, and joins.

```python
import pandas as pd

# Creating a DataFrame from raw course analytics
df = pd.DataFrame({
    'student_id': [1, 2, 3, 4, 5],
    'course': ['Python', 'Python', 'ML', 'ML', 'Cloud'],
    'hours_spent': [14.5, 22.0, 31.2, 18.0, 9.5],
    'completed': [True, True, False, True, False]
})

# Summary statistics grouped by course category
course_summary = df.groupby('course').agg(
    avg_hours=('hours_spent', 'mean'),
    completion_rate=('completed', 'mean')
)
print(course_summary)
```
"""
                }
            ]
        },
        {
            "title": "Data Visualization & Exploratory Data Analysis (EDA)",
            "description": "Visualizing distributions, correlations, and feature interactions with Matplotlib and Seaborn.",
            "lessons": [
                {
                    "title": "Histograms, Heatmaps & Correlation Matrices",
                    "content": """# Histograms, Heatmaps & Correlation Matrices

Exploratory Data Analysis (EDA) allows machine learning practitioners to identify outliers, check skewness, and assess multicollinearity before training models.

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Visualizing feature relationships
plt.figure(figsize=(8, 6))
# sns.heatmap(df.corr(), annot=True, cmap='viridis')
plt.title("Correlation Matrix for Predictive Features")
# plt.show()
```
"""
                }
            ]
        }
    ],
    "Statistics & Probability Fundamentals": [
        {
            "title": "Descriptive Statistics & Distributions",
            "description": "Measures of central tendency, spread, variance, and standard normal distributions.",
            "lessons": [
                {
                    "title": "Mean, Median, Standard Deviation & Skewness",
                    "content": """# Mean, Median, Standard Deviation & Skewness

Understanding how data points cluster and spread is essential for choosing appropriate loss functions and machine learning algorithms.

## Key Formulas
- **Sample Mean**: $\\bar{x} = \\frac{1}{n} \\sum x_i$
- **Variance**: $\\sigma^2 = \\frac{1}{n-1} \\sum (x_i - \\bar{x})^2$
- **Standard Deviation**: $\\sigma = \\sqrt{\\sigma^2}$

```python
import numpy as np

data = [12, 15, 18, 22, 29, 31, 35, 120]  # Note the outlier (120)
print(f"Mean (sensitive to outliers): {np.mean(data):.2f}")
print(f"Median (robust to outliers): {np.median(data):.2f}")
```
"""
                }
            ]
        },
        {
            "title": "Probability Theory & Hypothesis Testing",
            "description": "Bayes' Theorem, p-values, confidence intervals, and A/B testing methodology.",
            "lessons": [
                {
                    "title": "Hypothesis Testing, P-values & A/B Testing",
                    "content": """# Hypothesis Testing, P-values & A/B Testing

Hypothesis testing helps decide whether observed performance differences (such as model A vs model B) are statistically significant or just random noise.

```python
from scipy import stats

group_a_conversions = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1]
group_b_conversions = [1, 1, 1, 1, 1, 1, 0, 1, 1, 1]

t_stat, p_val = stats.ttest_ind(group_a_conversions, group_b_conversions)
print(f"T-statistic: {t_stat:.4f}, P-value: {p_val:.4f}")
if p_val < 0.05:
    print("Statistically significant improvement (p < 0.05)!")
```
"""
                }
            ]
        }
    ],
    "Machine Learning with Scikit-Learn": [
        {
            "title": "Supervised Learning Fundamentals",
            "description": "Regression, Classification, Decision Trees, and Ensemble Methods (Random Forest, Gradient Boosting).",
            "lessons": [
                {
                    "title": "Building a Classification Pipeline with Scikit-Learn",
                    "content": """# Building a Classification Pipeline with Scikit-Learn

In this lesson, we train a Random Forest classifier using Scikit-Learn's modular pipeline architecture.

```python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import numpy as np

# Simulated dataset (100 samples, 5 features)
X = np.random.randn(100, 5)
y = (X[:, 0] + X[:, 1] > 0).astype(int)

# 80/20 train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = RandomForestClassifier(n_estimators=50, random_state=42)
clf.fit(X_train, y_train)

predictions = clf.predict(X_test)
print(f"Model Accuracy: {accuracy_score(y_test, predictions):.2%}")
print(classification_report(y_test, predictions))
```
"""
                }
            ]
        },
        {
            "title": "Model Evaluation & Hyperparameter Tuning",
            "description": "Cross-validation, ROC-AUC curves, GridSearchCV, and preventing overfitting.",
            "lessons": [
                {
                    "title": "Cross-Validation & Hyperparameter Search",
                    "content": """# Cross-Validation & Hyperparameter Search

Cross-validation protects against overfitting by assessing model generalizability across $K$ folds.

```python
from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier()
param_grid = {
    'n_estimators': [50, 100],
    'max_depth': [3, 5, 10]
}

grid_search = GridSearchCV(rf, param_grid, cv=5, scoring='accuracy')
# grid_search.fit(X_train, y_train)
# print("Best parameters:", grid_search.best_params_)
```
"""
                }
            ]
        }
    ],
    "HTML, CSS & JavaScript Essentials": [
        {
            "title": "Semantic HTML5 & Modern Layouts",
            "description": "Modern DOM structure, accessibility (a11y), semantic markup, and responsive meta tags.",
            "lessons": [
                {
                    "title": "Semantic Document Structure & SEO Best Practices",
                    "content": """# Semantic Document Structure & SEO Best Practices

Semantic HTML gives meaning to web pages rather than just defining visual appearance.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Web App</title>
</head>
<body>
  <header>
    <nav aria-label="Main Navigation">
      <a href="/">Home</a>
      <a href="/courses">Courses</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>Understanding Semantic HTML</h1>
      <p>Semantic tags improve accessibility for screen readers and search engines.</p>
    </article>
  </main>
</body>
</html>
```
"""
                }
            ]
        },
        {
            "title": "Modern JavaScript (ES6+) & Async Programming",
            "description": "Promises, async/await, arrow functions, destructuring, and API fetching.",
            "lessons": [
                {
                    "title": "Async/Await, Fetch API & Error Handling",
                    "content": """# Async/Await, Fetch API & Error Handling

Modern web applications constantly communicate with backend REST and GraphQL APIs.

```javascript
async function fetchCourseDetails(courseId) {
  try {
    const response = await fetch(`/api/courses/${courseId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Loaded course:", data.title);
    return data;
  } catch (error) {
    console.error("Failed to load course details:", error.message);
    return null;
  }
}
```
"""
                }
            ]
        }
    ],
    "React.js Complete Guide": [
        {
            "title": "Components, Props & State Hooks",
            "description": "Component hierarchies, JSX syntax, useState, and reactive UI re-renders.",
            "lessons": [
                {
                    "title": "State Management with useState & Props",
                    "content": """# State Management with useState & Props

React components encapsulate logic and visual structure into modular, reusable blocks.

```jsx
import React, { useState } from 'react';

export function CourseEnrollButton({ courseTitle }) {
  const [enrolled, setEnrolled] = useState(false);

  return (
    <button 
      onClick={() => setEnrolled(!enrolled)}
      className={`px-4 py-2 rounded-xl font-bold transition-all ${
        enrolled ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700'
      }`}
    >
      {enrolled ? `✓ Enrolled in ${courseTitle}` : `Start Learning ${courseTitle}`}
    </button>
  );
}
```
"""
                }
            ]
        },
        {
            "title": "Side Effects & Custom Hooks",
            "description": "Mastering useEffect, cleanup functions, memoization (useMemo/useCallback), and custom hooks.",
            "lessons": [
                {
                    "title": "useEffect Lifecycle & Cleanups",
                    "content": """# useEffect Lifecycle & Cleanups

Use `useEffect` for data fetching, subscriptions, and DOM updates synchronized with state.

```jsx
import { useState, useEffect } from 'react';

export function useCourse(id) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch(`/api/courses/${id}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setCourse(data);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [id]);

  return { course, loading };
}
```
"""
                }
            ]
        }
    ],
    "Node.js & Express Backend": [
        {
            "title": "REST API Design & Middleware",
            "description": "Express server architecture, route handling, request validation, and JWT security.",
            "lessons": [
                {
                    "title": "Express Route Handlers & JSON Middlewares",
                    "content": """# Express Route Handlers & JSON Middlewares

Learn how to build lightweight, high-performance REST APIs in Node.js.

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Sample course endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
```
"""
                }
            ]
        }
    ],
    "Cybersecurity Fundamentals": [
        {
            "title": "Security Principles & Network Defense",
            "description": "The CIA Triad, encryption fundamentals, firewall configs, and zero-trust policies.",
            "lessons": [
                {
                    "title": "The CIA Triad, Hashing & Public Key Cryptography",
                    "content": """# The CIA Triad, Hashing & Public Key Cryptography

Security architectures rest on three core pillars:
1. **Confidentiality**: Ensuring data is accessible only to authorized entities.
2. **Integrity**: Safeguarding the accuracy and completeness of information.
3. **Availability**: Ensuring timely, reliable access to information systems.

```python
import hashlib

def generate_checksum(payload: str) -> str:
    \"\"\"Generates a SHA-256 cryptographic hash for data integrity verification.\"\"\"
    return hashlib.sha256(payload.encode('utf-8')).hexdigest()

print("Integrity Checksum:", generate_checksum("Confidential Course Exam Content"))
```
"""
                }
            ]
        }
    ],
    "AWS Cloud Practitioner": [
        {
            "title": "Cloud Computing Essentials & Core Services",
            "description": "AWS global infrastructure, EC2 compute instances, S3 storage, and IAM permissions.",
            "lessons": [
                {
                    "title": "AWS Compute, Storage & Identity Management (IAM)",
                    "content": """# AWS Compute, Storage & Identity Management (IAM)

AWS provides on-demand cloud computing resources with pay-as-you-go pricing.

## Essential Services
- **Amazon EC2**: Scalable virtual servers for running backend microservices.
- **Amazon S3**: Highly durable (99.999999999%) object storage for course assets and videos.
- **AWS IAM**: Fine-grained role-based access control policies.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::course-learning-materials/*"
    }
  ]
}
```
"""
                }
            ]
        }
    ],
    "Docker & Kubernetes Mastery": [
        {
            "title": "Containerization with Docker",
            "description": "Writing Dockerfiles, managing multi-stage builds, and Docker Compose orchestration.",
            "lessons": [
                {
                    "title": "Multi-Stage Dockerfile for Production Apps",
                    "content": """# Multi-Stage Dockerfile for Production Apps

Containerizing applications ensures identical runtime environments from development to production.

```dockerfile
# Multi-stage production container
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
"""
                }
            ]
        }
    ]
}

def generate_default_curriculum(course_title):
    return [
        {
            "title": f"1. Introduction & Fundamentals of {course_title}",
            "description": f"Core principles, architecture, environment setup, and baseline terminology for {course_title}.",
            "lessons": [
                {
                    "title": f"Getting Started with {course_title}",
                    "content": f"""# Getting Started with {course_title}

Welcome to **{course_title}**! In this comprehensive curriculum, you will build hands-on skills from fundamental concepts to production-grade implementations.

## Course Objectives
- Master the core syntax, mental models, and best practices.
- Write clean, maintainable, and well-tested solutions.
- Understand how industry professionals deploy and optimize these technologies.

```python
# Initializing baseline configuration
def initialize_learning_environment():
    print("Welcome to {course_title}!")
    return {{"status": "ready", "module": "Fundamentals"}}

config = initialize_learning_environment()
```

### What You'll Learn:
1. Core terminology, concepts, and tooling.
2. Architecture breakdown and real-world design patterns.
3. Diagnostic readiness for quizzes and practical assessments.
"""
                },
                {
                    "title": f"Core Syntax & Foundations",
                    "content": f"""# Core Syntax & Foundations in {course_title}

Understanding the core building blocks is essential before moving into complex patterns.

```javascript
// Example: Core execution pattern
const courseModule = {{
  name: "{course_title}",
  level: "Beginner to Advanced",
  interactive: true
}};

console.log(`Starting module: ${{courseModule.name}}`);
```

### Pro Tip:
Take interactive notes as you work through each lesson, and ask the AI Tutor whenever you need an in-depth code explanation!
"""
                }
            ]
        },
        {
            "title": f"2. Hands-on Implementation & Lab Exercises",
            "description": f"Practical exercises, guided problem solving, and building real-world projects for {course_title}.",
            "lessons": [
                {
                    "title": f"Practical Implementation Guide",
                    "content": f"""# Practical Implementation Guide: {course_title}

In this lesson, we put theory into practice with a guided implementation exercise.

```python
class SolutionEngine:
    def __init__(self, name: str):
        self.name = name
        self.completed_steps = []

    def execute_step(self, step_name: str):
        self.completed_steps.append(step_name)
        print(f"[OK] Successfully executed: {{step_name}}")

engine = SolutionEngine("{course_title}")
engine.execute_step("Data Ingestion & Verification")
engine.execute_step("Model Calibration")
```

### Exercise Instructions:
- Review the code snippet above.
- Test your understanding with the practice quiz below or ask the AI tutor for interactive variations!
"""
                }
            ]
        },
        {
            "title": f"3. Advanced Optimization & Industry Best Practices",
            "description": f"Production readiness, debugging strategies, performance profiling, and capstone review.",
            "lessons": [
                {
                    "title": f"Production Architecture & Capstone Review",
                    "content": f"""# Production Architecture & Capstone Review

Congratulations on reaching the advanced phase of **{course_title}**!

### Key Architectural Guidelines:
1. **Scalability**: Design modules with low coupling and high cohesion.
2. **Monitoring & Logging**: Track performance metrics and error rates.
3. **Security**: Validate inputs and follow the principle of least privilege.

```python
# Summary verification
def verify_mastery():
    return {{"course": "{course_title}", "badge": "Verified Skill Badge", "status": "Mastered"}}

print(verify_mastery())
```
"""
                }
            ]
        }
    ]

def seed_all():
    with app.app_context():
        print("[*] Ensuring ALL courses have complete topics and lesson materials...")
        courses = Course.query.all()
        for course in courses:
            # Check if course has matching predefined curriculum or fallback
            curriculum = COURSE_CURRICULA.get(course.title) or generate_default_curriculum(course.title)
            
            # Check existing topics
            existing_topics = Topic.query.filter_by(course_id=course.id).all()
            if len(existing_topics) == 0:
                print(f"  + Populating topics for Course [{course.id}] '{course.title}'...")
                for t_idx, tdata in enumerate(curriculum):
                    topic = Topic(
                        course_id=course.id,
                        title=tdata['title'],
                        description=tdata.get('description', ''),
                        order_index=t_idx + 1
                    )
                    db.session.add(topic)
                    db.session.flush()

                    for l_idx, ldata in enumerate(tdata.get('lessons', [])):
                        lesson = Lesson(
                            topic_id=topic.id,
                            title=ldata['title'],
                            content=ldata['content'],
                            order_index=l_idx + 1
                        )
                        db.session.add(lesson)
                db.session.commit()
            else:
                # Ensure topics have lessons
                for t in existing_topics:
                    lessons = Lesson.query.filter_by(topic_id=t.id).all()
                    if len(lessons) == 0:
                        print(f"    - Adding missing lesson to topic '{t.title}'...")
                        lesson = Lesson(
                            topic_id=t.id,
                            title=f"Lesson 1: Overview of {t.title}",
                            content=f"# {t.title}\n\nComprehensive lesson overview and interactive guide for {t.title}.\n\n```python\n# Lesson Material\nprint('Mastering {t.title}')\n```",
                            order_index=1
                        )
                        db.session.add(lesson)
                db.session.commit()

        print("[OK] All courses verified and populated with comprehensive curriculums!")

if __name__ == '__main__':
    seed_all()
