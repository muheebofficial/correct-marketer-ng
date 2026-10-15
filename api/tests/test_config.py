import importlib
import os
import unittest

import app.config as config
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

    def test_parses_comma_separated_web_origins(self):
        original = os.environ.get("WEB_ORIGINS")
        try:
            os.environ["WEB_ORIGINS"] = (
                "http://localhost:3000,https://correctmarketer.com.ng,"
                "https://www.correctmarketer.com.ng"
            )
            importlib.reload(config)
            self.assertEqual(
                (
                    "http://localhost:3000",
                    "https://correctmarketer.com.ng",
                    "https://www.correctmarketer.com.ng",
                ),
                config.settings.web_origins,
            )
        finally:
            if original is None:
                os.environ.pop("WEB_ORIGINS", None)
            else:
                os.environ["WEB_ORIGINS"] = original
            importlib.reload(config)


if __name__ == "__main__":
    unittest.main()
