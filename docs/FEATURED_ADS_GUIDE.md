# Featured Ads Guide
`placement_key` identifies where ad cards render (web/app surfaces).

Use one record per placement. Same vendor/deal can appear in multiple areas by creating multiple records.

Priority and weight control ordering/rotation behavior.

Schedule with `starts_at` + `ends_at`; status controls lifecycle.

Billing status tracks manual payment progress (`unpaid/pending/paid/...`).

Impressions and clicks are incremented via `track_marketplace_event` RPC.
