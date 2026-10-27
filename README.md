
# SGGS — Link Studio Frontend

This is the **frontend** for SGGS — **Shorten, Generate, Group & Share** — a
link studio for shortening URLs, generating branded QR codes, grouping your
links in one place, and sharing them from a LinkTree-style public profile. It
pairs a React + Vite app with Clerk authentication, click analytics and one-time
Stripe plans.

The app is live at **https://sggs.saibende.in**.

The interface is a custom Tailwind design system with locally built,
Aceternity-style motion and layout primitives — no component-library dependency.

---

## Features

- **URL shortener:** Shorten any URL with an optional custom back-half. Every link gets a copy button, QR code and click history.
- **QR studio:** Design a QR code with colour presets, foreground/background colours, dot styles, error correction, size and an optional logo, then download a print-ready PNG.
- **Link-in-bio page:** Add a photo, bio and social links, preview the page live, and publish at `/u/<username>`.
- **Dashboard:** Search, sort, copy, rename and delete links; open per-link analytics or a downloadable QR code; track plan usage from one workspace.
- **Analytics:** Per-link visit history rendered as a daily trend chart.
- **Authentication:** Clerk’s prebuilt sign-in/sign-up UI, email verification, MFA and password reset, themed to match the app.
- **Payments:** Stripe Checkout for Basic, Standard and Premium plans, with return-page confirmation and plan status on the dashboard.
- **Responsive design:** Dedicated mobile layouts, a glass navigation bar, custom modals, empty states, loading states and error recovery on every page.

---

## Tech stack

- **App:** React 18, Vite 5, React Router 6
- **Styling:** Tailwind CSS 3.4, `clsx`, `tailwind-merge`, custom design tokens
- **Motion & icons:** Framer Motion, Lucide
- **Fonts:** Inter Variable and Manrope Variable, bundled with Fontsource
- **Auth:** Clerk (`@clerk/react`)
- **Payments:** Stripe.js
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
   VITE_STRIPE_PUBLIC_KEY=<your-stripe-public-key>
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   ```

   `VITE_CLERK_PUBLISHABLE_KEY` must belong to the same Clerk application as
   the backend's `CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`. If it is missing,
   the app shows a configuration screen instead of loading.

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

5. **Run the development server:**
   ```sh
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ui/            # buttons, cards, modals, beams, brand mark, etc.
│   ├── lib/               # brand helpers, class merging, formatting
│   ├── pages/             # Home, Dashboard, Pricing, LinkTree, About, ...
│   ├── publicprofile/     # public /u/:username profile
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
> email and can be used at `/u/<username>`.

- **Shorten a URL:** Sign in, open **Create link** (`/shortenlink`), enter the
  destination and an optional custom back-half. Copy or share the short link
  and its QR code.
- **Design a QR code:** Open `/qrgenerate` for the full studio — presets,
  custom colours, pattern, logo, error correction and PNG download. Everything
  is rendered in the browser; no destination data is stored.
- **Build your link-in-bio page:** At `/linktree`, add a photo, bio and social
  links. The preview updates as you type and the public page is live at
  `/u/<username>`.
- **Manage from the dashboard:** At `/dashboard`, search, sort, rename, delete
  and analyse your links, check plan usage, and copy your public page URL.

Protected routes redirect signed-out visitors to `/login` and return them to
the requested page after authentication.

---

## Backend URL

The backend for this project is available here:  
[https://github.com/SaiBende/URL_Shortner](https://github.com/SaiBende/URL_Shortner)

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

**Made with LOVE <3 by [saibende.tech](https://saibende.tech)**