import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from 'qrcode.react';
import { Link } from "react-router-dom";
import VisitTrends from "../components/VisitTrends";
import { Line } from "react-chartjs-2"; // Import Line graph from react-chartjs-2
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


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

    const [visitHistory, setVisitHistory] = useState([]);
    const [activeGraphId, setActiveGraphId] = useState(null); // Track active graph

    const fetchAnalysis = async (shortId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("No token found. Please log in.");
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/${shortId}/status`, requestOptions);
            const result = await response.json();
            if (response.ok) {
                setVisitHistory(result.visitHistory); // Set visit history data for the graph
                setActiveGraphId(shortId); // Set the active graph ID
                //alert("Fetched visitor analysis!");
            } else {
                console.error(result);
                alert("Failed to fetch analysis.");
            }
        } catch (error) {
            console.error("Error fetching analysis:", error);
            alert("An error occurred while fetching analysis.");
        }
    };
    const closeGraph = () => {
        setActiveGraphId(null); // Hide the active graph
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <section className=" bg-white dark:bg-gray-900 dark:text-white">
            <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">User Dashboard with {userData.user.category} Category</h1>
                <span>To Upgrade </span><Link className="text-blue-500 text-sm" to='/pricing'>click here</Link>
                {/* User Information */}
                <div className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">User Information</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full dark:bg-gray-900 dark:text-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Username</th>
                                    <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Email</th>
                                    <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Category</th>
                                    <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">URL Count</th>
                                </tr>
                            </thead>
                            <tbody className="text-black dark:text-white ">
                                <tr>
                                    <td className="py-2 sm:py-3 px-4 sm:px-6">{userData.user.username}</td>
                                    <td className="py-2 sm:py-3 px-4 sm:px-6">{userData.user.email}</td>
                                    <td className="py-2 sm:py-3 px-4 sm:px-6">{userData.user.category}</td>
                                    <td className="py-2 sm:py-3 px-4 sm:px-6">{userData.user.urlCount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* URL Information */}
                <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">URLs</h2>
                    <div className="overflow-x-auto">
                        <table className=" bg-white shadow-md rounded-lg border-collapse border border-white">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Short ID</th>
                                    <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Redirect URL</th>
                                    <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Visits</th>
                                    <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Created At</th>
                                    <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">QR Codes</th>
                                    <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="dark:bg-gray-900 dark:text-white  ">
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
                                        <td className="py-2 sm:py-3 px-4 sm:px-6">
                                            <button
                                                onClick={() => fetchAnalysis(url.shortId)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                View Analysis
                                            </button>
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div> {activeGraphId && (
                    <div className="mt-6">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">Visit Trends for {activeGraphId}</h3>
                        <VisitTrends visitHistory={visitHistory} />
                        <button
                            onClick={closeGraph}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Close Graph
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Dashboard;
