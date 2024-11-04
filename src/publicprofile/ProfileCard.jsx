import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProfileCard() {
  const [profile, setProfile] = useState(null); // State to store profile data
  const [loading, setLoading] = useState(true); // Loading state
  const params = useParams();
  const { username } = params;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/u/` + username);
        const data = await response.json();
        console.log(data);
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!profile) {
    return <div className="text-white">No profile data found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
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
    </div>
  );
}

export default ProfileCard;
