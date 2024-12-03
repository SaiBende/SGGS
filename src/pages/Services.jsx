import React from 'react'
import QRGenerate from '../components/QRGenerate'
import { useState } from 'react';
import ShortenLink from '../components/ShortenLink';

import { Link } from 'react-router-dom';


function Services() {
  const [selectedComponent, setSelectedComponent] = useState('shorten'); 
  return (
    <>
      {/* <QRGenerate/> */}
      <section className='bg-gray-50 dark:bg-gray-900 '>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setSelectedComponent('shorten')}
            className={`px-4 py-2 text-white rounded-lg flex items-center space-x-2 ${selectedComponent === 'shorten' ? 'bg-blue-600' : 'bg-gray-400'}`}
          >
            <span>Shorten Link</span>
            <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/FFFFFF/link--v1.png" alt="link--v1" />
          </button>
          <button
            onClick={() => setSelectedComponent('qr')}
            className={`px-4 py-2 text-white rounded-lg flex items-center space-x-2 ${selectedComponent === 'qr' ? 'bg-blue-600' : 'bg-gray-400'}`}
          >
            <span>Generate QR Code</span>
            <img width="24" height="24" src="https://img.icons8.com/ios/50/FFFFFF/qr-code--v1.png" alt="qr-code--v1" />
          </button>
          <button className='px-4 py-2 text-white rounded-lg flex items-center space-x-2 bg-gray-400'>
            <Link to='/linktree'> <span>Personalized LinkTree</span></Link>
           
            {/* <img width="24" height="24"  alt="linktree" /> */}
          </button>
        </div>


        <div className="flex justify-center ">
          {selectedComponent === 'shorten' && <ShortenLink />}
          {selectedComponent === 'qr' && <QRGenerate />}
        </div>
      </section>
    </>
  )
}

export default Services