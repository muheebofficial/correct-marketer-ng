import unittest
from datetime import timedelta, datetime, timezone

from app.store import MemoryStore


class PostNotificationStoreTests(unittest.TestCase):
    def setUp(self):
        self.store = MemoryStore()
        self.store.upsert("posts", "example-post", {"status": "published", "title": "Example"})

    def test_claim_is_exclusive_until_released(self):
        claimed = self.store.claim_post_notification("example-post")

        self.assertIsNotNone(claimed)
        self.assertEqual("sending", claimed["notifyState"])
        self.assertIsNone(self.store.claim_post_notification("example-post"))

        self.store.set_post_notification("example-post", {"notifyState": "pending"})
        reclaimed = self.store.claim_post_notification("example-post")

        self.assertIsNotNone(reclaimed)
        self.assertEqual("sending", reclaimed["notifyState"])

    def test_claim_skips_unpublished_or_already_notified_posts(self):
        self.store.upsert("posts", "draft-post", {"status": "draft"})
        self.store.upsert("posts", "old-post", {"status": "published", "notified": True})

        self.assertIsNone(self.store.claim_post_notification("draft-post"))
        self.assertIsNone(self.store.claim_post_notification("old-post"))

    def test_claim_skips_future_dated_published_posts(self):
        future = (datetime.now(timezone.utc) + timedelta(hours=1)).isoformat()
        self.store.upsert("posts", "future-post", {"status": "published", "publishedAt": future})

        self.assertIsNone(self.store.claim_post_notification("future-post"))

    def test_mark_published_posts_notified_skips_future_dated_posts(self):
        future = (datetime.now(timezone.utc) + timedelta(hours=1)).isoformat()
        self.store.upsert("posts", "future-post", {"status": "published", "publishedAt": future})

        self.assertEqual(0, self.store.mark_published_posts_notified("2025-01-01T00:00:00+00:00"))
        self.assertIsNone(self.store.get("posts", "future-post").get("notified"))


if __name__ == "__main__":
    unittest.main()