"""Create the Astra collections used by the site (safe to run repeatedly).

    python -m scripts.seed
"""
from app.config import CONTENT_COLLECTIONS, DATA_COLLECTIONS
from app.store import AstraStore, get_store

if __name__ == "__main__":
    store = get_store()
    if isinstance(store, AstraStore):
        for name in (*CONTENT_COLLECTIONS, *DATA_COLLECTIONS):
            store._col(name)  # creates the collection if it does not exist
            print(f"ready: {name}")
    else:
        print("DEV_MEMORY_DB is on - nothing to create.")
