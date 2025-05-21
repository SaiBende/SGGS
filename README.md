
# SGGS URL Web Service – Frontend

This is the **frontend** for SGGS URL Web Service, a modern web application for shortening URLs, generating QR codes, and creating personalized LinkTree-style public profile pages. Built with React and Tailwind CSS, this project helps you manage, share, and analyze your links easily.

---

## Features

- **URL Shortener:** Instantly shorten long URLs with optional custom aliases. Each short link gets a branded domain and a downloadable QR code.
- **QR Code Generator:** Generate customizable QR codes for any URL. Adjust color, size, error correction, and embed your own logo.
- **Personalized LinkTree Pages:** Create a public profile page with your photo, description, and social media links. Share your unique profile URL.
- **User Dashboard:** Manage all your links, view analytics (visit trends), and access your profile and QR codes from a single dashboard.
- **Authentication:** Secure registration and login with JWT-based authentication.
- **Stripe Payments:** Integrated Stripe checkout for premium plans.
- **Responsive Design:** Fully responsive and mobile-friendly UI.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite, Chart.js, React Router
- **State Management:** React Hooks
- **Authentication:** JWT
- **Payments:** Stripe
- **QR Codes:** qrcode.react
- **Notifications:** react-toastify

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

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
   VITE_API_URL=<your-backend-api-url>
   VITE_FRONTEND_URL=<your-frontend-url>
   VITE_STRIPE_PUBLIC_KEY=<your-stripe-public-key>
   ```

4. **Run the development server:**
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
│   ├── pages/
│   ├── publicprofile/
│   ├── App.jsx
│   ├── Layout.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── ...
```

---

## Usage

- **Shorten a URL:** Register or log in, enter your long URL, and optionally set a custom alias. Copy or share the generated short link and QR code.
- **Generate a QR Code:** Use the QR generator to create a QR code for any URL, customize its appearance, and download it.
- **Create Your LinkTree:** Add your social media links, profile photo, and description. Share your public profile URL.
- **Dashboard:** View and manage all your links, see visit analytics, and download QR codes.

---

## Backend URL

The backend for this project is available here:  
[https://github.com/SaiBende/URL_Shortner](https://github.com/SaiBende/URL_Shortner)

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

**Made with LOVE <3 by [saibende.tech](https://saibende.tech)**