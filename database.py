import os
import ssl
from urllib.parse import quote_plus

from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv(
    "MONGODB_URI",
    "mongodb://localhost:27017"
)

DATABASE_NAME = os.getenv(
    "DATABASE_NAME",
    "zenvora_ai"
)

COLLECTION_NAME = os.getenv(
    "COLLECTION_NAME",
    "parsed_resumes"
)

try:

    # MongoDB Connection

    client = MongoClient(

        MONGODB_URI,

        serverSelectionTimeoutMS=10000,

        connectTimeoutMS=10000,

        socketTimeoutMS=None,

        retryWrites=True,

        w="majority",

        authSource="admin",

        maxPoolSize=50
    )

    # Test Connection

    client.server_info()

    # Database

    db = client[DATABASE_NAME]

    # Main Resume Collection

    collection = db[COLLECTION_NAME]

    # Jobs Collection

    jobs_collection = db["Jobs"]

    print(
        f"[SUCCESS] MongoDB Connected Successfully!"
    )

    print(
        f"   Database: {DATABASE_NAME}"
    )

    print(
        f"   Collection: {COLLECTION_NAME}"
    )

    print(
        f"   Jobs Collection: Jobs"
    )

except Exception as e:

    print(
        f"[ERROR] Warning: MongoDB connection failed"
    )

    print(
        f"   Error: {str(e)}"
    )

    print(
        f"   Database: {DATABASE_NAME}"
    )

    print(
        f"   Collection: {COLLECTION_NAME}"
    )

    print(
        f"   Note: Check MongoDB Atlas - Allow Access from Anywhere (0.0.0.0/0) in Network Access settings"
    )

    client = None

    db = None

    collection = None

    jobs_collection = None