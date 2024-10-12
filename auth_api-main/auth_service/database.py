from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session,sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()


DATABASE_URL=os.getenv('DB_URL')

engine=create_engine(DATABASE_URL, echo=True)

db_session = scoped_session(sessionmaker(autocommit=False,autoflush=False,bind=engine))

Base = declarative_base()

def init_db():
    try:
        print(f"Connecting to database: {DATABASE_URL}")
        Base.metadata.create_all(bind=engine)
        print("Tables created successfully!")
    except Exception as e:
        print(f"Error creating tables: {str(e)}")