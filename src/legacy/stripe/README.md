# Legacy Stripe frontend

These files preserve the original Stripe flow. They are **not imported or
routed**; Clerk Billing is the active billing system.

- `Pricing.jsx` - the old one-time INR plan cards and Stripe Checkout redirect.
- `Return.jsx` - the old Stripe session-status return page.

To re-enable, restore the `/payment/session-status/return` route in
`src/App.jsx` and point `src/pages/Pricing.jsx` at this implementation. The
matching backend handlers live in `URL_Shortner/src/legacy/stripe/`.
