"""
Database access layer.

When DEV_MEMORY_DB=1, everything is stored in an in-process dict instead of
Astra DB — useful for local testing without real credentials. In production
this always talks to Astra DB.
"""
from __future__ import annotations
import itertools
from typing import Any

from .config import settings

_memory_store: dict[str, list[dict]] = {}
_id_counter = itertools.count(1)


class _MemoryCollection:
    def __init__(self, name: str):
        self._name = name
        _memory_store.setdefault(name, [])

    def find(self, filter: dict | None = None, limit: int = 20, sort: dict | None = None):
        items = _memory_store[self._name]
        if filter:
            items = [i for i in items if all(i.get(k) == v for k, v in filter.items())]
        if sort:
            key = next(iter(sort))
            items = sorted(items, key=lambda i: i.get(key, ""), reverse=sort[key] == -1)
        return items[:limit]

    def find_one(self, filter: dict) -> dict | None:
        for item in _memory_store[self._name]:
            if all(item.get(k) == v for k, v in filter.items()):
                return item
        return None

    def insert_one(self, doc: dict):
        doc = {**doc, "_id": str(next(_id_counter))}
        _memory_store[self._name].append(doc)
        return type("InsertResult", (), {"inserted_id": doc["_id"]})()


class _MemoryDatabase:
    def get_collection(self, name: str) -> _MemoryCollection:
        return _MemoryCollection(name)


class _AstraDatabase:
    def __init__(self):
        from astrapy import DataAPIClient
        client = DataAPIClient(settings.astra_token)
        self._db = client.get_database(settings.astra_endpoint)

    def get_collection(self, name: str):
        return self._db.get_collection(name)


_db_singleton: Any = None


def get_database():
    """Returns the shared DB instance — memory-backed or real Astra DB."""
    global _db_singleton
    if _db_singleton is None:
        _db_singleton = _MemoryDatabase() if settings.dev_memory_db else _AstraDatabase()
    return _db_singleton