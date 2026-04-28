# Database Guide
Core tables: `admin_profiles`, `vendors`, `deals`, `sponsored_placements`, `marketplace_events`, `vendor_plans`, `vendor_subscriptions` plus taxonomy/profile tables.

Relationships:
- Vendor belongs to locality and many categories.
- Deal belongs to vendor.
- Sponsored placement targets vendor/deal/category/external URL.
- Marketplace events track engagement and increment counters.
