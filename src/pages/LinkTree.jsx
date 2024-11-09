import React, { useState, useEffect } from 'react';

function LinkTree() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [socialMediaLinks, setSocialMediaLinks] = useState({});
    const [description, setDescription] = useState('');  // State for user description
    const [newPlatform, setNewPlatform] = useState('');
    const [newLink, setNewLink] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');


    // New state for profile photo
    const [profilephoto, setProfilephoto] = useState(null);
    const[profilephotoUrl, setProfilephotoUrl] = useState(null);

    // Fetch user data using the JWT token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            document.cookie = `token=${token}; path=/;`;
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                credentials: 'include',
                redirect: 'follow',
            };

            fetch(`${import.meta.env.VITE_API_URL}/user/dashboard`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.success) {
                        console.log(result.user);
                        setUser(result.user);
                        setUsername(result.user.username);
                        setProfilephotoUrl(result.user.profilephoto);
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
                    setDescription(data.description || ''); // Load existing description if available
                    
                    setError(null); // Clear any previous errors
                }
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
                setError('Unable to load user profile.');
            });
    };



      // Function to handle profile photo selection
    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        setProfilephoto(file);
    };

    // Function to upload profile photo
    const uploadProfilePhoto = () => {
        if (!profilephoto) {
            setError('Please select a photo to upload.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in to upload your profile photo.');
            return;
        }

        const formData = new FormData();
        formData.append('profilephoto', profilephoto);

        const requestOptions = {
            method: 'POST',
            headers: {
                "Authorization": token,
            },
            body: formData,
            credentials: 'include',
            redirect: 'follow',
        };

        fetch(`${import.meta.env.VITE_API_URL}/u/${username}/updateprofilephoto`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    setSuccessMessage('Profile photo uploaded successfully.');
                    // Optionally update the user object to reflect the new photo
                    setUser((prevUser) => ({
                        ...prevUser,
                        profilephoto: result.profilephotoUrl,
                    }));
                    setProfilephotoUrl(result.user.profilephoto);
                   //console.log(profilephotoUrl);
                } else {
                    setError(result.error || 'Failed to upload profile photo.');
                }
            })
            .catch((error) => {
                console.error('Error uploading profile photo:', error);
                setError(error.message || 'Failed to upload profile photo.');
            });
    };

    // Add a new social media link
    const addSocialMediaLink = (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in to add social media links.');
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append("Authorization", token);

        const requestBody = JSON.stringify({
            platform: newPlatform,
            link: newLink,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: requestBody,
            credentials: 'include',
            redirect: 'follow',
        };

        fetch(`${import.meta.env.VITE_API_URL}/u/${username}/social-media/add`, requestOptions)
            .then((response) => response.json())
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

    // Delete a social media link
    const deleteSocialMediaLink = (platform) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in to delete social media links.');
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append("Authorization", token);

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

    // Update user description
    const updateDescription = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in to update the description.');
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append("Authorization", token);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({ description }),
            credentials: 'include',
            redirect: 'follow',
        };

        fetch(`${import.meta.env.VITE_API_URL}/u/${username}/description`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    setSuccessMessage('Description updated successfully.');
                } else {
                    setError(result.error || 'Failed to update description.');
                }
            })
            .catch((error) => {
                console.error('Error updating description:', error);
                setError(error.message || 'Failed to update description.');
            });
    };

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <h2 className="text-xl text-center font-bold text-gray-900 dark:text-white">Public Profile</h2>

            {error && <p className="text-red-600 text-center">{error}</p>}
            {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

            <div className="max-w-md mx-auto bg-white p-4 rounded shadow-md dark:bg-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{user?.username || "Your UserName"}'s Profile</h3>

                 {/* Profile Photo Upload Section */}
                 <div className="mb-4">
                    {profilephotoUrl ? (
                        <img
                            src={`${profilephotoUrl}`}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mx-auto mb-2"
                        />
                    ) : (
                        <p className="text-center text-gray-500">No profile photo</p>
                    )}
                    <input type="file" accept="image/*" onChange={handleProfilePhotoChange} />
                    <button
                        onClick={uploadProfilePhoto}
                        className="bg-blue-600 text-white p-2 rounded w-full mt-2"
                    >
                        Upload Profile Photo
                    </button>
                </div>

                {/* Description Section */}
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a description about yourself"
                    className="w-full p-2 border rounded mb-2"
                />
                <button
                    onClick={updateDescription}
                    className="bg-blue-600 text-white p-2 rounded w-full"
                >
                    Update Description
                </button>

                {/* Social Media Links */}
                <ul className="mt-4">
                    {Object.entries(socialMediaLinks).map(
                        ([platform, link]) =>
                            link && (
                                <li
                                    key={platform}
                                    className="flex flex-col md:flex-row md:justify-between items-start md:items-center my-2"
                                >
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 break-all md:truncate w-full md:max-w-md"
                                    >
                                        {platform}: {link}
                                    </a>
                                    <button
                                        onClick={() => deleteSocialMediaLink(platform)}
                                        className="bg-red-600 text-white p-2 rounded mt-2 md:mt-0 md:ml-4"
                                    >
                                        Delete
                                    </button>
                                </li>
                            )
                    )}
                </ul>

                {/* Form to Add New Social Media Link */}
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
