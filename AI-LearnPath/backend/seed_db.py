"""
Seed script â€” populates careers, skills, courses, and diagnostic assessments.
Run from: backend/ folder with venv active
  python seed_db.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from models import db
from models.career import Career
from models.skill import Skill, CareerSkill
from models.course import Course, CourseSkill
from models.assessment import Assessment, Question
from models.user import User
import bcrypt

app = create_app()

CAREERS = [
    {"name": "Data Scientist",         "description": "Analyse data, build ML models, extract business insights."},
    {"name": "Web Developer",          "description": "Build modern web apps with frontend and backend technologies."},
    {"name": "Cybersecurity Analyst",  "description": "Protect systems from threats and ensure data security."},
    {"name": "Cloud Engineer",         "description": "Design and maintain scalable cloud infrastructure."},
    {"name": "Machine Learning Engineer", "description": "Develop and deploy production ML/AI systems."},
    {"name": "Full Stack Developer",   "description": "Build end-to-end web applications across all layers."},
]

# Skills per career  (career_name -> list of skill names)
CAREER_SKILLS = {
    "Data Scientist": [
        "Python Programming", "Statistics & Probability", "Machine Learning",
        "Data Wrangling", "Data Visualisation", "SQL & Databases",
        "Deep Learning", "Feature Engineering",
    ],
    "Web Developer": [
        "HTML & CSS", "JavaScript", "React.js", "Node.js",
        "REST APIs", "Git & Version Control", "SQL & Databases", "TypeScript",
    ],
    "Cybersecurity Analyst": [
        "Network Security", "Linux Administration", "Ethical Hacking",
        "Cryptography", "Incident Response", "Python Programming",
        "Firewalls & IDS", "Vulnerability Assessment",
    ],
    "Cloud Engineer": [
        "AWS / Azure / GCP", "Docker & Kubernetes", "Infrastructure as Code",
        "Linux Administration", "Networking Fundamentals", "CI/CD Pipelines",
        "Python Programming", "Database Management",
    ],
    "Machine Learning Engineer": [
        "Python Programming", "Machine Learning", "Deep Learning",
        "MLOps & Model Deployment", "Feature Engineering", "Statistics & Probability",
        "Docker & Kubernetes", "SQL & Databases",
    ],
    "Full Stack Developer": [
        "HTML & CSS", "JavaScript", "React.js", "Node.js",
        "REST APIs", "SQL & Databases", "Docker & Kubernetes", "Git & Version Control",
    ],
}

# 20 diagnostic questions per career (10 foundational + 10 intermediate/advanced)
DIAGNOSTIC_QUESTIONS = {
    "Data Scientist": [
        {"text": "What does 'overfitting' mean in Machine Learning?",
         "options": {"A": "Model performs well on training data but poorly on new data", "B": "Model ignores training data", "C": "Model is too simple", "D": "Model trains too slowly"},
         "correct": "A"},
        {"text": "Which Python library is primarily used for data manipulation?",
         "options": {"A": "NumPy", "B": "Pandas", "C": "Matplotlib", "D": "Scikit-learn"},
         "correct": "B"},
        {"text": "What is the purpose of a confusion matrix?",
         "options": {"A": "Visualise feature importance", "B": "Evaluate classification model performance", "C": "Normalise data", "D": "Split datasets"},
         "correct": "B"},
        {"text": "Which measure is most resistant to outliers?",
         "options": {"A": "Mean", "B": "Standard deviation", "C": "Median", "D": "Variance"},
         "correct": "C"},
        {"text": "What does SQL stand for?",
         "options": {"A": "Structured Query Language", "B": "Simple Query Logic", "C": "Sequential Query Layer", "D": "Standard Query Library"},
         "correct": "A"},
        {"text": "In a normal distribution, what percentage of data falls within 1 standard deviation?",
         "options": {"A": "50%", "B": "68%", "C": "95%", "D": "99.7%"},
         "correct": "B"},
        {"text": "Which algorithm is used for dimensionality reduction?",
         "options": {"A": "Linear Regression", "B": "K-Means", "C": "PCA", "D": "Naive Bayes"},
         "correct": "C"},
        {"text": "What is the output of a sigmoid activation function?",
         "options": {"A": "Any real number", "B": "Value between 0 and 1", "C": "Value between -1 and 1", "D": "Binary 0 or 1"},
         "correct": "B"},
        {"text": "Which Python function reads a CSV file into a DataFrame?",
         "options": {"A": "pd.read_csv()", "B": "pd.load_csv()", "C": "np.read_csv()", "D": "df.import_csv()"},
         "correct": "A"},
        {"text": "What does the R-squared metric measure?",
         "options": {"A": "Model training speed", "B": "Proportion of variance explained by the model", "C": "Number of features used", "D": "Loss function value"},
         "correct": "B"},
        {"text": "Which pandas method is used to remove missing values (NaN) from a DataFrame?",
         "options": {"A": "df.drop_null()", "B": "df.dropna()", "C": "df.clean()", "D": "df.remove_nan()"},
         "correct": "B"},
        {"text": "In hypothesis testing, what is a Type I error?",
         "options": {"A": "Rejecting a true null hypothesis (false positive)", "B": "Failing to reject a false null hypothesis (false negative)", "C": "Calculating an incorrect p-value", "D": "Using an insufficient sample size"},
         "correct": "A"},
        {"text": "What is the primary purpose of K-Fold Cross-Validation?",
         "options": {"A": "Speed up model training", "B": "Provide a reliable estimate of out-of-sample model generalization and prevent overfitting", "C": "Automatically tune neural network weights", "D": "Reduce feature dimensions"},
         "correct": "B"},
        {"text": "Which metric is most suitable for evaluating a regression model's average absolute error magnitude?",
         "options": {"A": "Accuracy", "B": "Mean Absolute Error (MAE)", "C": "ROC-AUC", "D": "Precision"},
         "correct": "B"},
        {"text": "What is the key effect of applying L1 regularization (Lasso) compared to L2 (Ridge)?",
         "options": {"A": "Sets some feature coefficients exactly to zero, performing sparse feature selection", "B": "Doubles all feature coefficients", "C": "Prevents gradient descent from converging", "D": "Always increases training variance"},
         "correct": "A"},
        {"text": "Which plot is best suited for identifying outliers and quartile distributions in numerical data?",
         "options": {"A": "Pie chart", "B": "Box plot", "C": "Treemap", "D": "Radar chart"},
         "correct": "B"},
        {"text": "In Natural Language Processing (NLP), what does TF-IDF measure?",
         "options": {"A": "Importance of a word in a document relative to a corpus of documents", "B": "Total frequency of invalid characters", "C": "Time taken to index full text files", "D": "Cosine distance between embeddings"},
         "correct": "A"},
        {"text": "What does the Central Limit Theorem state?",
         "options": {"A": "The distribution of sample means approaches a normal distribution as sample size increases, regardless of population distribution", "B": "All datasets follow a normal distribution", "C": "Variance decreases to zero with large datasets", "D": "Medians and means are always equal in large samples"},
         "correct": "A"},
        {"text": "Which SQL clause is used to filter aggregated results after a GROUP BY statement?",
         "options": {"A": "WHERE", "B": "HAVING", "C": "FILTER", "D": "LIMIT"},
         "correct": "B"},
        {"text": "In unsupervised clustering, what does the Silhouette Score measure?",
         "options": {"A": "How similar a data point is to its own cluster compared to neighboring clusters", "B": "Classification accuracy", "C": "Training time per epoch", "D": "Number of centroids"},
         "correct": "A"},
    ],
    "Web Developer": [
        {"text": "What does CSS stand for?",
         "options": {"A": "Cascading Style Sheets", "B": "Computer Style System", "C": "Creative Style Syntax", "D": "Coded Style Structure"},
         "correct": "A"},
        {"text": "Which HTML tag creates a hyperlink?",
         "options": {"A": "<link>", "B": "<a>", "C": "<href>", "D": "<url>"},
         "correct": "B"},
        {"text": "What is the purpose of 'useState' in React?",
         "options": {"A": "Fetch API data", "B": "Manage component state", "C": "Apply CSS styles", "D": "Create routes"},
         "correct": "B"},
        {"text": "Which HTTP method is used to send form data to a server?",
         "options": {"A": "GET", "B": "DELETE", "C": "POST", "D": "PUT"},
         "correct": "C"},
        {"text": "What does DOM stand for?",
         "options": {"A": "Document Object Model", "B": "Data Output Module", "C": "Design Object Method", "D": "Dynamic Object Map"},
         "correct": "A"},
        {"text": "Which command initialises a new Git repository?",
         "options": {"A": "git start", "B": "git create", "C": "git init", "D": "git new"},
         "correct": "C"},
        {"text": "What is Node.js primarily used for?",
         "options": {"A": "Styling web pages", "B": "Server-side JavaScript execution", "C": "Database management", "D": "Mobile app development"},
         "correct": "B"},
        {"text": "In JavaScript, which keyword declares a block-scoped variable?",
         "options": {"A": "var", "B": "let", "C": "def", "D": "dim"},
         "correct": "B"},
        {"text": "What does REST stand for in web APIs?",
         "options": {"A": "Rapid Execution State Transfer", "B": "Representational State Transfer", "C": "Remote Service Technology", "D": "Responsive Server Template"},
         "correct": "B"},
        {"text": "Which CSS property controls text size?",
         "options": {"A": "text-size", "B": "font-weight", "C": "font-size", "D": "text-style"},
         "correct": "C"},
        {"text": "What is the effect of the CSS declaration 'box-sizing: border-box;'?",
         "options": {"A": "Adds a default 3D border around elements", "B": "Includes padding and border within the element's total specified width and height", "C": "Stretches elements to full screen width", "D": "Hides element overflow"},
         "correct": "B"},
        {"text": "In modern JavaScript (ES6+), what does the spread syntax (...) allow you to do?",
         "options": {"A": "Multiply numerical arrays", "B": "Expand an iterable (like an array or object) into individual elements or properties", "C": "Evaluate regular expressions", "D": "Create private class variables"},
         "correct": "B"},
        {"text": "What is the Virtual DOM in React?",
         "options": {"A": "A browser extension for debugging", "B": "An in-memory lightweight representation of the real DOM used to compute efficient UI updates", "C": "A cloud server that renders HTML", "D": "A database for caching API responses"},
         "correct": "B"},
        {"text": "Which HTTP status code signifies that authentication credentials are missing or invalid?",
         "options": {"A": "400 Bad Request", "B": "401 Unauthorized", "C": "403 Forbidden", "D": "404 Not Found"},
         "correct": "B"},
        {"text": "In CSS Flexbox, which property aligns flex items along the cross axis?",
         "options": {"A": "justify-content", "B": "align-items", "C": "flex-direction", "D": "flex-wrap"},
         "correct": "B"},
        {"text": "What is the primary benefit of using TypeScript instead of pure JavaScript?",
         "options": {"A": "Executes directly without compilation", "B": "Provides static type checking and compile-time error detection", "C": "Automatically writes CSS styles", "D": "Increases browser JavaScript speed"},
         "correct": "B"},
        {"text": "What is the key difference between localStorage and sessionStorage in the browser?",
         "options": {"A": "localStorage persists across browser sessions; sessionStorage is cleared when the tab/page session closes", "B": "localStorage only stores integers", "C": "sessionStorage can be read directly by remote servers", "D": "localStorage is limited to 1KB"},
         "correct": "A"},
        {"text": "Which HTML5 tag is standard for playing audio files natively?",
         "options": {"A": "<sound>", "B": "<audio>", "C": "<media>", "D": "<music>"},
         "correct": "B"},
        {"text": "What is the main role of a CSS preprocessor like Sass (SCSS)?",
         "options": {"A": "Enables variables, nesting, and mixins that compile into standard CSS", "B": "Compresses images on web servers", "C": "Minifies backend database tables", "D": "Replaces JavaScript for user interaction"},
         "correct": "A"},
        {"text": "In React's useEffect hook, what is the purpose of returning a cleanup function?",
         "options": {"A": "To remove database records", "B": "To cancel subscriptions, timers, or event listeners before unmounting or re-running the effect", "C": "To reset all component states to null", "D": "To clear browser cookies"},
         "correct": "B"},
    ],
    "Cybersecurity Analyst": [
        {"text": "What does SQL Injection exploit?",
         "options": {"A": "Weak passwords", "B": "Unsanitised database queries", "C": "Network firewalls", "D": "Encryption keys"},
         "correct": "B"},
        {"text": "What is a firewall primarily used for?",
         "options": {"A": "Speed up network", "B": "Encrypt data", "C": "Monitor and filter network traffic", "D": "Backup data"},
         "correct": "C"},
        {"text": "What does 'phishing' refer to?",
         "options": {"A": "Port scanning", "B": "Exploiting buffer overflows", "C": "Tricking users into revealing sensitive info", "D": "DDoS attacks"},
         "correct": "C"},
        {"text": "Which protocol encrypts web traffic?",
         "options": {"A": "HTTP", "B": "FTP", "C": "SMTP", "D": "HTTPS"},
         "correct": "D"},
        {"text": "What is a VPN used for?",
         "options": {"A": "Speed up internet", "B": "Create encrypted tunnel for secure communication", "C": "Scan for malware", "D": "Manage passwords"},
         "correct": "B"},
        {"text": "What is 'two-factor authentication'?",
         "options": {"A": "Two separate passwords", "B": "Biometric only authentication", "C": "Verification using two different factors", "D": "Double encryption"},
         "correct": "C"},
        {"text": "What does a penetration tester do?",
         "options": {"A": "Writes malware", "B": "Repairs network cables", "C": "Simulates attacks to find vulnerabilities", "D": "Manages backups"},
         "correct": "C"},
        {"text": "What is the CIA triad in cybersecurity?",
         "options": {"A": "Coding, Integration, Analysis", "B": "Confidentiality, Integrity, Availability", "C": "Classify, Inspect, Analyse", "D": "Control, Implement, Audit"},
         "correct": "B"},
        {"text": "Which Linux command shows currently open network ports?",
         "options": {"A": "ps aux", "B": "netstat -tuln", "C": "ls -la", "D": "top"},
         "correct": "B"},
        {"text": "What is ransomware?",
         "options": {"A": "Software that speeds up systems", "B": "Malware that encrypts files and demands payment", "C": "A type of firewall", "D": "Network monitoring tool"},
         "correct": "B"},
        {"text": "What is a Distributed Denial of Service (DDoS) attack?",
         "options": {"A": "Flooding a target system with network traffic from multiple compromised machines to make it unavailable", "B": "Installing keyloggers on client laptops", "C": "Injecting malicious SQL statements into a form", "D": "Cracking password hashes offline"},
         "correct": "A"},
        {"text": "Which default port is standardly used for Secure Shell (SSH) communication?",
         "options": {"A": "21", "B": "22", "C": "25", "D": "80"},
         "correct": "B"},
        {"text": "What is the core philosophy of a Zero Trust security architecture?",
         "options": {"A": "Trust all internal network traffic by default", "B": "Never trust, always verify every access request regardless of origin", "C": "Disable multi-factor authentication", "D": "Rely solely on perimeter firewalls"},
         "correct": "B"},
        {"text": "What vulnerability occurs when an application includes untrusted user input directly in a web page without validation, executing malicious scripts in client browsers?",
         "options": {"A": "Cross-Site Scripting (XSS)", "B": "Cross-Site Request Forgery (CSRF)", "C": "Buffer Overflow", "D": "Path Traversal"},
         "correct": "A"},
        {"text": "In cybersecurity defense, what is a 'honeypot'?",
         "options": {"A": "A password cracking tool", "B": "A decoy system intended to lure, detect, and analyze unauthorized intrusion attempts", "C": "An automated patch manager", "D": "A database backup archive"},
         "correct": "B"},
        {"text": "Which of the following encryption algorithms is an asymmetric (public-key) cipher?",
         "options": {"A": "AES-256", "B": "RSA", "C": "DES", "D": "ChaCha20"},
         "correct": "B"},
        {"text": "What is the function of a SIEM (Security Information and Event Management) platform?",
         "options": {"A": "Aggregate, correlate, and analyze security logs and event data across an organization in real time", "B": "Compile C++ code into binary files", "C": "Create virtual private networks", "D": "Generate SSL certificates automatically"},
         "correct": "A"},
        {"text": "What does 'social engineering' mean in information security?",
         "options": {"A": "Writing unit tests for social media integrations", "B": "Psychological manipulation of individuals into divulging confidential information", "C": "Load balancing web applications", "D": "Automated network topology mapping"},
         "correct": "B"},
        {"text": "Which open-source tool is widely used for network packet analysis and packet sniffing?",
         "options": {"A": "Wireshark", "B": "Docker", "C": "Postman", "D": "Terraform"},
         "correct": "A"},
        {"text": "What does the Principle of Least Privilege (PoLP) dictate?",
         "options": {"A": "Every user should have administrative rights to prevent permission bottlenecks", "B": "Users and processes should only be given the minimum necessary privileges required to perform their tasks", "C": "Passwords should never expire", "D": "Network logs should only be retained for 1 hour"},
         "correct": "B"},
    ],
    "Cloud Engineer": [
        {"text": "What does EC2 stand for in AWS?",
         "options": {"A": "Elastic Compute Cloud", "B": "Enhanced Control Center", "C": "Enterprise Cloud Computing", "D": "External Compute Cluster"},
         "correct": "A"},
        {"text": "What is Docker primarily used for?",
         "options": {"A": "Writing Python scripts", "B": "Containerising applications", "C": "Managing databases", "D": "Network security"},
         "correct": "B"},
        {"text": "What does IaC stand for?",
         "options": {"A": "Internet as Code", "B": "Infrastructure as Code", "C": "Integration and Compliance", "D": "Instance and Container"},
         "correct": "B"},
        {"text": "What is Kubernetes used for?",
         "options": {"A": "Writing backend APIs", "B": "Container orchestration", "C": "Static site hosting", "D": "Database replication"},
         "correct": "B"},
        {"text": "Which AWS service provides object storage?",
         "options": {"A": "EC2", "B": "RDS", "C": "S3", "D": "Lambda"},
         "correct": "C"},
        {"text": "What is a CDN?",
         "options": {"A": "Cloud Database Network", "B": "Content Delivery Network", "C": "Centralised Data Node", "D": "Cloud DNS"},
         "correct": "B"},
        {"text": "What does auto-scaling in cloud computing do?",
         "options": {"A": "Backs up data automatically", "B": "Adjusts compute resources based on demand", "C": "Encrypts all traffic", "D": "Monitors costs"},
         "correct": "B"},
        {"text": "What is a Load Balancer?",
         "options": {"A": "Stores session data", "B": "Encrypts API calls", "C": "Distributes incoming traffic across servers", "D": "Compresses files"},
         "correct": "C"},
        {"text": "What does CI/CD stand for?",
         "options": {"A": "Cloud Integration / Cloud Deployment", "B": "Continuous Integration / Continuous Delivery", "C": "Code Inspection / Code Delivery", "D": "Container Isolation / Container Distribution"},
         "correct": "B"},
        {"text": "Which tool is commonly used for Infrastructure as Code?",
         "options": {"A": "Jenkins", "B": "Terraform", "C": "Docker", "D": "Kubernetes"},
         "correct": "B"},
        {"text": "What is serverless computing (such as AWS Lambda or Google Cloud Functions)?",
         "options": {"A": "Computing that runs without any physical hardware existing", "B": "An execution model where the cloud provider manages machine provisioning, scaling, and maintenance automatically", "C": "Running web applications exclusively on local workstations", "D": "Unmetered static web hosting"},
         "correct": "B"},
        {"text": "Which AWS service is a managed relational database engine supporting PostgreSQL, MySQL, and MariaDB?",
         "options": {"A": "Amazon DynamoDB", "B": "Amazon RDS", "C": "Amazon Redshift", "D": "Amazon S3 Glacier"},
         "correct": "B"},
        {"text": "What is the primary function of an Amazon Virtual Private Cloud (VPC)?",
         "options": {"A": "To host public DNS domains", "B": "To create an isolated, customizable private virtual network for your cloud resources", "C": "To store static CSS files", "D": "To scan emails for spam"},
         "correct": "B"},
        {"text": "In Kubernetes, what is a Pod?",
         "options": {"A": "A physical server in a rack", "B": "The smallest deployable unit of computing in Kubernetes, encapsulating one or more containers", "C": "A persistent hard disk volume", "D": "A network security group"},
         "correct": "B"},
        {"text": "What is the primary purpose of Terraform state files (.tfstate)?",
         "options": {"A": "Store user passwords", "B": "Map real-world provisioned cloud resources to your configuration files and keep track of metadata", "C": "Compile binary executables", "D": "Encrypt API gateways"},
         "correct": "B"},
        {"text": "What does IAM stand for in AWS, Azure, and Google Cloud?",
         "options": {"A": "Internet Access Module", "B": "Identity and Access Management", "C": "Infrastructure Application Model", "D": "Integrated Asset Monitor"},
         "correct": "B"},
        {"text": "In AWS VPC networking, what is the role of an Internet Gateway (IGW)?",
         "options": {"A": "Enables bidirectional communication between resources in your VPC and the public internet", "B": "Automatically optimizes SQL queries", "C": "Manages Kubernetes pods", "D": "Compresses data stored in EBS volumes"},
         "correct": "A"},
        {"text": "What is the main benefit of deploying an API Gateway in front of microservices?",
         "options": {"A": "Centralizes authentication, rate limiting, routing, and SSL termination", "B": "Replaces backend databases", "C": "Generates React user interfaces", "D": "Stores static Docker images"},
         "correct": "A"},
        {"text": "What does 'High Availability' (HA) mean in cloud infrastructure design?",
         "options": {"A": "Running systems at 100% CPU load at all times", "B": "Designing architecture to ensure continuous operational uptime with minimal downtime across multiple availability zones", "C": "Deploying updates only once per calendar year", "D": "Using a single large server instance"},
         "correct": "B"},
        {"text": "What is Prometheus primarily used for in cloud-native environments?",
         "options": {"A": "Time-series metric collection, monitoring, and alerting", "B": "Continuous integration build testing", "C": "Domain name resolution", "D": "Container image repository hosting"},
         "correct": "A"},
    ],
    "Machine Learning Engineer": [
        {"text": "What is the purpose of a training set in ML?",
         "options": {"A": "Evaluate final model performance", "B": "Tune hyperparameters", "C": "Teach the model patterns from data", "D": "Deploy the model"},
         "correct": "C"},
        {"text": "What does 'gradient descent' do?",
         "options": {"A": "Normalises features", "B": "Minimises loss function by updating weights", "C": "Splits data into batches", "D": "Removes outliers"},
         "correct": "B"},
        {"text": "Which framework is most commonly used for deep learning?",
         "options": {"A": "Scikit-learn", "B": "Pandas", "C": "TensorFlow / PyTorch", "D": "Matplotlib"},
         "correct": "C"},
        {"text": "What is MLOps?",
         "options": {"A": "A type of neural network", "B": "Operations for deploying and maintaining ML models in production", "C": "A data preprocessing technique", "D": "A cloud storage service"},
         "correct": "B"},
        {"text": "What is a hyperparameter?",
         "options": {"A": "Output of a model", "B": "Learned weight in neural network", "C": "Configuration set before training begins", "D": "Validation score"},
         "correct": "C"},
        {"text": "What does 'feature engineering' mean?",
         "options": {"A": "Building neural network layers", "B": "Transforming raw data into useful model inputs", "C": "Evaluating model accuracy", "D": "Deploying models to cloud"},
         "correct": "B"},
        {"text": "What is the vanishing gradient problem?",
         "options": {"A": "Model trains too fast", "B": "Gradients become too small for early layers to learn", "C": "Overfitting on training data", "D": "Loss function returns NaN"},
         "correct": "B"},
        {"text": "Which metric is best for imbalanced classification?",
         "options": {"A": "Accuracy", "B": "Mean Squared Error", "C": "F1-Score", "D": "R-Squared"},
         "correct": "C"},
        {"text": "What does a confusion matrix show?",
         "options": {"A": "Feature correlations", "B": "True/False Positives and Negatives", "C": "Training loss over epochs", "D": "Model architecture"},
         "correct": "B"},
        {"text": "What is transfer learning?",
         "options": {"A": "Moving models between servers", "B": "Reusing a pre-trained model on a new task", "C": "Training on multiple GPUs", "D": "Converting model to ONNX format"},
         "correct": "B"},
        {"text": "What is the primary benefit of Batch Normalization in deep neural networks?",
         "options": {"A": "Reduces network parameters to zero", "B": "Stabilizes layer activations, accelerates convergence, and allows higher learning rates", "C": "Automatically labels unlabeled datasets", "D": "Converts neural networks into decision trees"},
         "correct": "B"},
        {"text": "How does Dropout regularization prevent overfitting in deep neural networks?",
         "options": {"A": "By randomly disabling a subset of neurons and their connections during each training step", "B": "By removing outliers from the test set", "C": "By clamping weights strictly to 0 or 1", "D": "By reducing the total number of training epochs"},
         "correct": "A"},
        {"text": "Which mechanism enables Transformer architectures to process sequences in parallel and capture long-range token relationships?",
         "options": {"A": "Self-Attention Mechanism", "B": "Recurrent Hidden State Loops", "C": "Max Pooling 2D", "D": "Depthwise Separable Convolution"},
         "correct": "A"},
        {"text": "In production MLOps, what is 'Concept Drift'?",
         "options": {"A": "Network latency during model serving", "B": "The statistical relationship between input features and the target variable changes over time", "C": "Hardware clock skew across GPU nodes", "D": "Deprecated Python library imports"},
         "correct": "B"},
        {"text": "What is Model Quantization used for during ML deployment?",
         "options": {"A": "Converting floating point weights (e.g. FP32) to lower-precision integers (e.g. INT8) to reduce model size and inference latency", "B": "Increasing parameter count to boost training accuracy", "C": "Translating Python code to JavaScript", "D": "Encrypting the weights file"},
         "correct": "A"},
        {"text": "Which loss function is most commonly utilized for multi-class classification with one-hot encoded targets?",
         "options": {"A": "Mean Squared Error (MSE)", "B": "Categorical Cross-Entropy Loss", "C": "Binary Cross-Entropy Loss", "D": "Mean Absolute Percentage Error"},
         "correct": "B"},
        {"text": "Which open-source platform is widely used for ML experiment tracking, model registry, and lifecycle management?",
         "options": {"A": "MLflow", "B": "Redis", "C": "Nginx", "D": "Terraform"},
         "correct": "A"},
        {"text": "What is the primary purpose of Early Stopping during deep learning model training?",
         "options": {"A": "Terminate training when validation loss ceases to improve, preventing overfitting", "B": "Prevent GPUs from reaching peak temperatures", "C": "Stop the server when memory usage reaches 90%", "D": "Skip backpropagation iterations"},
         "correct": "A"},
        {"text": "What does a Learning Rate Scheduler do during neural network optimization?",
         "options": {"A": "Dynamically adjusts the learning rate according to a predefined schedule (e.g., Cosine Annealing, Step Decay) to optimize convergence", "B": "Measures dataset download speeds", "C": "Monitors inference request queues", "D": "Calculates training data entropy"},
         "correct": "A"},
        {"text": "In Computer Vision, which layer architecture is specifically designed to extract spatial hierarchical patterns from 2D pixel grids?",
         "options": {"A": "Dense / Fully Connected Layer", "B": "Convolutional Layer (Conv2D)", "C": "Embedding Layer", "D": "Long Short-Term Memory (LSTM)"},
         "correct": "B"},
    ],
    "Full Stack Developer": [
        {"text": "What is the main difference between SQL and NoSQL databases?",
         "options": {"A": "SQL is faster", "B": "SQL uses structured tables; NoSQL uses flexible document/key-value stores", "C": "NoSQL supports more users", "D": "SQL is only for cloud"},
         "correct": "B"},
        {"text": "What does 'API' stand for?",
         "options": {"A": "Application Programming Interface", "B": "Automated Process Integration", "C": "Applied Protocol Interface", "D": "Advanced Program Installer"},
         "correct": "A"},
        {"text": "Which React hook fetches data on component mount?",
         "options": {"A": "useState", "B": "useContext", "C": "useEffect", "D": "useReducer"},
         "correct": "C"},
        {"text": "What is the purpose of JWT in web applications?",
         "options": {"A": "Style components", "B": "Secure, stateless authentication", "C": "Store database records", "D": "Compress images"},
         "correct": "B"},
        {"text": "What does 'npm install' do?",
         "options": {"A": "Starts the development server", "B": "Installs project dependencies from package.json", "C": "Builds the project for production", "D": "Runs tests"},
         "correct": "B"},
        {"text": "Which HTTP status code means 'Not Found'?",
         "options": {"A": "200", "B": "500", "C": "301", "D": "404"},
         "correct": "D"},
        {"text": "What is Docker used for in full stack development?",
         "options": {"A": "Writing CSS", "B": "Packaging apps with all dependencies into containers", "C": "Managing Git branches", "D": "Sending emails"},
         "correct": "B"},
        {"text": "What is CORS?",
         "options": {"A": "A CSS framework", "B": "A database query language", "C": "Cross-Origin Resource Sharing — controls cross-domain API access", "D": "A cloud hosting service"},
         "correct": "C"},
        {"text": "What does async/await do in JavaScript?",
         "options": {"A": "Creates CSS animations", "B": "Handles asynchronous operations more readably", "C": "Declares global variables", "D": "Imports modules"},
         "correct": "B"},
        {"text": "What is the role of a reverse proxy like Nginx?",
         "options": {"A": "Render React components", "B": "Manage SQL queries", "C": "Forward client requests to backend servers", "D": "Compile TypeScript"},
         "correct": "C"},
        {"text": "In Node.js, what is the key difference between synchronous and asynchronous code execution?",
         "options": {"A": "Synchronous functions execute in separate worker threads automatically", "B": "Synchronous operations block the Node.js single-threaded event loop, whereas asynchronous operations use non-blocking callbacks/promises", "C": "Asynchronous operations cannot handle errors", "D": "Synchronous code is always faster"},
         "correct": "B"},
        {"text": "What is an ORM (Object-Relational Mapping) like SQLAlchemy or Prisma primarily used for?",
         "options": {"A": "Enables querying and manipulating database data using object-oriented programming paradigms rather than writing raw SQL", "B": "Compiling SCSS stylesheets into minified CSS", "C": "Hosting WebSocket chat servers", "D": "Generating SSL certificates"},
         "correct": "A"},
        {"text": "What is the main advantage of WebSockets compared to standard HTTP polling?",
         "options": {"A": "Provides persistent, low-latency, full-duplex bidirectional communication between browser and server over a single TCP connection", "B": "Compresses images more efficiently", "C": "Eliminates the need for backend code", "D": "Automatically formats SQL queries"},
         "correct": "A"},
        {"text": "In REST API design, what is the standard semantic difference between HTTP PUT and HTTP PATCH?",
         "options": {"A": "PUT replaces the entire resource representation; PATCH applies partial modifications to the resource", "B": "PUT is for creating new resources; PATCH is for deleting existing ones", "C": "PUT is read-only; PATCH is write-only", "D": "There is no distinction in the HTTP specification"},
         "correct": "A"},
        {"text": "What vulnerability is mitigated by properly escaping and sanitizing user inputs rendered in the DOM?",
         "options": {"A": "Cross-Site Scripting (XSS)", "B": "Denial of Service (DoS)", "C": "Buffer Overflow in OS kernels", "D": "BGP Hijacking"},
         "correct": "A"},
        {"text": "What is Redis primarily used for in full-stack web applications?",
         "options": {"A": "High-performance in-memory caching, session storage, and pub/sub message brokering", "B": "Relational table storage for cold historical logs", "C": "Frontend JavaScript transpilation", "D": "Operating system containerization"},
         "correct": "A"},
        {"text": "What is Server-Side Rendering (SSR) in frameworks like Next.js, and what is its primary benefit?",
         "options": {"A": "Rendering initial HTML on the server before sending it to the client, improving initial page load performance and SEO", "B": "Executing all React state exclusively on server CPUs", "C": "Preventing clients from inspecting HTML source", "D": "Replacing database queries with browser storage"},
         "correct": "A"},
        {"text": "What is the role of middleware functions in backend frameworks like Express or Flask?",
         "options": {"A": "Intercepting incoming requests to perform logging, authentication, validation, and header manipulation before passing control to route handlers", "B": "Designing CSS stylesheets", "C": "Compiling JSX into JavaScript", "D": "Formatting hard drive partitions"},
         "correct": "A"},
        {"text": "Which HTTP security header protects web applications from Clickjacking attacks in iframes?",
         "options": {"A": "X-Frame-Options or Content-Security-Policy (frame-ancestors)", "B": "Access-Control-Allow-Origin", "C": "Strict-Transport-Security only", "D": "Accept-Encoding"},
         "correct": "A"},
        {"text": "In Git, what is the difference between 'git merge' and 'git rebase'?",
         "options": {"A": "Merge creates a new commit preserving branch history; rebase re-applies commits onto the tip of another branch for a clean linear history", "B": "Merge deletes branch commits; rebase retains them", "C": "Rebase is only for remote repositories", "D": "Merge only works on main branches"},
         "correct": "A"},
    ],
}

COURSES = [
    {"title": "Python for Data Science", "description": "Master Python for data analysis, visualisation, and ML.", "career": "Data Scientist", "level": "beginner"},
    {"title": "Statistics & Probability Fundamentals", "description": "Core statistical concepts for data science.", "career": "Data Scientist", "level": "beginner"},
    {"title": "Machine Learning with Scikit-Learn", "description": "Build and evaluate supervised/unsupervised ML models.", "career": "Data Scientist", "level": "intermediate"},
    {"title": "Deep Learning with TensorFlow", "description": "Neural networks, CNNs, RNNs, and transformers.", "career": "Data Scientist", "level": "advanced"},
    {"title": "HTML, CSS & JavaScript Essentials", "description": "Build modern, responsive websites from scratch.", "career": "Web Developer", "level": "beginner"},
    {"title": "React.js Complete Guide", "description": "Hooks, context, routing, and state management.", "career": "Web Developer", "level": "intermediate"},
    {"title": "Node.js & Express Backend", "description": "REST APIs, middleware, authentication with Node.", "career": "Web Developer", "level": "intermediate"},
    {"title": "Cybersecurity Fundamentals", "description": "CIA triad, threats, vulnerabilities, and defences.", "career": "Cybersecurity Analyst", "level": "beginner"},
    {"title": "Ethical Hacking & Penetration Testing", "description": "Hands-on offensive security techniques.", "career": "Cybersecurity Analyst", "level": "intermediate"},
    {"title": "AWS Cloud Practitioner", "description": "Core AWS services: EC2, S3, RDS, Lambda, IAM.", "career": "Cloud Engineer", "level": "beginner"},
    {"title": "Docker & Kubernetes Mastery", "description": "Containerise apps and orchestrate with Kubernetes.", "career": "Cloud Engineer", "level": "intermediate"},
    {"title": "MLOps & Model Deployment", "description": "Deploy, monitor, and maintain ML models in production.", "career": "Machine Learning Engineer", "level": "advanced"},
    {"title": "Full Stack Web Development Bootcamp", "description": "End-to-end web development with React and Node.", "career": "Full Stack Developer", "level": "intermediate"},
]

def seed():
    with app.app_context():
        print("Creating tables...")
        db.create_all()

        # --- Admin user ---
        if not User.query.filter_by(email='admin@ailearnpath.com').first():
            pw = bcrypt.hashpw(b'AdminPass123!', bcrypt.gensalt()).decode('utf-8')
            admin = User(name='Admin', email='admin@ailearnpath.com', password_hash=pw, role='admin')
            db.session.add(admin)
            print("[OK] Admin user created")

        # --- Careers ---
        career_map = {}
        for c in CAREERS:
            existing = Career.query.filter_by(name=c['name']).first()
            if not existing:
                obj = Career(name=c['name'], description=c['description'])
                db.session.add(obj)
                db.session.flush()
                career_map[c['name']] = obj
                print(f"  [OK] Career: {c['name']}")
            else:
                career_map[c['name']] = existing
        db.session.commit()

        # --- Skills ---
        all_skill_names = set()
        for skills in CAREER_SKILLS.values():
            all_skill_names.update(skills)

        skill_map = {}
        for name in all_skill_names:
            existing = Skill.query.filter_by(name=name).first()
            if not existing:
                obj = Skill(name=name, description=f"Core skill: {name}")
                db.session.add(obj)
                db.session.flush()
                skill_map[name] = obj
            else:
                skill_map[name] = existing
        db.session.commit()

        # --- Career-Skill links ---
        for career_name, skills in CAREER_SKILLS.items():
            career = career_map[career_name]
            for skill_name in skills:
                skill = skill_map[skill_name]
                exists = CareerSkill.query.filter_by(career_id=career.id, skill_id=skill.id).first()
                if not exists:
                    db.session.add(CareerSkill(career_id=career.id, skill_id=skill.id, target_score=70.0))
        db.session.commit()
        print("[OK] Skills seeded")

        # --- Courses ---
        for c in COURSES:
            if not Course.query.filter_by(title=c['title']).first():
                career = career_map.get(c['career'])
                obj = Course(
                    title=c['title'],
                    description=c['description'],
                    career_id=career.id if career else None,
                    difficulty=c['level'],
                )
                db.session.add(obj)
        db.session.commit()
        print("[OK] Courses seeded")

        # --- Diagnostic Assessments & Questions ---
        for career_name, questions in DIAGNOSTIC_QUESTIONS.items():
            career = career_map.get(career_name)
            if not career:
                continue
            assessment = Assessment.query.filter_by(career_id=career.id, type='diagnostic').first()
            if not assessment:
                assessment = Assessment(
                    title=f"{career_name} Diagnostic Assessment",
                    type='diagnostic',
                    career_id=career.id,
                )
                db.session.add(assessment)
                db.session.flush()
                print(f"  [OK] Assessment: {career_name}")

            for q in questions:
                existing_q = Question.query.filter_by(assessment_id=assessment.id, text=q['text']).first()
                if not existing_q:
                    db.session.add(Question(
                        assessment_id=assessment.id,
                        text=q['text'],
                        options=q['options'],
                        correct_option=q['correct'],
                    ))
        db.session.commit()
        print("[OK] Assessments & questions seeded (20 questions per career)")
        print("\nDatabase seeding complete!")
        print("   Admin: admin@ailearnpath.com / AdminPass123!")

if __name__ == '__main__':
    seed()



