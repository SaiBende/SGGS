

// import React from 'react' 


// function Pricing() {
//   const plans = [
//     { 
//       title: 'Basic',
//       price: 29,
//       description: 'Best option for personal use & for your next project.',
//       features: [
//         'Individual configuration',
//         'No setup, or hidden fees',
//         'Team size: 1 developer',
//         'Premium support: 6 months',
//         'Free updates: 6 months',
//       ],
//       cta: 'Get started',
//     },
//     { 
//       title: 'Standard',
//       price: 99,
//       description: 'Relevant for multiple users, extended & premium support.',
//       features: [
//         'Individual configuration',
//         'No setup, or hidden fees',
//         'Team size: 10 developers',
//         'Premium support: 24 months',
//         'Free updates: 24 months',
//       ],
//       cta: 'Get started',
//     },
//     { 
//       title: 'Premium',
//       price: 499,
//       description: 'Best for large scale uses and extended redistribution rights.',
//       features: [
//         'Individual configuration',
//         'No setup, or hidden fees',
//         'Team size: 100+ developers',
//         'Premium support: 36 months',
//         'Free updates: 360 months',
//       ],
//       cta: 'Get started',
//     },
//   ]
  
//   return (
//     <>
//       <section className="bg-white dark:bg-gray-900">
//         <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
//           <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
//             <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for business teams like yours</h2>
//             <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
//           </div>
//           <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            

//             {plans.map((plan, index) => (

//             <div key={index} className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
//               <h3 className="mb-4 text-2xl font-semibold">
//                 {plan.title}
//               </h3>
//               <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{plan.description}</p>
//               <div className="flex justify-center items-baseline my-8">
//                 <span className="mr-2 text-5xl font-extrabold">{plan.price} Rs</span>
//                 {/* <span className="text-gray-500 dark:text-gray-400"></span> */}
//               </div>
              
//               <ul role="list" className="mb-8 space-y-4 text-left">
//                 {plan.features.map((feature, index) => (
//                 <li key={index}className="flex items-center space-x-3">
                  
//                   <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                   <span>{feature}</span>
            
//                 </li>
                
//                 ))}
               
//               </ul>
//               <button className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Buy Now</button>
//             </div>)
//             )} 

             
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

// export default Pricing



import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function Pricing() {
  const plans = [
    {
      title: 'Basic',
      price: 29,
      description: 'Best option for personal use & for your next project.',
      features: [
        'Individual configuration',
        'No setup, or hidden fees',
        'Team size: 1 developer',
        'Premium support: 6 months',
        'Free updates: 6 months ',
        
      ],
      cta: 'Get started',
    },
    {
      title: 'Standard',
      price: 99,
      description: 'Relevant for multiple users, extended & premium support.',
      features: [
        'Individual configuration',
        'No setup, or hidden fees',
        'Team size: 10 developers',
        'Premium support: 24 months',
        'Free updates: 24 months',
      ],
      cta: 'Get started',
    },
    {
      title: 'Premium',
      price: 499,
      description: 'Best for large scale uses and extended redistribution rights.',
      features: [
        'Individual configuration',
        'No setup, or hidden fees',
        'Team size: 100+ developers',
        'Premium support: 36 months',
        'Free updates: 36 months',
      ],
      cta: 'Get started',
    },
  ];

  const handleBuyNow = async (plan) => {
    try {
      // Create a checkout session by making a POST request to the backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/payment/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName: plan.title,
          price: plan.price,
        }),
      });

      const session = await response.json();
      if (session.error) {
        throw new Error(session.error);
      }

      // Load Stripe and redirect to checkout
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error('Error redirecting to Stripe Checkout:', error);
      alert('Something went wrong! Please try again.');
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Designed for business teams like yours
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
            </p>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
              >
                <h3 className="mb-4 text-2xl font-semibold">{plan.title}</h3>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                  {plan.description}
                </p>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">{plan.price} Rs</span>
                </div>
                <ul role="list" className="mb-8 space-y-4 text-left">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleBuyNow(plan)}
                  className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Pricing;
