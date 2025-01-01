import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <svg
            className="w-20 h-20 mx-auto text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Payment Successful!
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Thank you for your purchase. A confirmation email has been sent to{' '}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              
            </span>.
          </p>
          <Link
            to="/dashboard"
            className="inline-block px-4 py-2 mt-6 text-sm font-medium text-white bg-green-500 rounded-lg shadow hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Success;
