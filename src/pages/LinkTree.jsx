import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function LinkTree() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [socialMediaLinks, setSocialMediaLinks] = useState({});
    const [description, setDescription] = useState('');  // State for user description
    const [newPlatform, setNewPlatform] = useState('');
    const [newLink, setNewLink] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [isauthorized, setAuthorized] = useState(true);
    const [profile, setProfile] = useState(null);


    // New state for profile photo
    const [profilephoto, setProfilephoto] = useState(null);
    const [profilephotoUrl, setProfilephotoUrl] = useState(null);
    const navigate = useNavigate();

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
                        //console.log(result.user);
                        setUser(result.user);
                        setUsername(result.user.username);
                        setProfilephotoUrl(result.user.profilephoto);
                        fetchUserProfile(result.user.username);
                        // fetchprofile(result.user.username);
                        setAuthorized(true);
                    } else {
                        setError(result.error || 'Error fetching user data.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    setError('Error fetching user data.');
                });
        }
        else {
            //i want to show the error for some time then redirect ot log in page

            setAuthorized(false);

        }

    }, []);

    // Fetch the public profile data of the user
    const fetchUserProfile = async (username) => {
        await fetch(`${import.meta.env.VITE_API_URL}/u/${username}`)
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

    const fetchprofile = async (username) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/u/` + username);
            const data = await response.json();
            console.log(data);
            setProfile(data);
            //setLoading(false);

        } catch (error) {
            console.error("Error fetching profile:", error);

        }
    }

    const handleprofile = () => {
        fetchprofile(username);
    }




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
                    toast.success('Profile photo uploaded successfully.');
                    // Optionally update the user object to reflect the new photo
                    setUser((prevUser) => ({
                        ...prevUser,
                        profilephoto: result.profilephotoUrl,
                    }));
                    setProfilephotoUrl(result.user.profilephoto);
                    //console.log(profilephotoUrl);
                } else {
                    setError(result.error || 'Failed to upload profile photo.');
                    toast.error(result.error || 'Failed to upload profile photo.');
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
            toast.error('Please log in to add social media links.');
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
                    toast.success(`${newPlatform} link added successfully.`);
                } else {
                    setError(result.error || 'Failed to add social media link.');
                    toast.error(result.error || 'Failed to add social media link.');
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
                        toast.error(error.error || 'Failed to delete social media link.');
                        throw new Error(error.error || 'Failed to delete social media link.');
                    });
                }
            
                return response.json();
            })
            .then((result) => {
                if (result.success) {
                    setSocialMediaLinks(result.socialMediaLinks);
                    setSuccessMessage(`${platform} link deleted successfully.`);
                    toast.success(`${platform} link deleted successfully.`);
                } else {
                    setError(result.error || 'Failed to delete social media link.');
                    toast.error(result.error);
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
                    toast.success("Description updated successfully.");
                } else {
                    setError(result.error || 'Failed to update description.');
                    toast.error(result.error || 'Failed to update description.');
                }
            })
            .catch((error) => {
                console.error('Error updating description:', error);
                setError(error.message || 'Failed to update description.');
            });
    };

    const profileUrl = `${import.meta.env.VITE_FRONTEND_URL}/u/${username}`;
    const copyToClipboard = () => {
        navigator.clipboard.writeText(profileUrl)
            .then(() => {
                alert('URL copied to clipboard!');
                toast.success('URL copied to clipboard!');
            })
            .catch(err => console.error('Failed to copy URL: ', err));
    };

    if (!isauthorized) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
                <div className="p-4 bg-white dark:bg-gray-900 min-h-screen">
                    <h2 className="text-xl text-center font-bold text-gray-900 dark:text-white">Public Profile</h2>
                    <p className="text-center text-gray-500 dark:text-white">Please log in to access this page.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-blue-600 text-white p-2 rounded w-full mt-2"
                    >
                        Log In
                    </button>
                </div>
            </div>
        );
    }
    return (


        
        <section className='bg-white dark:bg-gray-900  flex flex-col md:flex-row md:space-x-4 justify-evenly'>
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
            <div className='text-white p-4'>
                <h2 className='text-2xl text-center font-bold text-gray-900 dark:text-white'>Your Profile URL</h2>
                <p className='text-xl text-gray-900 dark:text-white'>Share this URL to let others access your profile:</p>
               
                <div className="flex items-center space-x-2">
                    
                    <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {profileUrl}
                    </a>
                    <button
                        onClick={copyToClipboard}
                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Copy URL
                    </button>
                </div>



                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleprofile}>Preview & Refresh</button>

                {profile && <div className="min-h-screen bg-black text-white flex items-center justify-center">
                    <div className="w-full max-w-md bg-black p-6 rounded-lg shadow-lg">
                        <div className="flex flex-col items-center">
                            <img
                                src={`${profile.profilephoto}`}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-green-500 mb-4"
                            />
                            <h1 className="text-3xl font-bold mb-2">{profile.username}</h1>
                            <p className="text-green font-semibold mb-4">{profile.description}</p>
                        </div>

                        <div className="flex flex-col items-center space-y-4">
                            {/* Apply the gradient button style to each social media link */}
                            {Object.entries(profile.socialMediaLinks).map(([platform, link]) => (
                                <div className="relative inline-flex group w-full" key={platform}>
                                    <div
                                        className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-md blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"
                                    ></div>
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative inline-flex items-center justify-center w-full py-2 text-lg font-semibold text-white transition-all duration-200 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                    >
                                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}





            </div>

        </section>
        

    );
}

export default LinkTree;
