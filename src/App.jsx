import './App.css';

import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';

import ProfileCard from './publicprofile/ProfileCard';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import About from './pages/About';
import Services from './pages/Services';
import LinkTree from './pages/LinkTree';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ShortenLinkPage from './pages/ShortenLinkPage';
import RedirectURL from './components/RedirectURL';
import QRGenerate from './components/QRGenerate';
import Return from './components/Return';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="shortenlink"
              element={
                <ProtectedRoute>
                  <ShortenLinkPage />
                </ProtectedRoute>
              }
            />
            <Route path="login/*" element={<Login />} />
            <Route path="register/*" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route
              path="linktree"
              element={
                <ProtectedRoute>
                  <LinkTree />
                </ProtectedRoute>
              }
            />
            <Route
              path="qrgenerate"
              element={
                <ProtectedRoute>
                  <QRGenerate />
                </ProtectedRoute>
              }
            />
            <Route path="pricing" element={<Pricing />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path=":shortId" element={<RedirectURL />} />
            <Route path="payment/session-status/return" element={<Return />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/u">
            <Route path=":username" element={<ProfileCard />} />
          </Route>
        </Routes>
      </ErrorBoundary>
      <ToastContainer
        position="bottom-right"
        autoClose={3200}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="!rounded-xl !border !border-ink/10 !bg-white !text-ink !shadow-float"
      />
    </BrowserRouter>
  );
}

export default App;
