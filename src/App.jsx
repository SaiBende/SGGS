
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
import LinkTree from './pages/LinkTree'
import Pricing from './pages/Pricing'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import RedirectURL from './components/RedirectURL'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<><Home /></>} />
            <Route path="inputlink" element={<InputCardLink />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="linktree" element={<LinkTree />} />

            <Route path="pricing" element={<Pricing />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route  path=":shortId" element={<RedirectURL/>}/>
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
          <Route path='/u'>
            <Route path=":username" element={<ProfileCard />} />
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
