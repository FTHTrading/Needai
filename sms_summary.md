# SMS Summary
Run: 2026-01-31T00:44:38.223Z
Sender: +19129106333
Total contracts scanned: 5
Valid numbers (sent): 0
Invalid numbers (skipped): 5
Failed sends: 0
Planned (dry-run): 0

Reasons breakdown:
- test_number (555): 5

Artifacts:
- sms_plan.csv
- sms_invalid.csv
- sms_sent.csv
- sms_failed.csv

Exit code:
- 0 if at least one send succeeded; 1 if no sends succeeded.

Next actions: Replace placeholder phone numbers with valid E.164 numbers and re-run with `--send-sms`.