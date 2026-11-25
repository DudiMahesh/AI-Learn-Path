-- ============================================================
-- AI LearnPath - Development Seed Data
-- ============================================================
-- NOTE: Run schema.sql FIRST before this file.

-- ============================================================
-- CAREERS
-- ============================================================
INSERT INTO careers (name, description, icon) VALUES
('Data Scientist', 'Analyze and interpret complex data using statistical methods, machine learning, and data visualization to drive business decisions.', 'chart'),
('Web Developer', 'Design and build web applications using modern frontend and backend technologies.', 'code'),
('Cybersecurity Analyst', 'Protect systems and networks from digital attacks, unauthorized access, and data breaches.', 'shield'),
('Cloud Engineer', 'Design, implement, and manage cloud infrastructure and services on platforms like AWS, GCP, or Azure.', 'cloud'),
('Data Engineer', 'Build and maintain data pipelines, warehouses, and infrastructure for large-scale data processing.', 'database'),
('Machine Learning Engineer', 'Design, build, and deploy machine learning models and MLOps pipelines at scale.', 'cpu')
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- SKILLS
-- ============================================================
INSERT INTO skills (name, category, description) VALUES
-- Data Science / ML
('Python', 'Programming', 'Python programming language fundamentals and data science libraries'),
('SQL', 'Database', 'Structured Query Language for database querying and manipulation'),
('Statistics', 'Mathematics', 'Statistical methods, probability theory, and data analysis'),
('Data Analysis', 'Data Science', 'Techniques for exploring, cleaning, and analyzing datasets'),
('Machine Learning', 'AI/ML', 'Supervised and unsupervised machine learning algorithms'),
('Data Visualization', 'Data Science', 'Creating charts, graphs, and dashboards to communicate insights'),
('Deep Learning', 'AI/ML', 'Neural networks, backpropagation, and deep learning frameworks'),
('NumPy & Pandas', 'Data Science', 'Core Python libraries for numerical computing and data manipulation'),
-- Web Development
('HTML & CSS', 'Web', 'Hypertext Markup Language and Cascading Style Sheets for web structure and styling'),
('JavaScript', 'Programming', 'JavaScript programming for interactive web applications'),
('React.js', 'Web Framework', 'React frontend library for building user interfaces'),
('Node.js', 'Backend', 'Server-side JavaScript runtime environment'),
('REST APIs', 'Backend', 'Designing and consuming RESTful web services'),
('Databases (Web)', 'Database', 'Database design and integration for web applications'),
-- Cybersecurity
('Networking Fundamentals', 'Networking', 'TCP/IP, OSI model, protocols, and network architecture'),
('Linux Administration', 'Systems', 'Linux command line, file system, and system administration'),
('Security Fundamentals', 'Security', 'Core concepts of information security and risk management'),
('Authentication & Authorization', 'Security', 'Identity management, OAuth, JWT, and access control'),
('Cryptography', 'Security', 'Encryption, hashing, and cryptographic protocols'),
('Vulnerability Assessment', 'Security', 'Identifying and evaluating security vulnerabilities'),
-- Cloud
('Cloud Basics', 'Cloud', 'Fundamental cloud computing concepts and service models'),
('AWS / GCP / Azure', 'Cloud', 'Major cloud platform services and tools'),
('Containers & Docker', 'DevOps', 'Containerization with Docker and container orchestration'),
('Infrastructure as Code', 'DevOps', 'Terraform, CloudFormation, and automated infrastructure management'),
('CI/CD', 'DevOps', 'Continuous integration and continuous deployment pipelines'),
-- General
('Git & Version Control', 'Tools', 'Git version control, branching strategies, and collaboration'),
('Problem Solving', 'General', 'Algorithmic thinking and computational problem solving'),
('Data Structures', 'Programming', 'Arrays, lists, trees, graphs, and algorithm complexity')
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- CAREER-SKILL MAPPINGS
-- ============================================================

-- Data Scientist
INSERT INTO career_skills (career_id, skill_id, target_score, importance)
SELECT c.id, s.id, target, imp FROM careers c, (VALUES
  ('Python', 85, 'critical'),
  ('SQL', 75, 'high'),
  ('Statistics', 80, 'critical'),
  ('Data Analysis', 80, 'critical'),
  ('Machine Learning', 75, 'critical'),
  ('Data Visualization', 70, 'high'),
  ('NumPy & Pandas', 75, 'high'),
  ('Git & Version Control', 60, 'medium'),
  ('Deep Learning', 65, 'medium')
) AS v(skill_name, target, imp)
JOIN skills s ON s.name = v.skill_name
WHERE c.name = 'Data Scientist'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Web Developer
INSERT INTO career_skills (career_id, skill_id, target_score, importance)
SELECT c.id, s.id, target, imp FROM careers c, (VALUES
  ('HTML & CSS', 85, 'critical'),
  ('JavaScript', 85, 'critical'),
  ('React.js', 75, 'high'),
  ('Node.js', 70, 'high'),
  ('REST APIs', 75, 'high'),
  ('Databases (Web)', 65, 'medium'),
  ('Git & Version Control', 70, 'high'),
  ('SQL', 60, 'medium')
) AS v(skill_name, target, imp)
JOIN skills s ON s.name = v.skill_name
WHERE c.name = 'Web Developer'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Cybersecurity Analyst
INSERT INTO career_skills (career_id, skill_id, target_score, importance)
SELECT c.id, s.id, target, imp FROM careers c, (VALUES
  ('Networking Fundamentals', 85, 'critical'),
  ('Linux Administration', 80, 'critical'),
  ('Security Fundamentals', 85, 'critical'),
  ('Authentication & Authorization', 75, 'high'),
  ('Cryptography', 70, 'high'),
  ('Vulnerability Assessment', 75, 'high'),
  ('Python', 60, 'medium')
) AS v(skill_name, target, imp)
JOIN skills s ON s.name = v.skill_name
WHERE c.name = 'Cybersecurity Analyst'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Cloud Engineer
INSERT INTO career_skills (career_id, skill_id, target_score, importance)
SELECT c.id, s.id, target, imp FROM careers c, (VALUES
  ('Cloud Basics', 85, 'critical'),
  ('Linux Administration', 75, 'high'),
  ('Networking Fundamentals', 75, 'high'),
  ('Containers & Docker', 80, 'critical'),
  ('Infrastructure as Code', 75, 'high'),
  ('CI/CD', 70, 'high'),
  ('AWS / GCP / Azure', 80, 'critical'),
  ('Python', 65, 'medium')
) AS v(skill_name, target, imp)
JOIN skills s ON s.name = v.skill_name
WHERE c.name = 'Cloud Engineer'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- ============================================================
-- SKILL PREREQUISITES
-- ============================================================
INSERT INTO skill_prerequisites (skill_id, prerequisite_skill_id)
SELECT s.id, p.id FROM skills s, skills p WHERE (s.name, p.name) IN (
  ('Machine Learning', 'Statistics'),
  ('Machine Learning', 'Python'),
  ('Machine Learning', 'NumPy & Pandas'),
  ('Deep Learning', 'Machine Learning'),
  ('Data Analysis', 'Python'),
  ('Data Analysis', 'NumPy & Pandas'),
  ('NumPy & Pandas', 'Python'),
  ('Data Visualization', 'Python'),
  ('Data Visualization', 'Data Analysis'),
  ('React.js', 'JavaScript'),
  ('React.js', 'HTML & CSS'),
  ('Node.js', 'JavaScript'),
  ('REST APIs', 'Node.js'),
  ('Containers & Docker', 'Linux Administration'),
  ('Infrastructure as Code', 'Cloud Basics'),
  ('CI/CD', 'Containers & Docker'),
  ('Authentication & Authorization', 'Security Fundamentals'),
  ('Cryptography', 'Security Fundamentals'),
  ('Vulnerability Assessment', 'Networking Fundamentals'),
  ('Vulnerability Assessment', 'Security Fundamentals')
)
ON CONFLICT DO NOTHING;

-- ============================================================
-- COURSES - DATA SCIENCE PATH
-- ============================================================
INSERT INTO courses (title, description, category, difficulty, duration_hours, instructor, career_id) VALUES
-- Data Science Foundation
('Python Fundamentals', 'Master Python programming from basics to intermediate concepts. Learn variables, data types, control flow, functions, OOP, and file handling. Essential foundation for any data science career.', 'Programming', 'beginner', 12.0, 'Dr. Priya Sharma', (SELECT id FROM careers WHERE name='Data Scientist')),
('Python for Data Analysis', 'Deep dive into NumPy and Pandas for data manipulation, cleaning, and analysis. Learn to work with real-world datasets effectively.', 'Data Science', 'intermediate', 15.0, 'Dr. Priya Sharma', (SELECT id FROM careers WHERE name='Data Scientist')),
('SQL for Data Analysis', 'Master SQL for data retrieval, aggregation, joins, subqueries, and window functions. Essential skill for every data professional.', 'Database', 'beginner', 10.0, 'Rahul Verma', (SELECT id FROM careers WHERE name='Data Scientist')),
('Statistics Fundamentals', 'Build a strong foundation in descriptive statistics, probability theory, distributions, hypothesis testing, and correlation. The mathematical backbone of ML.', 'Mathematics', 'beginner', 18.0, 'Dr. Anita Patel', (SELECT id FROM careers WHERE name='Data Scientist')),
('Advanced Statistics & Probability', 'Dive deeper into statistical inference, regression analysis, Bayesian statistics, and advanced probability models.', 'Mathematics', 'intermediate', 14.0, 'Dr. Anita Patel', (SELECT id FROM careers WHERE name='Data Scientist')),
('Data Visualization with Python', 'Create compelling data stories using Matplotlib, Seaborn, and Plotly. Learn chart selection, color theory, and dashboard design.', 'Data Science', 'intermediate', 10.0, 'Kavita Singh', (SELECT id FROM careers WHERE name='Data Scientist')),
('Machine Learning Fundamentals', 'Understand supervised and unsupervised learning, model training, evaluation metrics, and common algorithms including linear regression, decision trees, and clustering.', 'AI/ML', 'intermediate', 20.0, 'Dr. Rajesh Kumar', (SELECT id FROM careers WHERE name='Data Scientist')),
('Advanced Machine Learning', 'Explore ensemble methods, boosting, SVMs, advanced clustering, feature engineering, and model optimization techniques.', 'AI/ML', 'advanced', 22.0, 'Dr. Rajesh Kumar', (SELECT id FROM careers WHERE name='Data Scientist')),
('Data Science Capstone Project', 'Apply all skills in an end-to-end data science project: problem definition, data collection, EDA, modeling, evaluation, and presentation.', 'Data Science', 'advanced', 25.0, 'Dr. Priya Sharma', (SELECT id FROM careers WHERE name='Data Scientist')),

-- Web Developer Path
('HTML & CSS Fundamentals', 'Learn the building blocks of the web. Master semantic HTML5, CSS3, flexbox, grid, and responsive design principles.', 'Web', 'beginner', 10.0, 'Arjun Mehta', (SELECT id FROM careers WHERE name='Web Developer')),
('JavaScript Essentials', 'Master JavaScript fundamentals: variables, functions, DOM manipulation, events, async/await, and ES6+ features.', 'Programming', 'beginner', 16.0, 'Arjun Mehta', (SELECT id FROM careers WHERE name='Web Developer')),
('React.js Development', 'Build modern web applications with React. Learn components, hooks, state management, routing, and API integration.', 'Web Framework', 'intermediate', 20.0, 'Arjun Mehta', (SELECT id FROM careers WHERE name='Web Developer')),
('Node.js & Express Backend', 'Build scalable server-side applications with Node.js and Express. REST APIs, middleware, authentication, and database integration.', 'Backend', 'intermediate', 18.0, 'Sneha Rao', (SELECT id FROM careers WHERE name='Web Developer')),

-- Cybersecurity Path
('Networking Fundamentals for Security', 'Understand TCP/IP, OSI model, DNS, HTTP/S, firewalls, VPNs, and network architecture. Foundation for all cybersecurity work.', 'Networking', 'beginner', 14.0, 'Vikram Singh', (SELECT id FROM careers WHERE name='Cybersecurity Analyst')),
('Linux for Security Professionals', 'Master Linux command line, file permissions, process management, networking tools, and scripting for security operations.', 'Systems', 'beginner', 12.0, 'Vikram Singh', (SELECT id FROM careers WHERE name='Cybersecurity Analyst')),
('Information Security Fundamentals', 'Core security concepts: CIA triad, threat modeling, risk assessment, security policies, and compliance frameworks.', 'Security', 'beginner', 14.0, 'Pooja Nair', (SELECT id FROM careers WHERE name='Cybersecurity Analyst')),
('Cryptography & PKI', 'Symmetric and asymmetric encryption, hashing, digital signatures, PKI, TLS/SSL, and practical cryptographic tools.', 'Security', 'intermediate', 16.0, 'Pooja Nair', (SELECT id FROM careers WHERE name='Cybersecurity Analyst')),

-- Cloud Path
('Cloud Computing Fundamentals', 'Understand cloud service models (IaaS, PaaS, SaaS), deployment models, virtualization, and major cloud providers.', 'Cloud', 'beginner', 10.0, 'Arun Krishnan', (SELECT id FROM careers WHERE name='Cloud Engineer')),
('Docker & Containerization', 'Master Docker: containers, images, Dockerfile, Docker Compose, networking, volumes, and container best practices.', 'DevOps', 'intermediate', 14.0, 'Arun Krishnan', (SELECT id FROM careers WHERE name='Cloud Engineer')),
('AWS Cloud Practitioner', 'Core AWS services: EC2, S3, RDS, Lambda, IAM, VPC, CloudFormation, and cloud architecture fundamentals.', 'Cloud', 'intermediate', 20.0, 'Arun Krishnan', (SELECT id FROM careers WHERE name='Cloud Engineer'));

-- ============================================================
-- TOPICS (for each course)
-- ============================================================

-- Python Fundamentals Topics
INSERT INTO topics (course_id, title, description, difficulty, estimated_minutes, order_index, skill_id)
SELECT c.id, t.title, t.description, t.diff, t.mins, t.idx, s.id
FROM courses c, (VALUES
  ('Python Basics & Setup', 'Installation, IDLE, first program, print, comments, indentation', 'beginner', 45, 1, 'Python'),
  ('Variables & Data Types', 'Numbers, strings, booleans, lists, tuples, dictionaries, type conversion', 'beginner', 60, 2, 'Python'),
  ('Control Flow', 'If/elif/else, for loops, while loops, break, continue, range', 'beginner', 60, 3, 'Python'),
  ('Functions & Scope', 'def, parameters, return values, scope, lambda, *args, **kwargs', 'beginner', 75, 4, 'Python'),
  ('Object-Oriented Python', 'Classes, objects, methods, inheritance, encapsulation, polymorphism', 'intermediate', 90, 5, 'Python'),
  ('File Handling & Modules', 'Reading/writing files, os module, sys, importing, pip packages', 'intermediate', 60, 6, 'Python'),
  ('Error Handling', 'try/except/finally, custom exceptions, debugging techniques', 'intermediate', 45, 7, 'Python')
) AS t(title, description, diff, mins, idx, skill_name)
JOIN skills s ON s.name = t.skill_name
WHERE c.title = 'Python Fundamentals';

-- Statistics Fundamentals Topics
INSERT INTO topics (course_id, title, description, difficulty, estimated_minutes, order_index, skill_id)
SELECT c.id, t.title, t.description, t.diff, t.mins, t.idx, s.id
FROM courses c, (VALUES
  ('Introduction to Statistics', 'Types of data, variables, populations vs samples, research questions', 'beginner', 45, 1, 'Statistics'),
  ('Descriptive Statistics', 'Mean, median, mode, variance, standard deviation, quartiles, IQR', 'beginner', 75, 2, 'Statistics'),
  ('Data Distributions', 'Normal distribution, skewness, kurtosis, probability density functions', 'beginner', 90, 3, 'Statistics'),
  ('Probability Theory', 'Sample space, events, probability rules, conditional probability, Bayes theorem', 'intermediate', 90, 4, 'Statistics'),
  ('Sampling & Estimation', 'Sampling methods, central limit theorem, confidence intervals, point estimation', 'intermediate', 75, 5, 'Statistics'),
  ('Hypothesis Testing', 'Null/alternative hypothesis, p-values, t-tests, chi-square, type I/II errors', 'intermediate', 90, 6, 'Statistics'),
  ('Correlation & Regression', 'Pearson correlation, Spearman, simple linear regression, R-squared', 'intermediate', 90, 7, 'Statistics')
) AS t(title, description, diff, mins, idx, skill_name)
JOIN skills s ON s.name = t.skill_name
WHERE c.title = 'Statistics Fundamentals';

-- SQL Topics
INSERT INTO topics (course_id, title, description, difficulty, estimated_minutes, order_index, skill_id)
SELECT c.id, t.title, t.description, t.diff, t.mins, t.idx, s.id
FROM courses c, (VALUES
  ('Database Concepts', 'Relational databases, tables, rows, columns, primary/foreign keys', 'beginner', 45, 1, 'SQL'),
  ('SELECT & Filtering', 'SELECT, FROM, WHERE, comparison operators, LIKE, IN, BETWEEN', 'beginner', 60, 2, 'SQL'),
  ('Aggregation & Grouping', 'COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING', 'beginner', 60, 3, 'SQL'),
  ('JOINs', 'INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, self joins', 'intermediate', 75, 4, 'SQL'),
  ('Subqueries & CTEs', 'Subqueries, correlated subqueries, WITH clause, CTE chaining', 'intermediate', 75, 5, 'SQL'),
  ('Window Functions', 'PARTITION BY, ORDER BY, ROW_NUMBER, RANK, LAG, LEAD', 'advanced', 90, 6, 'SQL')
) AS t(title, description, diff, mins, idx, skill_name)
JOIN skills s ON s.name = t.skill_name
WHERE c.title = 'SQL for Data Analysis';

-- Machine Learning Topics
INSERT INTO topics (course_id, title, description, difficulty, estimated_minutes, order_index, skill_id)
SELECT c.id, t.title, t.description, t.diff, t.mins, t.idx, s.id
FROM courses c, (VALUES
  ('Introduction to ML', 'What is ML, types of learning, ML workflow, when to use ML', 'beginner', 60, 1, 'Machine Learning'),
  ('Linear Regression', 'Simple and multiple linear regression, gradient descent, cost function, regularization', 'intermediate', 90, 2, 'Machine Learning'),
  ('Classification Algorithms', 'Logistic regression, KNN, naive Bayes, decision trees', 'intermediate', 90, 3, 'Machine Learning'),
  ('Model Evaluation', 'Train/test split, cross-validation, accuracy, precision, recall, F1, ROC AUC', 'intermediate', 75, 4, 'Machine Learning'),
  ('Unsupervised Learning', 'K-Means clustering, hierarchical clustering, PCA, dimensionality reduction', 'intermediate', 90, 5, 'Machine Learning'),
  ('Feature Engineering', 'Feature selection, encoding categorical variables, scaling, handling missing values', 'intermediate', 75, 6, 'Machine Learning'),
  ('Ensemble Methods', 'Random Forest, Gradient Boosting, XGBoost, stacking', 'advanced', 90, 7, 'Machine Learning')
) AS t(title, description, diff, mins, idx, skill_name)
JOIN skills s ON s.name = t.skill_name
WHERE c.title = 'Machine Learning Fundamentals';

-- ============================================================
-- TOPIC PREREQUISITES
-- ============================================================

-- Stats: each topic depends on previous
WITH stat_topics AS (
  SELECT t.id, t.order_index FROM topics t
  JOIN courses c ON c.id = t.course_id
  WHERE c.title = 'Statistics Fundamentals'
)
INSERT INTO topic_prerequisites (topic_id, prerequisite_topic_id)
SELECT curr.id, prev.id
FROM stat_topics curr
JOIN stat_topics prev ON prev.order_index = curr.order_index - 1
ON CONFLICT DO NOTHING;

-- Python: sequential
WITH py_topics AS (
  SELECT t.id, t.order_index FROM topics t
  JOIN courses c ON c.id = t.course_id
  WHERE c.title = 'Python Fundamentals'
)
INSERT INTO topic_prerequisites (topic_id, prerequisite_topic_id)
SELECT curr.id, prev.id
FROM py_topics curr
JOIN py_topics prev ON prev.order_index = curr.order_index - 1
ON CONFLICT DO NOTHING;

-- ML: sequential
WITH ml_topics AS (
  SELECT t.id, t.order_index FROM topics t
  JOIN courses c ON c.id = t.course_id
  WHERE c.title = 'Machine Learning Fundamentals'
)
INSERT INTO topic_prerequisites (topic_id, prerequisite_topic_id)
SELECT curr.id, prev.id
FROM ml_topics curr
JOIN ml_topics prev ON prev.order_index = curr.order_index - 1
ON CONFLICT DO NOTHING;

-- ============================================================
-- LESSONS (for first few topics)
-- ============================================================

-- Lessons for "Python Basics & Setup"
INSERT INTO lessons (topic_id, title, content, lesson_type, duration_minutes, order_index, key_concepts)
SELECT t.id, l.title, l.content, l.ltype, l.mins, l.idx, l.concepts
FROM topics t
JOIN courses c ON c.id = t.course_id
CROSS JOIN (VALUES
  ('Welcome to Python', 'Python is a high-level, interpreted programming language known for its clear syntax and readability. It was created by Guido van Rossum and first released in 1991. Today, Python is one of the most popular programming languages in the world, used in web development, data science, artificial intelligence, automation, and more.

**Why Python for Data Science?**
Python has become the de facto language for data science because of its rich ecosystem of libraries like NumPy, Pandas, Matplotlib, Scikit-learn, and TensorFlow. Its simple syntax allows data scientists to focus on problem-solving rather than complex programming constructs.

**Installing Python**
1. Visit python.org and download the latest version (3.10+)
2. During installation, check "Add Python to PATH"
3. Verify installation: open terminal and type `python --version`

**Your First Python Program**
```python
print("Hello, World!")
print("Welcome to AI LearnPath")
```

**The Python Interactive Shell**
Type `python` in your terminal to open the interactive interpreter. You can type Python code directly and see results immediately.', 'text', 20, 1, ARRAY['Python installation', 'print function', 'interactive shell']),
  ('Variables & Basic Operations', 'In Python, variables are used to store data. Unlike many other languages, Python does not require you to declare the type of a variable.

**Creating Variables**
```python
name = "Mahesh"
age = 25
gpa = 8.5
is_student = True
```

**Naming Rules**
- Variable names can contain letters, numbers, and underscores
- Cannot start with a number
- Case sensitive (age != Age)
- Use snake_case by convention

**Basic Arithmetic**
```python
x = 10
y = 3
print(x + y)   # Addition: 13
print(x - y)   # Subtraction: 7
print(x * y)   # Multiplication: 30
print(x / y)   # Division: 3.333...
print(x // y)  # Floor division: 3
print(x % y)   # Modulus: 1
print(x ** y)  # Exponentiation: 1000
```

**String Operations**
```python
first = "Data"
last = "Science"
full = first + " " + last  # Concatenation
print(full.upper())         # DATA SCIENCE
print(len(full))            # 12
print(full[0:4])            # Data (slicing)
```', 'text', 25, 2, ARRAY['variables', 'data types', 'arithmetic operators', 'string operations'])
) AS l(title, content, ltype, mins, idx, concepts)
WHERE c.title = 'Python Fundamentals' AND t.title = 'Python Basics & Setup';

-- Lessons for "Descriptive Statistics"
INSERT INTO lessons (topic_id, title, content, lesson_type, duration_minutes, order_index, key_concepts)
SELECT t.id, l.title, l.content, l.ltype, l.mins, l.idx, l.concepts
FROM topics t
JOIN courses c ON c.id = t.course_id
CROSS JOIN (VALUES
  ('Measures of Central Tendency', 'Central tendency describes the center of a dataset. The three most common measures are mean, median, and mode.

**Mean (Average)**
The mean is the sum of all values divided by the number of values.

Formula: μ = (Σx) / n

Example: Dataset = [4, 7, 2, 9, 3]
Mean = (4 + 7 + 2 + 9 + 3) / 5 = 25 / 5 = **5.0**

```python
import numpy as np
data = [4, 7, 2, 9, 3]
mean = np.mean(data)  # 5.0
```

**Median**
The median is the middle value when data is sorted. If there are two middle values, the median is their average.

Example: [2, 3, 4, 7, 9] → Median = **4**
Example: [2, 3, 4, 7] → Median = (3+4)/2 = **3.5**

```python
median = np.median(data)  # 4.0
```

**Mode**
The mode is the most frequently occurring value.

Example: [1, 2, 2, 3, 4, 2, 5] → Mode = **2**

```python
from scipy import stats
mode = stats.mode(data)
```

**When to use each?**
- Mean: Symmetric distributions, no extreme outliers
- Median: Skewed distributions, outliers present
- Mode: Categorical data, finding most common value', 'text', 30, 1, ARRAY['mean', 'median', 'mode', 'central tendency']),
  ('Measures of Spread', 'Measures of spread describe how dispersed the data is around the center.

**Variance**
Variance measures the average squared deviation from the mean.

Formula: σ² = Σ(xi - μ)² / n

**Standard Deviation**
Standard deviation is the square root of variance. It''s in the same units as the original data.

Formula: σ = √(σ²)

Example:
Data = [2, 4, 4, 4, 5, 5, 7, 9]
Mean = 5.0
Deviations: [-3, -1, -1, -1, 0, 0, 2, 4]
Squared deviations: [9, 1, 1, 1, 0, 0, 4, 16]
Variance = 32/8 = 4.0
Standard Deviation = √4 = **2.0**

```python
import numpy as np
data = [2, 4, 4, 4, 5, 5, 7, 9]
variance = np.var(data)          # Population variance
std_dev = np.std(data)           # Population std dev
sample_std = np.std(data, ddof=1) # Sample std dev
```

**The 68-95-99.7 Rule (Empirical Rule)**
For normally distributed data:
- 68% of data falls within ±1 standard deviation
- 95% of data falls within ±2 standard deviations  
- 99.7% of data falls within ±3 standard deviations

**Interquartile Range (IQR)**
IQR = Q3 - Q1

Q1 = 25th percentile, Q3 = 75th percentile
IQR is resistant to outliers.', 'text', 35, 2, ARRAY['variance', 'standard deviation', 'IQR', 'spread', 'empirical rule'])
) AS l(title, content, ltype, mins, idx, concepts)
WHERE c.title = 'Statistics Fundamentals' AND t.title = 'Descriptive Statistics';

-- ============================================================
-- ASSESSMENTS
-- ============================================================

-- Diagnostic Assessments (career-specific)
INSERT INTO assessments (title, description, assessment_type, career_id, time_limit_minutes, passing_score)
SELECT 'Data Scientist Diagnostic Assessment', 'Comprehensive diagnostic assessment for aspiring Data Scientists covering Python, SQL, Statistics, Data Analysis, and Machine Learning.', 'diagnostic', c.id, 45, 50
FROM careers c WHERE c.name = 'Data Scientist';

INSERT INTO assessments (title, description, assessment_type, career_id, time_limit_minutes, passing_score)
SELECT 'Web Developer Diagnostic Assessment', 'Diagnostic assessment for Web Developers covering HTML, CSS, JavaScript, and backend concepts.', 'diagnostic', c.id, 40, 50
FROM careers c WHERE c.name = 'Web Developer';

INSERT INTO assessments (title, description, assessment_type, career_id, time_limit_minutes, passing_score)
SELECT 'Cybersecurity Analyst Diagnostic Assessment', 'Diagnostic assessment covering networking, Linux, security fundamentals, and cryptography.', 'diagnostic', c.id, 40, 50
FROM careers c WHERE c.name = 'Cybersecurity Analyst';

INSERT INTO assessments (title, description, assessment_type, career_id, time_limit_minutes, passing_score)
SELECT 'Cloud Engineer Diagnostic Assessment', 'Diagnostic assessment covering cloud basics, Linux, networking, containers, and IaC.', 'diagnostic', c.id, 40, 50
FROM careers c WHERE c.name = 'Cloud Engineer';

-- ============================================================
-- DIAGNOSTIC QUESTIONS - Data Scientist
-- ============================================================

-- Python questions
INSERT INTO questions (assessment_id, question_text, option_a, option_b, option_c, option_d, correct_option, skill_id, difficulty, explanation, order_index)
SELECT a.id, q.question, q.oa, q.ob, q.oc, q.od, q.correct, s.id, q.diff, q.expl, q.idx
FROM assessments a
CROSS JOIN (VALUES
  ('What is the output of print(type(3.14))?', '<class ''int''>', '<class ''float''>', '<class ''double''>', '<class ''number''>', 'B', 'easy', 'In Python, 3.14 is a floating-point number, so type() returns <class ''float''>.', 1, 'Python'),
  ('Which of the following is used to define a function in Python?', 'function', 'define', 'def', 'func', 'C', 'easy', 'In Python, the ''def'' keyword is used to define a function.', 2, 'Python'),
  ('What does the len() function return for a list [1, 2, 3, 4, 5]?', '4', '5', '6', 'Error', 'B', 'easy', 'len() returns the number of elements in the list. [1,2,3,4,5] has 5 elements.', 3, 'Python'),
  ('What is a list comprehension in Python?', 'A method to compress lists', 'A concise way to create lists using a single line', 'A function to sort lists', 'A class for list operations', 'B', 'medium', 'List comprehensions provide a concise way to create lists: [expr for item in iterable if condition].', 4, 'Python'),
  ('Which library is primarily used for data manipulation in Python?', 'NumPy', 'Matplotlib', 'Pandas', 'SciPy', 'C', 'medium', 'Pandas is the primary library for data manipulation and analysis in Python, providing DataFrames and Series.', 5, 'Python')
) AS q(question, oa, ob, oc, od, correct, diff, expl, idx, skill_name)
JOIN skills s ON s.name = q.skill_name
WHERE a.assessment_type = 'diagnostic' AND a.career_id = (SELECT id FROM careers WHERE name = 'Data Scientist');

-- Statistics questions
INSERT INTO questions (assessment_id, question_text, option_a, option_b, option_c, option_d, correct_option, skill_id, difficulty, explanation, order_index)
SELECT a.id, q.question, q.oa, q.ob, q.oc, q.od, q.correct, s.id, q.diff, q.expl, q.idx
FROM assessments a
CROSS JOIN (VALUES
  ('What does standard deviation measure?', 'The average of all values', 'The middle value of a dataset', 'How spread out values are from the mean', 'The most common value', 'C', 'easy', 'Standard deviation measures the dispersion or spread of data points around the mean.', 6, 'Statistics'),
  ('In a normal distribution, what percentage of data falls within one standard deviation of the mean?', '50%', '68%', '95%', '99.7%', 'B', 'medium', 'The empirical rule states 68% of data falls within ±1 standard deviation for a normal distribution.', 7, 'Statistics'),
  ('What is a p-value in hypothesis testing?', 'The probability of observing results at least as extreme as the data, assuming the null hypothesis is true', 'The probability that the null hypothesis is true', 'The significance level of the test', 'The sample size required', 'A', 'hard', 'The p-value is the probability of obtaining results at least as extreme as the observed results, assuming the null hypothesis is true.', 8, 'Statistics'),
  ('Which measure of central tendency is most resistant to outliers?', 'Mean', 'Mode', 'Median', 'Standard deviation', 'C', 'medium', 'The median is resistant to outliers because it only depends on the middle value(s), not the actual magnitude of extreme values.', 9, 'Statistics'),
  ('What does correlation measure?', 'Causation between two variables', 'The strength and direction of linear relationship between two variables', 'The average of two variables', 'The variance of combined variables', 'B', 'medium', 'Correlation measures the strength and direction of the linear relationship between two variables, ranging from -1 to +1.', 10, 'Statistics')
) AS q(question, oa, ob, oc, od, correct, diff, expl, idx, skill_name)
JOIN skills s ON s.name = q.skill_name
WHERE a.assessment_type = 'diagnostic' AND a.career_id = (SELECT id FROM careers WHERE name = 'Data Scientist');

-- SQL questions
INSERT INTO questions (assessment_id, question_text, option_a, option_b, option_c, option_d, correct_option, skill_id, difficulty, explanation, order_index)
SELECT a.id, q.question, q.oa, q.ob, q.oc, q.od, q.correct, s.id, q.diff, q.expl, q.idx
FROM assessments a
CROSS JOIN (VALUES
  ('Which SQL clause is used to filter rows based on a condition?', 'HAVING', 'GROUP BY', 'WHERE', 'ORDER BY', 'C', 'easy', 'The WHERE clause filters rows before grouping. HAVING filters after grouping.', 11, 'SQL'),
  ('What does SELECT COUNT(*) FROM users return?', 'The sum of all users'', 'The total number of rows in the users table', 'The first user record', 'An error', 'B', 'easy', 'COUNT(*) counts all rows in the table, including those with NULL values.', 12, 'SQL'),
  ('What type of JOIN returns only matching rows from both tables?', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN', 'INNER JOIN', 'D', 'medium', 'INNER JOIN returns only rows where the join condition is met in both tables.', 13, 'SQL'),
  ('Which SQL function returns the average of a column?', 'SUM()', 'MEAN()', 'AVG()', 'AVERAGE()', 'C', 'easy', 'The AVG() function returns the average value of a numeric column.', 14, 'SQL'),
  ('What is a subquery?', 'A query with multiple JOINs', 'A query nested inside another query', 'A stored procedure', 'A view', 'B', 'medium', 'A subquery is a SQL query nested inside another SQL query, used in WHERE, FROM, or SELECT clauses.', 15, 'SQL')
) AS q(question, oa, ob, oc, od, correct, diff, expl, idx, skill_name)
JOIN skills s ON s.name = q.skill_name
WHERE a.assessment_type = 'diagnostic' AND a.career_id = (SELECT id FROM careers WHERE name = 'Data Scientist');

-- Machine Learning questions
INSERT INTO questions (assessment_id, question_text, option_a, option_b, option_c, option_d, correct_option, skill_id, difficulty, explanation, order_index)
SELECT a.id, q.question, q.oa, q.ob, q.oc, q.od, q.correct, s.id, q.diff, q.expl, q.idx
FROM assessments a
CROSS JOIN (VALUES
  ('What is supervised learning?', 'Learning without any data', 'Learning from labeled training data to make predictions', 'Clustering similar data points', 'Learning through trial and error', 'B', 'easy', 'Supervised learning uses labeled training data where the model learns to map inputs to known outputs.', 16, 'Machine Learning'),
  ('What is overfitting in machine learning?', 'When a model performs well on training data but poorly on new data', 'When a model is too simple to capture patterns', 'When training takes too long', 'When accuracy is above 99%', 'A', 'medium', 'Overfitting occurs when a model memorizes training data too closely, failing to generalize to new, unseen data.', 17, 'Machine Learning'),
  ('What is the purpose of train-test split?', 'To speed up training', 'To evaluate model performance on unseen data', 'To reduce the dataset size', 'To improve accuracy on training data', 'B', 'medium', 'Train-test split reserves a portion of data for evaluation so we can estimate how well the model will perform on new, unseen data.', 18, 'Machine Learning'),
  ('Which algorithm is NOT a classification algorithm?', 'Logistic Regression', 'Decision Tree', 'K-Means', 'Random Forest', 'C', 'medium', 'K-Means is a clustering algorithm (unsupervised), not a classification algorithm (supervised).', 19, 'Machine Learning'),
  ('What does cross-validation help with?', 'Speeding up predictions', 'Getting a more reliable estimate of model performance', 'Increasing training data size', 'Reducing model complexity automatically', 'B', 'hard', 'Cross-validation provides a more robust estimate of model performance by training and evaluating on multiple data subsets.', 20, 'Machine Learning')
) AS q(question, oa, ob, oc, od, correct, diff, expl, idx, skill_name)
JOIN skills s ON s.name = q.skill_name
WHERE a.assessment_type = 'diagnostic' AND a.career_id = (SELECT id FROM careers WHERE name = 'Data Scientist');

-- ============================================================
-- WEB DEVELOPER DIAGNOSTIC QUESTIONS
-- ============================================================
INSERT INTO questions (assessment_id, question_text, option_a, option_b, option_c, option_d, correct_option, skill_id, difficulty, explanation, order_index)
SELECT a.id, q.question, q.oa, q.ob, q.oc, q.od, q.correct, s.id, q.diff, q.expl, q.idx
FROM assessments a
CROSS JOIN (VALUES
  ('What does HTML stand for?', 'Hyperlink and Text Markup Language', 'HyperText Markup Language', 'High-level Text Machine Language', 'HyperText Management Language', 'B', 'easy', 'HTML stands for HyperText Markup Language, the standard language for creating web pages.', 1, 'HTML & CSS'),
  ('Which CSS property is used to change background color?', 'color', 'background', 'background-color', 'bgcolor', 'C', 'easy', 'background-color is the correct CSS property for setting background colors of elements.', 2, 'HTML & CSS'),
  ('What is the correct way to declare a variable in modern JavaScript?', 'var x = 5', 'let x = 5', 'variable x = 5', 'declare x = 5', 'B', 'easy', 'let is the preferred way to declare variables in modern JavaScript (ES6+), as it has block scope.', 3, 'JavaScript'),
  ('What does DOM stand for?', 'Document Object Module', 'Data Object Model', 'Document Object Model', 'Dynamic Object Method', 'C', 'easy', 'DOM stands for Document Object Model, a programming interface for HTML documents.', 4, 'JavaScript'),
  ('What is the purpose of async/await in JavaScript?', 'To run code synchronously', 'To handle asynchronous operations more cleanly', 'To create multiple threads', 'To improve performance automatically', 'B', 'medium', 'async/await is syntactic sugar over Promises, making asynchronous code easier to read and write.', 5, 'JavaScript'),
  ('What is React?', 'A backend framework', 'A JavaScript library for building user interfaces', 'A database management system', 'A CSS framework', 'B', 'easy', 'React is a JavaScript library developed by Facebook for building reusable UI components.', 6, 'React.js'),
  ('What is a REST API?', 'A database query language', 'An architectural style for networked applications using HTTP', 'A JavaScript framework', 'A type of database', 'B', 'medium', 'REST (Representational State Transfer) is an architectural style using HTTP methods for building scalable web services.', 7, 'REST APIs'),
  ('What HTTP status code indicates success?', '404', '500', '200', '301', 'C', 'easy', 'HTTP 200 (OK) indicates a successful request.', 8, 'REST APIs'),
  ('What is flexbox used for in CSS?', 'Creating animations', 'Managing font sizes', 'One-dimensional layout of items in a row or column', 'Handling user events', 'C', 'medium', 'CSS Flexbox is a one-dimensional layout method for arranging items in rows or columns with flexible sizes.', 9, 'HTML & CSS'),
  ('What is the purpose of a primary key in a database?', 'To encrypt data', 'To uniquely identify each record in a table', 'To connect to other applications', 'To sort records', 'B', 'easy', 'A primary key uniquely identifies each record in a database table.', 10, 'Databases (Web)')
) AS q(question, oa, ob, oc, od, correct, diff, expl, idx, skill_name)
JOIN skills s ON s.name = q.skill_name
WHERE a.assessment_type = 'diagnostic' AND a.career_id = (SELECT id FROM careers WHERE name = 'Web Developer');

-- ============================================================
-- CYBERSECURITY DIAGNOSTIC QUESTIONS
-- ============================================================
INSERT INTO questions (assessment_id, question_text, option_a, option_b, option_c, option_d, correct_option, skill_id, difficulty, explanation, order_index)
SELECT a.id, q.question, q.oa, q.ob, q.oc, q.od, q.correct, s.id, q.diff, q.expl, q.idx
FROM assessments a
CROSS JOIN (VALUES
  ('What does CIA stand for in information security?', 'Central Intelligence Agency', 'Confidentiality, Integrity, Availability', 'Computer Integrity Assessment', 'Cyber Infrastructure Analysis', 'B', 'easy', 'CIA Triad: Confidentiality (only authorized access), Integrity (data accuracy), Availability (system accessible when needed).', 1, 'Security Fundamentals'),
  ('What OSI layer does IP operate at?', 'Layer 2 - Data Link', 'Layer 3 - Network', 'Layer 4 - Transport', 'Layer 7 - Application', 'B', 'medium', 'IP (Internet Protocol) operates at Layer 3 (Network layer) of the OSI model, responsible for logical addressing and routing.', 2, 'Networking Fundamentals'),
  ('What is symmetric encryption?', 'Using two different keys for encryption and decryption', 'Using the same key for both encryption and decryption', 'Encrypting data twice', 'Hashing data for storage', 'B', 'medium', 'Symmetric encryption uses the same key for both encryption and decryption (e.g., AES, DES).', 3, 'Cryptography'),
  ('What does SQL injection exploit?', 'Weak passwords', 'Improperly sanitized SQL queries in web applications', 'Unpatched operating systems', 'Weak encryption', 'B', 'medium', 'SQL injection inserts malicious SQL code into input fields to manipulate database queries.', 4, 'Security Fundamentals'),
  ('What Linux command shows currently running processes?', 'ls -la', 'ps aux', 'netstat', 'whoami', 'B', 'easy', 'ps aux shows all running processes on a Linux system.', 5, 'Linux Administration'),
  ('What is a firewall?', 'A physical barrier in server rooms', 'Software or hardware that monitors and controls network traffic', 'An encryption algorithm', 'A backup system', 'B', 'easy', 'A firewall monitors and controls incoming and outgoing network traffic based on security rules.', 6, 'Networking Fundamentals'),
  ('What is a hash function''s primary property?', 'It is reversible', 'Same input always produces same output, but output cannot reveal input', 'It can encrypt and decrypt', 'It requires a key', 'B', 'medium', 'Cryptographic hash functions are one-way: same input always produces the same hash, but you cannot reverse a hash to get the input.', 7, 'Cryptography'),
  ('What does HTTPS provide over HTTP?', 'Faster loading', 'Encrypted communication between browser and server', 'Better caching', 'Smaller file sizes', 'B', 'easy', 'HTTPS uses TLS/SSL to encrypt communication between browser and web server, protecting data in transit.', 8, 'Security Fundamentals'),
  ('What is the purpose of a VPN?', 'To speed up internet', 'To create an encrypted tunnel for secure remote access', 'To block malware', 'To compress data', 'B', 'medium', 'A VPN creates an encrypted tunnel between a device and a network, enabling secure remote access and privacy.', 9, 'Networking Fundamentals'),
  ('What command shows network connections in Linux?', 'pwd', 'ifconfig only', 'netstat or ss', 'mkdir', 'C', 'medium', 'netstat (or its modern replacement ss) shows network connections, routing tables, and interface statistics.', 10, 'Linux Administration')
) AS q(question, oa, ob, oc, od, correct, diff, expl, idx, skill_name)
JOIN skills s ON s.name = q.skill_name
WHERE a.assessment_type = 'diagnostic' AND a.career_id = (SELECT id FROM careers WHERE name = 'Cybersecurity Analyst');

-- ============================================================
-- CLOUD ENGINEER DIAGNOSTIC QUESTIONS
-- ============================================================
INSERT INTO questions (assessment_id, question_text, option_a, option_b, option_c, option_d, correct_option, skill_id, difficulty, explanation, order_index)
SELECT a.id, q.question, q.oa, q.ob, q.oc, q.od, q.correct, s.id, q.diff, q.expl, q.idx
FROM assessments a
CROSS JOIN (VALUES
  ('What does IaaS stand for?', 'Internet as a Service', 'Infrastructure as a Service', 'Integration as a Service', 'Intelligence as a Service', 'B', 'easy', 'IaaS (Infrastructure as a Service) provides virtualized computing resources over the internet.', 1, 'Cloud Basics'),
  ('What is a Docker container?', 'A virtual machine', 'A lightweight, standalone executable package of software', 'A cloud storage bucket', 'A network protocol', 'B', 'medium', 'A Docker container is a lightweight, standalone package that includes the application and all its dependencies.', 2, 'Containers & Docker'),
  ('What is Kubernetes primarily used for?', 'Database management', 'Container orchestration and management', 'Cloud storage', 'Code compilation', 'B', 'medium', 'Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.', 3, 'Containers & Docker'),
  ('What does "auto-scaling" mean in cloud computing?', 'Automatically backing up data', 'Automatically adjusting resources based on demand', 'Automatically deploying code', 'Automatically monitoring logs', 'B', 'easy', 'Auto-scaling automatically adjusts the number of compute resources based on current demand.', 4, 'Cloud Basics'),
  ('What is Terraform?', 'A cloud provider', 'An infrastructure as code tool', 'A monitoring service', 'A container runtime', 'B', 'medium', 'Terraform is an open-source Infrastructure as Code tool that lets you define and provision infrastructure declaratively.', 5, 'Infrastructure as Code'),
  ('What is a subnet?', 'A type of cable', 'A logical subdivision of an IP network', 'A backup server', 'A Docker network', 'B', 'medium', 'A subnet is a logical subdivision of an IP network, allowing better organization and security of network traffic.', 6, 'Networking Fundamentals'),
  ('What does S3 stand for in AWS?', 'Simple Storage Solution', 'Simple Storage Service', 'Secure Server System', 'Scalable Storage Solution', 'B', 'easy', 'S3 stands for Simple Storage Service, Amazon''s object storage service.', 7, 'AWS / GCP / Azure'),
  ('What is CI/CD?', 'Cloud Infrastructure / Cloud Deployment', 'Continuous Integration / Continuous Deployment', 'Code Inspection / Code Delivery', 'Container Integration / Container Deployment', 'B', 'medium', 'CI/CD is a development practice of frequently integrating code changes (CI) and automatically deploying them (CD).', 8, 'CI/CD'),
  ('What Linux command changes file permissions?', 'chown', 'chmod', 'chgrp', 'ls -l', 'B', 'easy', 'chmod (change mode) modifies file access permissions in Linux.', 9, 'Linux Administration'),
  ('What is a load balancer?', 'A weight measurement tool', 'A device that distributes network traffic across multiple servers', 'A database backup service', 'A code testing tool', 'B', 'easy', 'A load balancer distributes incoming network requests across multiple servers to ensure no single server is overwhelmed.', 10, 'Cloud Basics')
) AS q(question, oa, ob, oc, od, correct, diff, expl, idx, skill_name)
JOIN skills s ON s.name = q.skill_name
WHERE a.assessment_type = 'diagnostic' AND a.career_id = (SELECT id FROM careers WHERE name = 'Cloud Engineer');

-- ============================================================
-- TOPIC ASSESSMENTS
-- ============================================================
INSERT INTO assessments (title, description, assessment_type, topic_id, time_limit_minutes, passing_score)
SELECT 'Python Basics Quiz', 'Test your understanding of Python fundamentals.', 'topic', t.id, 20, 60
FROM topics t JOIN courses c ON c.id = t.course_id WHERE c.title = 'Python Fundamentals' AND t.title = 'Python Basics & Setup';

INSERT INTO assessments (title, description, assessment_type, topic_id, time_limit_minutes, passing_score)
SELECT 'Descriptive Statistics Quiz', 'Test your knowledge of descriptive statistics.', 'topic', t.id, 25, 60
FROM topics t JOIN courses c ON c.id = t.course_id WHERE c.title = 'Statistics Fundamentals' AND t.title = 'Descriptive Statistics';

-- ============================================================
-- RESOURCES
-- ============================================================
INSERT INTO resources (title, resource_type, url, topic_id, skill_id, difficulty, duration_minutes, description) VALUES
('Official Python Documentation', 'documentation', 'https://docs.python.org/3/', NULL, (SELECT id FROM skills WHERE name='Python'), 'beginner', NULL, 'The complete official Python 3 documentation covering all language features and standard library.'),
('W3Schools Python Tutorial', 'article', 'https://www.w3schools.com/python/', NULL, (SELECT id FROM skills WHERE name='Python'), 'beginner', 120, 'Interactive Python tutorial for beginners with examples and exercises.'),
('Kaggle Python Course', 'course', 'https://www.kaggle.com/learn/python', NULL, (SELECT id FROM skills WHERE name='Python'), 'beginner', 300, 'Free, hands-on Python course from Kaggle, specifically for data science.'),
('Khan Academy Statistics', 'course', 'https://www.khanacademy.org/math/statistics-probability', NULL, (SELECT id FROM skills WHERE name='Statistics'), 'beginner', 600, 'Comprehensive free statistics course from Khan Academy.'),
('StatQuest Statistics Videos', 'video', 'https://www.youtube.com/c/joshstarmer', NULL, (SELECT id FROM skills WHERE name='Statistics'), 'beginner', 200, 'Excellent video explanations of statistics and machine learning concepts.'),
('Mode SQL Tutorial', 'article', 'https://mode.com/sql-tutorial/', NULL, (SELECT id FROM skills WHERE name='SQL'), 'beginner', 240, 'Hands-on SQL tutorial with practice exercises in a browser SQL editor.'),
('SQLZoo Practice', 'practice', 'https://sqlzoo.net/', NULL, (SELECT id FROM skills WHERE name='SQL'), 'beginner', 180, 'Interactive SQL practice exercises with immediate feedback.'),
('Scikit-learn Documentation', 'documentation', 'https://scikit-learn.org/stable/', NULL, (SELECT id FROM skills WHERE name='Machine Learning'), 'intermediate', NULL, 'Official scikit-learn documentation with API reference and user guide.'),
('CS229 Machine Learning Notes', 'article', 'https://cs229.stanford.edu/notes/', NULL, (SELECT id FROM skills WHERE name='Machine Learning'), 'advanced', NULL, 'Stanford CS229 Machine Learning course notes.'),
('MDN Web Docs - HTML', 'documentation', 'https://developer.mozilla.org/en-US/docs/Web/HTML', NULL, (SELECT id FROM skills WHERE name='HTML & CSS'), 'beginner', NULL, 'Comprehensive HTML reference from Mozilla Developer Network.'),
('The Odin Project - Web Dev', 'course', 'https://www.theodinproject.com/', NULL, (SELECT id FROM skills WHERE name='HTML & CSS'), 'beginner', NULL, 'Free, full-stack web development curriculum.'),
('OWASP Top 10', 'article', 'https://owasp.org/www-project-top-ten/', NULL, (SELECT id FROM skills WHERE name='Security Fundamentals'), 'intermediate', 120, 'OWASP Top 10 web application security risks guide.');

-- ============================================================
-- ADMIN USER (for testing)
-- ============================================================
-- Password: AdminPass123! (bcrypt hash - update with actual hash)
INSERT INTO users (name, email, password_hash, is_admin, onboarding_completed, diagnostic_completed, skill_level)
VALUES ('Admin User', 'admin@ailearnpath.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TrwlC2kpqZ.gFjjSWqZ3HmB5DFKW', TRUE, TRUE, TRUE, 'advanced')
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- COURSE-SKILL MAPPINGS
-- ============================================================
INSERT INTO course_skills (course_id, skill_id, relevance_score)
SELECT c.id, s.id, 0.95 FROM courses c, skills s
WHERE c.title = 'Python Fundamentals' AND s.name = 'Python'
ON CONFLICT DO NOTHING;

INSERT INTO course_skills (course_id, skill_id, relevance_score)
SELECT c.id, s.id, 0.90 FROM courses c, skills s
WHERE c.title = 'Python for Data Analysis' AND s.name = 'NumPy & Pandas'
ON CONFLICT DO NOTHING;

INSERT INTO course_skills (course_id, skill_id, relevance_score)
SELECT c.id, s.id, 0.85 FROM courses c, skills s
WHERE c.title = 'Python for Data Analysis' AND s.name = 'Python'
ON CONFLICT DO NOTHING;

INSERT INTO course_skills (course_id, skill_id, relevance_score)
SELECT c.id, s.id, 0.95 FROM courses c, skills s
WHERE c.title = 'SQL for Data Analysis' AND s.name = 'SQL'
ON CONFLICT DO NOTHING;

INSERT INTO course_skills (course_id, skill_id, relevance_score)
SELECT c.id, s.id, 0.95 FROM courses c, skills s
WHERE c.title = 'Statistics Fundamentals' AND s.name = 'Statistics'
ON CONFLICT DO NOTHING;

INSERT INTO course_skills (course_id, skill_id, relevance_score)
SELECT c.id, s.id, 0.90 FROM courses c, skills s
WHERE c.title = 'Machine Learning Fundamentals' AND s.name = 'Machine Learning'
ON CONFLICT DO NOTHING;

INSERT INTO course_skills (course_id, skill_id, relevance_score)
SELECT c.id, s.id, 0.85 FROM courses c, skills s
WHERE c.title = 'Machine Learning Fundamentals' AND s.name = 'Statistics'
ON CONFLICT DO NOTHING;

INSERT INTO course_skills (course_id, skill_id, relevance_score)
SELECT c.id, s.id, 0.95 FROM courses c, skills s
WHERE c.title = 'HTML & CSS Fundamentals' AND s.name = 'HTML & CSS'
ON CONFLICT DO NOTHING;

INSERT INTO course_skills (course_id, skill_id, relevance_score)
SELECT c.id, s.id, 0.95 FROM courses c, skills s
WHERE c.title = 'JavaScript Essentials' AND s.name = 'JavaScript'
ON CONFLICT DO NOTHING;

INSERT INTO course_skills (course_id, skill_id, relevance_score)
SELECT c.id, s.id, 0.90 FROM courses c, skills s
WHERE c.title = 'React.js Development' AND s.name = 'React.js'
ON CONFLICT DO NOTHING;

INSERT INTO course_skills (course_id, skill_id, relevance_score)
SELECT c.id, s.id, 0.95 FROM courses c, skills s
WHERE c.title = 'Networking Fundamentals for Security' AND s.name = 'Networking Fundamentals'
ON CONFLICT DO NOTHING;

INSERT INTO course_skills (course_id, skill_id, relevance_score)
SELECT c.id, s.id, 0.95 FROM courses c, skills s
WHERE c.title = 'Information Security Fundamentals' AND s.name = 'Security Fundamentals'
ON CONFLICT DO NOTHING;

INSERT INTO course_skills (course_id, skill_id, relevance_score)
SELECT c.id, s.id, 0.95 FROM courses c, skills s
WHERE c.title = 'Cloud Computing Fundamentals' AND s.name = 'Cloud Basics'
ON CONFLICT DO NOTHING;

INSERT INTO course_skills (course_id, skill_id, relevance_score)
SELECT c.id, s.id, 0.95 FROM courses c, skills s
WHERE c.title = 'Docker & Containerization' AND s.name = 'Containers & Docker'
ON CONFLICT DO NOTHING;

COMMIT;
