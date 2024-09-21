import React from 'react'

function ProfileCard() {
  return (
    <>    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center"> {/* Center content horizontally and vertically */}
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg"> {/* Removed margin classes */}
        <div className="flex flex-col items-center">
          {/* <img
            src={}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-green-500 mb-4"
          /> */}
          <h1 className="text-3xl font-bold mb-2">Jessica Randall</h1>
          <p className="text-green font-semibold mb-4">London, United Kingdom</p>
          <p className="text-[#eee] mb-4">
            &quot;Front-end developer and avid reader.&quot;
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <a
            href="#"
            className="w-full text-center text-lg font-semibold bg-gray-700 hover:bg-green hover:text-black py-2 rounded-md"
          >
            GitHub
          </a>
          <a
            href="#"
            className="w-full text-center text-lg font-semibold bg-gray-700 hover:bg-green hover:text-black py-2 rounded-md"
          >
            Frontend Mentor
          </a>
          <a
            href="#"
            className="w-full text-center text-lg font-semibold bg-gray-700 hover:bg-green hover:text-black py-2 rounded-md"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="w-full text-center text-lg font-semibold bg-gray-700 hover:bg-green hover:text-black py-2 rounded-md"
          >
            Twitter
          </a>
          <a
            href="#"
            className="w-full text-center text-lg font-semibold bg-gray-700 hover:bg-green hover:text-black py-2 rounded-md"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProfileCard