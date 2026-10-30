
# SGGS — Link Studio Frontend

This is the **frontend** for SGGS — **Shorten, Generate, Group & Share** — a
link studio for shortening URLs, generating branded QR codes, grouping your
links in one place, and sharing them from a LinkTree-style public profile. It
pairs a React + Vite app with Clerk authentication, click analytics and
Clerk Billing subscriptions.

The app is live at **https://sggs.saibende.in**.

The interface is a custom Tailwind design system with locally built,
Aceternity-style motion and layout primitives — no component-library dependency.

---

## Features

- **URL shortener:** Shorten any URL with an optional custom back-half. Every link gets a copy button, QR code and click history.
- **QR studio:** Design a QR code with colour presets, foreground/background colours, dot styles, error correction, size and an optional logo, then download a print-ready PNG.
- **Link-in-bio page:** Add a photo, bio and social links, preview the page live, and publish at `/u/<username>`.
- **Platform subdomains:** Public profiles are also served from DNS-safe handles at `<handle>.sggs.saibende.in`, with short links at `<handle>.sggs.saibende.in/<shortId>`.
- **Dashboard:** Search, sort, copy, rename and delete links; open per-link analytics or a downloadable QR code; track plan usage from one workspace.
- **Analytics:** Per-link visit history rendered as a daily trend chart.
- **Authentication:** Clerk’s prebuilt sign-in/sign-up UI, email verification, MFA and password reset, themed to match the app.
- **Payments:** Clerk Billing with monthly and yearly plans, a Clerk-rendered pricing table, and a subscription manager drawer for upgrades, period changes and cancellation.
- **Responsive design:** Dedicated mobile layouts, a glass navigation bar, custom modals, empty states, loading states and error recovery on every page.

---

## Tech stack

- **App:** React 18, Vite 5, React Router 6
- **Styling:** Tailwind CSS 3.4, `clsx`, `tailwind-merge`, custom design tokens
- **Motion & icons:** Framer Motion, Lucide
- **Fonts:** Inter Variable and Manrope Variable, bundled with Fontsource
- **Auth:** Clerk (`@clerk/react`)
- **Payments:** Clerk Billing (`PricingTable`, `SubscriptionDetailsButton`)
- **QR codes:** `qrcode.react` and `react-qrcode-logo`
- **Brand helpers:** `src/lib/brand.js` — full name, domain, live short-link base
- **Analytics:** Chart.js + `react-chartjs-2`
- **Notifications:** `react-toastify`
- **State:** React hooks — no global state library

---

## Design system

The visual language lives in `src/index.css` and `tailwind.config.js`:

- **Brand:** **SGGS** = **Shorten, Generate, Group & Share**; live domain `sggs.saibende.in`.
- **Palette:** warm `paper` / `canvas` backgrounds, near-black `ink` text, indigo `brand` accents, and coral / sky highlights.
- **Type:** Inter for UI copy, Manrope for display headings with tight tracking.
- **Marketing surfaces:** dark ink hero panels with grid, beam and spotlight effects.
- **App surfaces:** crisp white cards, hairline borders, soft elevation and a subtle background grid.
- **Shared primitives** in `src/components/ui/`:
  `Button`, `Badge`, `Input`, `Modal`, `EmptyState`, `StatCard`, `SectionHeading`,
  `PageHero`, `AuthShell`, `BrandMark`, `SpotlightCard`, `BackgroundBeams`,
  `MovingBorderCard`, `BentoGrid`, `GridPattern`, `TextGenerateEffect`.
- **Clerk theming:** `src/utils/clerkAppearance.js` aligns the prebuilt auth UI
  with the same colours, radii and typography.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- A Clerk application (same one used by the backend)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add:
   ```
   VITE_API_URL=http://localhost:8000/api
   VITE_FRONTEND_URL=http://localhost:5173
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   # Optional: base domain for public profile subdomains.
   # Defaults to sggs.saibende.in.
   # VITE_PLATFORM_DOMAIN=sggs.saibende.in
   # Optional: comma-separated hosts that always render the full app.
   # Defaults to sggs.saibende.in,www.sggs.saibende.in,sggs-kappa.vercel.app.
   # VITE_MAIN_HOSTS=sggs.saibende.in,www.sggs.saibende.in,sggs-kappa.vercel.app
   ```

   `VITE_CLERK_PUBLISHABLE_KEY` must belong to the same Clerk application as
   the backend's `CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`. If it is missing,
   the app shows a configuration screen instead of loading.

   `VITE_STRIPE_PUBLIC_KEY` is only needed if you deliberately re-enable the
   legacy Stripe flow in `src/legacy/stripe/`.

4. **Configure Clerk:**
   - Enable **Email address** + **Password**. Login also supports **Email code**;
     enable it if you want passwordless sign-in.
   - Enable **Email verification code** (Clerk’s prebuilt SignUp verifies codes,
     not links).
   - Enable **Password reset** with an email code. Login links to the
     `/forgot-password` reset page.
   - Keep the **Username** attribute **disabled**. Registration does not ask for
     a username; new accounts get a unique profile username generated from the
     email local part (existing usernames are preserved).
   - Add `http://localhost:5173` and the production frontend origin to
     **Authorized origins**.
   - Optional: enable MFA (email code, authenticator, backup codes, phone code).
   - Optional: rename the Clerk application to **SGGS** for branded headings.
   - **Billing:** claim the application first (`npx clerk auth login`) if it
     was created as an accountless development instance; an unclaimed app cannot
     enable Billing. Then enable Billing for users. Clerk creates the default
     Free plan with the slug `free_user`; keep it as the default and create the
     paid plans with the slugs `basic`, `standard` and `premium`. The configured
     ladder is Basic 20 links at $2/month ($19.92/year), Standard 30 links at
     $5/month ($49.92/year) and Premium at $15/month ($150/year). Give each paid
     plan both a **monthly** and a **yearly** price so the pricing table shows
     the period toggle. The backend owns the slug → quota mapping; see the
     backend README. Do not mention custom domains in the plan descriptions.

5. **Run the development server:**
   ```sh
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173).

### Platform subdomains

Profile pages are hosted on platform subdomains in addition to `/u/<username>`.
The tenant app is selected from `window.location.hostname` in
`src/lib/platform.js`:

- `https://<handle>.sggs.saibende.in/` renders the public profile.
- `https://<handle>.sggs.saibende.in/<shortId>` resolves the short link.
- App paths such as `/login`, `/dashboard` and `/pricing` redirect to the main
  origin. Clerk is never mounted on a tenant host.

`*.localhost` resolves to `127.0.0.1` on most systems, so local testing needs no
hosts-file entry. With the API on port `8000` and Vite on `5173`:

```
http://sai-bende.localhost:5173/        # public profile
http://sai-bende.localhost:5173/<id>    # short-link redirect
http://localhost:5173/                  # full app with Clerk
```

If the profile shows a 404, make sure the backend has a matching handle
(`npm run backfill:handles` in the backend repository).

#### DNS

The Vercel project owns the wildcard certificate:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `*` (under `sggs`) | `e1082a6bd772692c.vercel-dns-017.com` |
| NS | `_acme-challenge.sggs` | `ns1.vercel-dns.com` |
| NS | `_acme-challenge.sggs` | `ns2.vercel-dns.com` |

Add `*.sggs.saibende.in` to the Vercel project before creating these records.
Vercel issues wildcard certificates with DNS-01, so the `_acme-challenge.sggs`
delegation is required.

**Hostinger cannot create NS records on subdomains**, so the delegation cannot
live in Hostinger's DNS editor. Either move the `saibende.in` zone to Cloudflare
(free; it imports the existing MX/TXT records) or point the whole domain at
Vercel's nameservers. In Cloudflare, keep the wildcard CNAME and the existing
Vercel records **DNS only** (grey cloud).

---

## Project Structure

```
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ui/            # buttons, cards, modals, beams, brand mark, etc.
│   ├── lib/               # brand/platform helpers, class merging, formatting
│   ├── legacy/
│   │   └── stripe/        # inactive Stripe pricing and return pages
│   ├── pages/             # Home, Dashboard, Pricing, LinkTree, About, ...
│   ├── publicprofile/     # public /u/:username profile
│   ├── tenant/            # subdomain profile, redirects and 404
│   ├── utils/             # Clerk auth, appearance, redirect helpers
│   ├── App.jsx
│   ├── Layout.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── ...
```

## Scripts

```sh
npm run dev       # Vite dev server on http://localhost:5173
npm run lint      # ESLint
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

The production build is currently a single JS chunk (~915 kB, ~284 kB gzip);
Vite prints its >500 kB advisory. Route-level `React.lazy` or manual vendor
chunks are the next performance step when it becomes important.

---

## Usage

> **Existing SGGS accounts:** credentials now live in Clerk. Register once with
> the same email address you used before and choose a new credential (password,
> or email-code sign-in when enabled). The backend links that Clerk identity to
> your existing Mongo user so URLs, profile, and plan are preserved. Old
> passwords cannot be used through Clerk.

> **New accounts:** sign-up uses Clerk’s prebuilt form and does not ask for a
> username. Your public profile username is generated automatically from your
> email and can be used at `/u/<username>`; a DNS-safe handle and subdomain are
> generated at the same time.

- **Shorten a URL:** Sign in, open **Create link** (`/shortenlink`), enter the
  destination and an optional custom back-half. Copy or share the short link
  and its QR code.
- **Design a QR code:** Open `/qrgenerate` for the full studio — presets,
  custom colours, pattern, logo, error correction and PNG download. Everything
  is rendered in the browser; no destination data is stored.
- **Build your link-in-bio page:** At `/linktree`, add a photo, bio and social
  links. The preview updates as you type and the public page is live at
  `/u/<username>` and at your platform subdomain,
  `<handle>.sggs.saibende.in`.
- **Manage from the dashboard:** At `/dashboard`, search, sort, rename, delete
  and analyse your links, check plan usage, and copy your public page URL or
  platform subdomain.

Protected routes redirect signed-out visitors to `/login` and return them to
the requested page after authentication.

---

## Billing

Pricing and checkout are rendered by Clerk Billing:

- `/pricing` embeds Clerk's `<PricingTable />`, which reads the plans, prices,
  feature lists, monthly/yearly toggle and currency directly from the Clerk
  Dashboard.
- Signed-in users can open the `<SubscriptionDetailsButton />` plan manager from
  the pricing page or the dashboard plan card to change plans, switch between
  monthly and yearly billing, or cancel.
- After checkout, Clerk returns to `/dashboard?billing=success`; the dashboard
  asks the backend to force-sync the new subscription before showing quotas.
- Plan descriptions are configured in Clerk. Keep them free of custom-domain
  promises.

> **Currency:** Clerk Billing is currently USD-only and is not available to
> merchants based in India. The app shows the prices Clerk will actually charge.
> If INR is required, use the legacy Stripe rail in `src/legacy/stripe/` or add
> an INR-capable gateway such as Razorpay.

The old Stripe pages are preserved in `src/legacy/stripe/` and are not routed.

## Backend URL

The backend for this project is available here:  
[https://github.com/SaiBende/URL_Shortner](https://github.com/SaiBende/URL_Shortner)

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

**Made with LOVE <3 by [saibende.tech](https://saibende.tech)**