import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Navigationbar from './components/Navigationbar';
import Footer from './components/Footer';

function Layout() {
  return (
    <>
    <Navigationbar/>
    <Outlet />
    <Footer/>
    </>
  )
}

export default Layout