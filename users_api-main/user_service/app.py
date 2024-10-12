from flask import Flask, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager
from werkzeug.security import generate_password_hash
from models import User
from database import db_session
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')

app.config['JWT_TOKEN_LOCATION'] = ['headers']

jwt = JWTManager(app)
CORS(app, origins=["http://localhost:5173"])


# Route d'inscription (POST)
@app.route('/users/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')

        # Validation des champs
        if not email or not username or not password:
            return jsonify({"error": "Missing required fields"}), 400

        # Hachage du mot de passe
        hashed_password = generate_password_hash(password)

        # Création de l'utilisateur
        new_user = User(email=email, username=username, password=hashed_password)
        db_session.add(new_user)
        db_session.commit()

        return jsonify({"message": "User registered successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Route pour obtenir les informations de l'utilisateur connecté (GET)
@app.route('/users/me', methods=['GET'])
@jwt_required()
def get_user_info():
    print("Route /users/me accessed")
    user_identity = get_jwt_identity()
    user = db_session.query(User).filter_by(username=user_identity['username']).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({
        "id": user.id,
        "username": user.username
    }), 200


# Route pour supprimer un utilisateur (DELETE)
@app.route('/users/me', methods=['DELETE'])
@jwt_required()
def delete_user_info():
    print("Route /users/me accessed")
    user_identity = get_jwt_identity()
    user = db_session.query(User).filter_by(username=user_identity['username']).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    db_session.delete(user)
    db_session.commit()
    return jsonify({"message": "User deleted successfully"}), 200


if __name__ == '__main__':
    app.run(debug=True, port=5001)
