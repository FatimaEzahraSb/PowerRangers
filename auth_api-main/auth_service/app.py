from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager,create_access_token
from werkzeug.security import generate_password_hash,check_password_hash
from models import User
from database import db_session
import os
from dotenv import load_dotenv
from flask_cors import CORS


load_dotenv()

app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')

jwt = JWTManager(app)
CORS(app, origins=["http://localhost:5173"])

# Ajout de la route pour la page d'accueil
@app.route('/')
def home():
    return "Welcome to the Authentication API!"

@app.route('/auth/register', methods=['POST'])
def register():
    try:
       data = request.get_json()
       username = data.get('username')
       password = data.get('password')

       hashed_password = generate_password_hash(password)

       user = User(username=username,password=hashed_password)
    

       db_session.add(user)
       db_session.commit()

       return jsonify({"message": "User registered successfully"}),201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/auth/login', methods=['POST'])
def login():
    try:
       data = request.get_json()
       email = data.get('email')
       password = data.get('password')

       # Recherche l'utilisateur par email
       user = db_session.query(User).filter_by(email=email).first()

       if user and check_password_hash(user.password, password):
          # Crée un token d'accès avec email et username
          access_token = create_access_token(identity={'username': user.username, 'email': user.email})
          return jsonify(access_token=access_token), 200
       else:
          return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    

if __name__ == '__main__':
    app.run(debug=True,port=5000)


