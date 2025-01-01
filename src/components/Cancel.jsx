import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <svg
            className="w-20 h-20 mx-auto text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.707 4.293a1 1 0 00-1.414 1.414L8.586 9l-3.293 3.293a1 1 0 001.414 1.414L10 10.414l3.293 3.293a1 1 0 001.414-1.414L11.414 9l3.293-3.293a1 1 0 00-1.414-1.414L10 7.586 6.707 4.293z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Payment Canceled
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            It looks like you canceled the payment process. If this was an
            error, you can try again.
          </p>
          <Link
            to="/pricing"
            className="inline-block px-4 py-2 mt-6 text-sm font-medium text-white bg-red-500 rounded-lg shadow hover:bg-red-600 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
          >
            Try Again
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cancel;
