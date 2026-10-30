import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import '@fontsource-variable/inter'
import '@fontsource-variable/manrope'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import MissingClerkNotice from './components/MissingClerkNotice.jsx'
import TenantApp from './tenant/TenantApp.jsx'
import { isTenantHost } from './lib/platform'
import './index.css'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const tenantHost = isTenantHost()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {tenantHost ? (
      <TenantApp />
    ) : publishableKey ? (
      <ClerkProvider publishableKey={publishableKey}>
        <App />
      </ClerkProvider>
    ) : (
      <MissingClerkNotice />
    )}
  </StrictMode>,
)
