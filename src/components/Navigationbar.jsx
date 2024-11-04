import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navigationbar() {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [error, setError] = useState(null); // State to store error messages
    const navigate = useNavigate();
    const location = useLocation(); // For active link highlighting

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                // document.cookie = `token=${token}; path=/;`;

                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", token);
                // myHeaders.append("Access-Control-Allow-Credentials", true);

                const requestOptions = {
                  
                    method: 'POST',
                    // credentials: 'include',
                    headers: myHeaders,
                    redirect: 'follow',
                };

                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/isauth`, requestOptions);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const result = await response.json();
                    console.log(result);
                    if (result.success) {
                        setUser(result.user.email);
                    } else {
                        console.error('Error fetching user data:', result.error);
                        setError(result.error || 'Error fetching user data.');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setError(error.message || 'Error fetching user data.');
                }
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SGGS URLS</span>
                </a>

                <button 
                    onClick={toggleMenu} 
                    className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                    aria-controls="navbar-menu" 
                    aria-expanded={isMenuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>

                <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto`} id="navbar-menu">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li>
                            <Link 
                                to="/" 
                                className={`block py-2 px-3 rounded md:bg-transparent ${location.pathname === '/' ? 'text-blue-700' : 'text-gray-900 hover:bg-gray-100'} dark:text-white md:dark:hover:text-blue-500`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/about" 
                                className={`block py-2 px-3 rounded md:bg-transparent ${location.pathname === '/about' ? 'text-blue-700' : 'text-gray-900 hover:bg-gray-100'} dark:text-white md:dark:hover:text-blue-500`}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/services" 
                                className={`block py-2 px-3 rounded md:bg-transparent ${location.pathname === '/services' ? 'text-blue-700' : 'text-gray-900 hover:bg-gray-100'} dark:text-white md:dark:hover:text-blue-500`}
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/pricing" 
                                className={`block py-2 px-3 rounded md:bg-transparent ${location.pathname === '/pricing' ? 'text-blue-700' : 'text-gray-900 hover:bg-gray-100'} dark:text-white md:dark:hover:text-blue-500`}
                            >
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/linktree" 
                                className={`block py-2 px-3 rounded md:bg-transparent ${location.pathname === '/linktree' ? 'text-blue-700' : 'text-gray-900 hover:bg-gray-100'} dark:text-white md:dark:hover:text-blue-500`}
                            >
                                LinkTree
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="md:flex md:items-center">
                    {user ? (
                        <div className="flex items-center">
                            <Link to="/dashboard">
                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Welcome {user}
                                </button>
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Login
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Register
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            {error && <div className="text-red-600 text-center mt-4">{error}</div>} {/* Display error message */}
        </nav>
    );
}

export default Navigationbar;