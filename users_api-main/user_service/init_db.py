from database import db_session,init_db
from models import User


def test_connection():
    try:
        users=db_session.query(User).all()
        print(f"Number of users: {len(users)}")
    except Exception as e :
        print(f"Database connection error: {str(e)}")

init_db()
test_connection()