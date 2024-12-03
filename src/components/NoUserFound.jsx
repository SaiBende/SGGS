import React from 'react'

function NoUserFound() {
  return (
    <>
        <h1 className="text-3xl font-bold underline text-red-800">
            No user found!  On this username
        </h1>
        <p>Go to Home and Create Your Account</p>
        <Link to='/'>SGGS</Link>
    
    </>
  )
}

export default NoUserFound