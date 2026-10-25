import json
import unittest
from types import SimpleNamespace
from unittest.mock import MagicMock, patch
from urllib.error import URLError

from app import lead_sink


class LeadSinkTests(unittest.TestCase):
    def setUp(self):
        self.lead = {"Lead ID": "e3f30c98-6732-4cf7-b9e5-dd59d93addc2", "Name": "Test Person"}

    @patch.object(lead_sink, "settings", SimpleNamespace(
        google_sheets_webhook_url="https://example.test/exec",
        google_sheets_webhook_secret="test-secret",
    ))
    @patch("app.lead_sink.urllib.request.urlopen")
    def test_posts_contract_and_accepts_duplicate_response(self, urlopen):
        response = MagicMock()
        response.status = 200
        response.read.return_value = b'{"ok":true,"duplicate":true}'
        urlopen.return_value.__enter__.return_value = response

        result = lead_sink.submit_lead_to_sheet("website_leads", self.lead)

        self.assertEqual({"ok": True}, result)
        request = urlopen.call_args.args[0]
        self.assertEqual("POST", request.get_method())
        self.assertEqual(
            {
                "secret": "test-secret",
                "sheet": "website_leads",
                "lead": self.lead,
            },
            json.loads(request.data),
        )
        self.assertEqual(10, urlopen.call_args.kwargs["timeout"])

    @patch.object(lead_sink, "settings", SimpleNamespace(
        google_sheets_webhook_url="https://example.test/exec",
        google_sheets_webhook_secret="test-secret",
    ))
    @patch("app.lead_sink.time.sleep")
    @patch("app.lead_sink.urllib.request.urlopen", side_effect=URLError("offline"))
    def test_retries_network_error_once(self, urlopen, sleep):
        result = lead_sink.submit_lead_to_sheet("ebook_leads", self.lead)

        self.assertEqual({"ok": False}, result)
        self.assertEqual(2, urlopen.call_count)
        sleep.assert_called_once_with(1)

    @patch.object(lead_sink, "settings", SimpleNamespace(
        google_sheets_webhook_url="",
        google_sheets_webhook_secret="",
    ))
    @patch("app.lead_sink.urllib.request.urlopen")
    def test_missing_configuration_fails_without_request(self, urlopen):
        result = lead_sink.submit_lead_to_sheet("website_leads", self.lead)

        self.assertEqual({"ok": False}, result)
        urlopen.assert_not_called()


if __name__ == "__main__":
    unittest.main()
