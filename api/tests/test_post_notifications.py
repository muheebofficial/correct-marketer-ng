import unittest

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


if __name__ == "__main__":
    unittest.main()