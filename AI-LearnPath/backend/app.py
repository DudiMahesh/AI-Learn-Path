from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
from config.settings import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    import os
    cors_env = os.getenv("CORS_ORIGINS", "")
    if cors_env.strip() == "*":
        allowed_origins = "*"
    else:
        default_origins = [
            "http://localhost:3000", "http://localhost:3001", "http://localhost:5173",
            "http://127.0.0.1:3000", "http://127.0.0.1:3001"
        ]
        extra_origins = [o.strip() for o in cors_env.split(",") if o.strip()]
        allowed_origins = list(dict.fromkeys(default_origins + extra_origins))

    CORS(app,
         origins=allowed_origins,
         supports_credentials=(allowed_origins != "*"),
         allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    JWTManager(app)

    # Pre-flight check database reachability before initializing SQLAlchemy
    db_uri = app.config.get('SQLALCHEMY_DATABASE_URI', '')
    if 'neon.tech' in db_uri or 'postgres' in db_uri:
        try:
            import socket, urllib.parse
            parsed = urllib.parse.urlparse(db_uri)
            if parsed.hostname:
                socket.gethostbyname(parsed.hostname)
        except Exception as dns_err:
            import os
            db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ailearnpath.db')
            print(f"Notice: Remote database DNS unreachable ({dns_err}). Using local SQLite: {db_path}")
            app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
            app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {}

    db.init_app(app)

    from routes.auth import auth_bp
    from routes.profile import profile_bp
    from routes.dashboard import dashboard_bp
    from routes.assessment import assessment_bp
    from routes.learning_path import learning_path_bp
    from routes.courses import courses_bp
    from routes.recommendations import recommendations_bp
    from routes.progress import progress_bp
    from routes.rag import rag_bp
    from routes.admin import admin_bp
    from routes.what_if import what_if_bp
    from routes.search import search_bp
    from routes.visual import visual_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(profile_bp, url_prefix='/api/profile')
    app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')
    app.register_blueprint(assessment_bp, url_prefix='/api/assessment')
    app.register_blueprint(learning_path_bp, url_prefix='/api/learning-path')
    app.register_blueprint(courses_bp, url_prefix='/api')
    app.register_blueprint(recommendations_bp, url_prefix='/api')
    app.register_blueprint(progress_bp, url_prefix='/api')
    app.register_blueprint(rag_bp, url_prefix='/api/rag')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    app.register_blueprint(what_if_bp, url_prefix='/api/what-if')
    app.register_blueprint(search_bp, url_prefix='/api/search')
    app.register_blueprint(visual_bp, url_prefix='/api/visual')

    # Auto-create tables (works for SQLite and PostgreSQL with robust fallback)
    with app.app_context():
        try:
            db.create_all()
        except Exception as e:
            print(f"Warning: Primary database initialization failed: {e}")
            try:
                import os
                db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ailearnpath.db')
                app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
                app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {}
                db.engine.dispose()
                db.init_app(app)
                db.create_all()
                print(f"Switched to local SQLite fallback database: {db_path}")
            except Exception as e2:
                print(f"SQLite fallback initialization notice: {e2}")

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "ok", "message": "API is running"})

    @app.errorhandler(400)
    def bad_request(e):
        return jsonify({"success": False, "message": "Bad request"}), 400

    @app.errorhandler(401)
    def unauthorized(e):
        return jsonify({"success": False, "message": "Unauthorized"}), 401

    @app.errorhandler(403)
    def forbidden(e):
        return jsonify({"success": False, "message": "Forbidden"}), 403

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"success": False, "message": "Not found"}), 404

    @app.errorhandler(500)
    def internal_error(e):
        return jsonify({"success": False, "message": "Internal server error"}), 500

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=False)

