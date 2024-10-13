import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function ProfileCard() {
  const [profile, setProfile] = useState(null); // State to store profile data
  const [loading, setLoading] = useState(true); // Loading state
  const params=useParams();
  const {username}=params;
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/u/`+username); // Adjust the URL and username as needed
        const data = await response.json();
        setProfile(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    
    fetchProfile(); // Fetch profile on component mount
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!profile) {
    return <div className="text-white">No profile data found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src={
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-green-500 mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{profile.username}</h1>
          <p className="text-green font-semibold mb-4">{profile.description}</p>
        </div>
        <div className="flex flex-col items-center space-y-2">
          {/* Map through the socialMediaLinks dynamically */}
          {Object.entries(profile.socialMediaLinks).map(([platform, link]) => (
            <a
              key={platform}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center text-lg font-semibold bg-gray-700 hover:bg-green hover:text-black py-2 rounded-md"
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)} {/* Capitalize platform name */}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
