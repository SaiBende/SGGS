import React, { useState, useEffect } from 'react';

function LinkTree() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [socialMediaLinks, setSocialMediaLinks] = useState({});
    
    const [newPlatform, setNewPlatform] = useState('');
    const [newLink, setNewLink] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    
    

    // Fetch user data using the JWT token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            document.cookie = `token=${token}; path=/;`;

            const requestOptions = {
                method: 'POST',
                credentials: 'include',
                redirect: 'follow',
            };

            fetch(`${import.meta.env.VITE_API_URL}/user/dashboard`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.success) {
                        setUser(result.user);
                        setUsername(result.user.username);
                        fetchUserProfile(result.user.username);
                    } else {
                        setError(result.error || 'Error fetching user data.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    setError('Error fetching user data.');
                });
        }
    }, []);

    // Fetch the public profile data of the user
    const fetchUserProfile = (username) => {
       
        fetch(`${import.meta.env.VITE_API_URL}/u/${username}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setSocialMediaLinks(data.socialMediaLinks || {});
                  
                    setError(null); // Clear any previous errors
                }
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
                setError('Unable to load user profile.');
            });
    };

    // Add a new social media link
    const addSocialMediaLink = (e) => {
        e.preventDefault();
        setError(null); // Clear any previous error messages
        setSuccessMessage(''); // Clear any previous success messages

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in to add social media links.');
            return;
        }

        // Set up headers as done in Postman
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Cookie', `token=${token}`);

        const requestBody = JSON.stringify({
            platform: newPlatform,
            link: newLink,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: requestBody,
            credentials: 'include', // Include cookies in the request
            redirect: 'follow',
        };

        fetch(`${import.meta.env.VITE_API_URL}/u/${username}/social-media/add`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((error) => {
                        throw new Error(error.error || 'Failed to add social media link.');
                    });
                }
                return response.json();
            })
            .then((result) => {
                if (result.success) {
                    setSocialMediaLinks(result.socialMediaLinks);
                    setNewPlatform('');
                    setNewLink('');
                    setSuccessMessage(`${newPlatform} link added successfully.`);
                } else {
                    setError(result.error || 'Failed to add social media link.');
                }
            })
            .catch((error) => {
                console.error('Error adding social media link:', error);
                setError(error.message || 'Failed to add social media link.');
            });
    };
    const deleteSocialMediaLink = (platform) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in to delete social media links.');
            return;
        }
    
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Cookie', `token=${token}`);
    
        const requestBody = JSON.stringify({ platform });
    
        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: requestBody,
            credentials: 'include',
            redirect: 'follow',
        };
    
        fetch(`${import.meta.env.VITE_API_URL}/u/${username}/social-media/delete`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((error) => {
                        throw new Error(error.error || 'Failed to delete social media link.');
                    });
                }
                return response.json();
            })
            .then((result) => {
                if (result.success) {
                    setSocialMediaLinks(result.socialMediaLinks);
                    setSuccessMessage(`${platform} link deleted successfully.`);
                } else {
                    setError(result.error || 'Failed to delete social media link.');
                }
            })
            .catch((error) => {
                console.error('Error deleting social media link:', error);
                setError(error.message || 'Failed to delete social media link.');
            });
    };

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 min-h-screen">
            <h2 className="text-xl text-center font-bold text-gray-900 dark:text-white">Public Profile</h2>

            {error && <p className="text-red-600 text-center">{error}</p>}
            {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

            <div className="max-w-md mx-auto bg-white p-4 rounded shadow-md dark:bg-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{user?.username}'s Social Media Links</h3>
                <ul>
                    {Object.entries(socialMediaLinks).map(
                        ([platform, link]) =>
                            link && (
                                <li key={platform} className="flex justify-between items-center my-2">
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400"
                                    >
                                        {platform}: {link}
                                    </a>
                                    <button
                                        onClick={() => deleteSocialMediaLink(platform)}
                                        className="text-red-500 ml-4"
                                    >
                                        Delete
                                    </button>
                                </li>
                            )
                    )}
                </ul>

                <form onSubmit={addSocialMediaLink} className="mt-4">
                    <input
                        type="text"
                        placeholder="Platform"
                        value={newPlatform}
                        onChange={(e) => setNewPlatform(e.target.value)}
                        className="mb-2 p-2 border rounded w-full"
                        required
                    />
                    <input
                        type="url"
                        placeholder="Link"
                        value={newLink}
                        onChange={(e) => setNewLink(e.target.value)}
                        className="mb-2 p-2 border rounded w-full"
                        required
                    />
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
                        Add Social Media Link
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LinkTree;
