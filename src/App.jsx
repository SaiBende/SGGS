


import './App.css'

import Register from './components/Register'
import Login from './components/Login'


import ProfileCard from './publicprofile/ProfileCard'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout'
import About from './pages/About'
import Services from './pages/Services'
import LinkTree from './pages/LinkTree'
import Pricing from './pages/Pricing'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import RedirectURL from './components/RedirectURL'
import ShortenLink from './components/ShortenLink'
import QRGenerate from './components/QRGenerate'
import Success from './components/Success'
import Cancel from './components/Cancel'
import Return from './components/Return'
import { ToastContainer } from 'react-toastify';


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<><Home /></>} />
            <Route path="shortenlink" element={<ShortenLink />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="linktree" element={<LinkTree />} />
            <Route path="qrgenerate" element={<QRGenerate />} />


            <Route path="pricing" element={<Pricing />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
            <Route  path=":shortId" element={<RedirectURL/>}/>
            <Route path='payment/session-status/return' element={<Return/>}/>
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
          <Route path='/u'>
            <Route path=":username" element={<ProfileCard />} />
          </Route>
          
          
        </Routes>
        <ToastContainer />
      </BrowserRouter>
      {/* <Navigationbar/>
      <Hero/>
    
      <h1 className="text-3xl font-bold underline text-red-800">
        Hello world!
      </h1>
      <Register/>
      <Login/>
      <InputCardLink/>
      <Footer/>  */}
      {/* <ProfileCard/> */}
    </>
  )
}

export default App
