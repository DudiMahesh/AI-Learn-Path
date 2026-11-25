import re

def validate_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email) is not None

def validate_password(password):
    return len(password) >= 8

def validate_registration(data):
    if not data or not data.get('email') or not data.get('password') or not data.get('name'):
        return False, "Missing required fields"
    if not validate_email(data['email']):
        return False, "Invalid email format"
    if not validate_password(data['password']):
        return False, "Password must be at least 8 characters"
    return True, ""
