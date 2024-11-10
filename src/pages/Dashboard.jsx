import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from 'qrcode.react';

function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);

        if (token) {
            // document.cookie = `token=${token}; path=/;`;
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
            // myHeaders.append("Access-Control-Allow-Origin", "localhost:8000");

            const requestOptions = {

                method: 'POST',
                credentials: 'include', // Include cookies in the request
                redirect: 'follow',
                headers: myHeaders,

            };

            fetch(`${import.meta.env.VITE_API_URL}/user/dashboard`, requestOptions)
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
        <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">User Dashboard</h1>

            {/* User Information */}
            <div className="mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">User Information</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Username</th>
                                <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Email</th>
                                <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Category</th>
                                <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">URL Count</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            <tr>
                                <td className="py-2 sm:py-3 px-4 sm:px-6">{userData.user.username}</td>
                                <td className="py-2 sm:py-3 px-4 sm:px-6">{userData.user.email}</td>
                                <td className="py-2 sm:py-3 px-4 sm:px-6">{userData.user.category}</td>
                                <td className="py-2 sm:py-3 px-4 sm:px-6">{userData.user.urlCount}/10</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* URL Information */}
            <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">URLs</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Short ID</th>
                                <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Redirect URL</th>
                                <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Visits</th>
                                <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Created At</th>
                                <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">QR Codes</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {userData.urls.map((url) => (
                                <tr key={url._id}>
                                    <td className="py-2 sm:py-3 px-4 sm:px-6">
                                        <a href={`${import.meta.env.VITE_FRONTEND_URL}/${url.shortId}`} className="text-blue-500 hover:underline">
                                            {`${import.meta.env.VITE_FRONTEND_URL}/${url.shortId}`}
                                        </a>
                                    </td>
                                    <td className="py-2 sm:py-3 px-4 sm:px-6">
                                        <a
                                            href={url.redirectURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {url.redirectURL}
                                        </a>
                                    </td>
                                    <td className="py-2 sm:py-3 px-4 sm:px-6">{url.visitHistory.length}</td>
                                    <td className="py-2 sm:py-3 px-4 sm:px-6">
                                        {new Date(url.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 sm:py-3 px-4 sm:px-6">
                                        <QRCodeCanvas
                                            id="qrcode"
                                            value={`${import.meta.env.VITE_FRONTEND_URL}/${url.shortId}`}
                                            size={128}
                                            bgColor={"#ffffff"}
                                            fgColor={"#000000"}
                                            level={"H"}
                                            className=''
                                            imageSettings={{
                                                src: "https://res.cloudinary.com/sggs/image/upload/v1731136210/user_profile_photos/logo_yqftnr.png",
                                                x: undefined,
                                                y: undefined,
                                                height: 24,
                                                width: 24,
                                                opacity: 1,
                                                excavate: true,
                                            }}
                                            includeMargin={false}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
