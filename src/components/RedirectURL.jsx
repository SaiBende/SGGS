import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RedirectURL() {
  const { shortId } = useParams();

  useEffect(() => {
    const fetchRedirectURL = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${shortId}`);
        if (response.ok) {
          const data = await response.json();
          window.location.href = data.redirectURL;
        } else {
          console.error('Failed to fetch redirect URL');
        }
      } catch (error) {
        console.error('Error fetching redirect URL:', error);
      }
    };

    fetchRedirectURL();
  }, [shortId]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}

export default RedirectURL;