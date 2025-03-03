import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv('MONGO_URI')
DB_NAME = os.getenv('MONGO_DB_NAME')

SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
