import  { useState, useEffect } from 'react';
import {  Navigate,Link } from 'react-router-dom';



 function Return() {
  const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
  
    useEffect(() => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get('session_id');
  
        fetch(`${import.meta.env.VITE_API_URL}/payment/session-status?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setStatus(data.status);
          setCustomerEmail(data.customer_email);
        });
    }, []);
  
    if (status === 'open') {
      return (
        <Navigate to="/pricing" />
      )
    }
  
    if (status === 'complete') {
      return (
        <section id="success" className="container dark:text-white bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
          <p>
            Payment successful! Thank you for your purchase.
            We appreciate your business! A confirmation email will be sent to {customerEmail}.
  
            If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
            
          </p>
          <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <Link to='/dashboard'>Dashboard</Link>
          </button>
        </section>
      )
    }
  
    return null;
}

export default Return

  export { Return };