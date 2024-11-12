import React, { useState } from 'react';
import Hero from '../components/Hero';
import ShortenLink from '../components/ShortenLink';
import QRGenerate from '../components/QRGenerate'; // Assuming this is the QR component you want
import ProductCard from '../components/ProductCard';
import Featured from '../components/Featured';
import SocialProof from '../components/SocialProof';

import ShortImg from '../assets/short-link-card-opt.png';
import QRCode from '../assets/qr-code-card-opt.png';
import LinkTreeImg from '../assets/pages-card-opt.png';

function Home() {
  const [selectedComponent, setSelectedComponent] = useState('shorten'); // New state to control the component display

  const productImages = [ShortImg, QRCode, LinkTreeImg];
  const titles = ["URL Shortener", "QR Code Generator", "Personalized Pages/LinkTree"];
  const descriptions = [
    "Shorten your long URL to a short one with our URL Shortener. It's fast and easy to use.",
    "Generate QR Codes for your website, social media, and more with our QR Code Generator.",
    "Create a personalized page with all your social media links in one place with our LinkTree alternative."
  ];

  return (
    <>
      <Hero />
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
        </div>


        <div className="flex justify-center ">
          {selectedComponent === 'shorten' && <ShortenLink />}
          {selectedComponent === 'qr' && <QRGenerate />}
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Great Connections Start with a Click or Scan
            </h2>
            <p className="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              All the products you need to build brand connections, manage links and QR Codes, and connect with audiences everywhere, in a single unified platform.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <a href="#" className="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Get started
              </a>
              <a href="#" className="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                </svg>
                View more
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center bg-white dark:bg-gray-900 gap-2">
          {productImages.map((img, index) => (
            <ProductCard key={index} img={img} title={titles[index]} description={descriptions[index]} />
          ))}
        </div>
      </section>

      <Featured />
      <SocialProof />
    </>
  );
}

export default Home;
