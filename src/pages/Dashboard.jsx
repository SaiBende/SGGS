import React, { useEffect, useState } from "react";

function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);

        if (token) {
            // Set the token as a cookie
            document.cookie = `token=${token}; path=/;`;

            const requestOptions = {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
                redirect: 'follow',
            };

            fetch("http://localhost:8000/user/dashboard", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setUserData(result);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                    setError("Failed to load user data.");
                    setLoading(false);
                });
        } else {
            setError("No token found. Please log in.");
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold text-center mb-6">User Dashboard</h1>

            {/* User Information */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">User Information</h2>
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Username</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Category</th>
                            <th className="py-3 px-6 text-left">URL Count</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        <tr>
                            <td className="py-3 px-6">{userData.user.username}</td>
                            <td className="py-3 px-6">{userData.user.email}</td>
                            <td className="py-3 px-6">{userData.user.category}</td>
                            <td className="py-3 px-6">{userData.user.urlCount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* URL Information */}
            <div>
                <h2 className="text-xl font-semibold mb-4">URLs</h2>
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Short ID</th>
                            <th className="py-3 px-6 text-left">Redirect URL</th>
                            <th className="py-3 px-6 text-left">Visits</th>
                            <th className="py-3 px-6 text-left">Created At</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {userData.urls.map((url) => (
                            <tr key={url._id}>
                                <td className="py-3 px-6"> <a href={`http://localhost:8000/${url.shortId}`}>
                                    {`http://localhost:8000/${url.shortId}`}
                                </a></td>
                                <td className="py-3 px-6">
                                    <a
                                        href={url.redirectURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {url.redirectURL}
                                    </a>
                                </td>
                                <td className="py-3 px-6">{url.visitHistory.length}</td>
                                <td className="py-3 px-6">
                                    {new Date(url.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
