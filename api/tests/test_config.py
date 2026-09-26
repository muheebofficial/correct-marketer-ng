import unittest

from app.config import Settings, validate_settings


class SettingsValidationTests(unittest.TestCase):
    def test_requires_astra_when_memory_db_disabled(self):
        cfg = Settings(
            astra_endpoint="",
            astra_token="",
            dev_memory_db=False,
            shared_secret="top-secret",
            admin_key="admin-key",
        )

        errors = validate_settings(cfg)

        self.assertIn("ASTRA_DB_API_ENDPOINT", "\n".join(errors))
        self.assertIn("ASTRA_DB_APPLICATION_TOKEN", "\n".join(errors))

    def test_allows_local_memory_mode(self):
        cfg = Settings(
            astra_endpoint="",
            astra_token="",
            dev_memory_db=True,
            shared_secret="top-secret",
            admin_key="admin-key",
        )

        self.assertEqual([], validate_settings(cfg))


if __name__ == "__main__":
    unittest.main()
