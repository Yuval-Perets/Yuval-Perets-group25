from util.db.db_connector import get_db

def analyze_db():
    db = get_db()
    # Get a list of all collection names in the database
    collections = db.list_collection_names()
    
    if not collections:
        print("לא נמצאו אוספים בבסיס הנתונים.")
    else:
        for collection in collections:
            print("=" * 50)
            print(f"אוסף: {collection}")
            print("=" * 50)
            
            # Retrieve all documents in the current collection
            docs = list(db[collection].find())
            if docs:
                for doc in docs:
                    print(doc)
            else:
                print("אין מסמכים באוסף זה.")
            print("\n")

if __name__ == '__main__':
    analyze_db()
