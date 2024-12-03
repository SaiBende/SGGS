import React from 'react'

function About() {
  return (
  //   <div style={{ width: '100%', height: '100vh' }}>
  //   <iframe
  //     src="https://saibende.tech"
  //     title="External Website"
  //     style={{ width: '100%', height: '100%', border: 'none' }}
  //   />
  // </div>
    <section className="pt-10 overflow-hidden bg-gray-50 dark:bg-gray-900 md:pt-0 sm:pt-16 2xl:pt-16">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 md:grid-cols-2">

          <div>
            <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">Hey 👋 I
              am 
              <br className="block sm:hidden" /> Sai Bende
            </h2>
            <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:mt-8">
             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde fugiat quae iure! Laborum, aperiam vel aspernatur perspiciatis iste eaque deleniti dolor cumque eligendi magni quae, accusantium suscipit quasi non et delectus maxime.
            </p>

            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 md:mt-8">
              <span className="relative inline-block">
                <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300 dark:bg-gray-900"></span>
                <span className="relative"> Have a question? </span>
              </span>
              <br className="block sm:hidden" />Ask me on <a href="https://saibende.tech" title=""
                className="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline">saibende.tech</a>
            </p>
          </div>

          <div className="relative">
            <img className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg" alt="" />

            <img className="relative w-80 h-auto xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src="https://res.cloudinary.com/sggs/image/upload/v1733195387/user_profile_photos/Firefly_20231020202317-nobg1_e52pal.png" alt="" />
          </div>

        </div>
      </div>
    </section>
  )
}

export default About