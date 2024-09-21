
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigationbar from './components/Navigationbar'
import Register from './components/Register'
import Login from './components/Login'
import InputCardLink from './components/InputCardLink'
import Hero from './components/Hero'
import Footer from './components/Footer'
import ProfileCard from './publicprofile/ProfileCard'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'
import Dashboard from './pages/Dashboard'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<><Hero /><InputCardLink/></>} />
            <Route path="inputlink" element={<InputCardLink/>} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="dashboard" element={<Dashboard />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
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
