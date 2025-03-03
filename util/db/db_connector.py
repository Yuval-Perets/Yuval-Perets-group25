import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def get_db():
    # Retrieve the MongoDB URI and database name from environment variables
    db_uri = os.getenv("DB_URI")
    if not db_uri:
        raise Exception("DB_URI not set in environment variables.")
    
    client = MongoClient(db_uri)
    db_name = os.getenv("DB_NAME", "resteasy_db")
    return client[db_name]
