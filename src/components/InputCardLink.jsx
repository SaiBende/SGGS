import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function InputCardLink() {
    const [longURL, setLongURL] = useState('');
    const [customURL, setCustomURL] = useState('');
    const [loading, setLoading] = useState(false); // State to handle loading
    const [shortenedURL, setShortenedURL] = useState(''); // State to store the shortened URL
    const [error, setError] = useState(null); // State to handle errors
    const [copySuccess, setCopySuccess] = useState(''); // State to handle copy success message

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when request starts
        setError(null);
        setShortenedURL('');
        setCopySuccess('');

        const token = localStorage.getItem('token');
        console.log(token);

        if (token) {
            // Set the token as a cookie
            document.cookie = `token=${token}; path=/`;

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

            const raw = JSON.stringify({
                url: longURL,
                customURL: customURL
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                credentials: 'include', // Include cookies in the request
                redirect: 'follow'
            };

            // Make the request to the server
            fetch(`${import.meta.env.VITE_API_URL}/`, requestOptions)
                .then(response => response.json()) // Convert response to JSON
                .then(result => {
                    setLoading(false); // Stop loading
                    if (result.id) {
                        const newURL = `${import.meta.env.VITE_FRONTEND_URL}/${result.id}`;
                        setShortenedURL(newURL); // Store the shortened URL
                    } else {
                        setError("Failed to generate URL");
                    }
                })
                .catch(error => {
                    setLoading(false);
                    setError('Error: ' + error.message); // Set error if fetch fails
                });
        } else {
            // Redirect to login if token is not found
            window.location.href = "/register";
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortenedURL).then(() => {
            setCopySuccess('URL copied!');
        }).catch(() => {
            setCopySuccess('Failed to copy');
        });
    };

    // Function to download the QR code as an image
    const downloadQRCode = () => {
        const canvas = document.getElementById("qrcode");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <>
            <section className='bg-gray-50 dark:bg-gray-900 p-2'>
                <h2 className="text-3xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl xl:text-3xl dark:text-white p-2">
                    Shorten Your Loooooooooong URL
                </h2>

                <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="longurl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Long URL</label>
                        <input
                            type="text"
                            id="longurl"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your long URL"
                            value={longURL}
                            onChange={(e) => setLongURL(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="custom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter the Custom text for your URL</label>
                        <input
                            type="text"
                            id="customtext"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="customurl.com/yourtext"
                            value={customURL}
                            onChange={(e) => setCustomURL(e.target.value)}
                        />
                    </div>
                    <div className="flex">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-center">
                            Generate the Shorten URL
                        </button>
                    </div>
                </form>

                {/* Loading Spinner */}
                {loading && (
                    <div className="mt-5 flex justify-center items-center">
                        <svg
                            className="animate-spin h-5 w-5 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <p className="mt-5 text-red-600 font-medium text-center">{error}</p>
                )}

                {/* Shortened URL Display with Copy Button */}
                {shortenedURL && (
                    <div className="mt-5 text-center">
                        <p className="text-lg text-gray-900 dark:text-white">Your shortened URL:</p>
                        <div className="flex justify-center items-center">
                            <a
                                href={shortenedURL}
                                className="text-blue-600 dark:text-blue-400 mr-3"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {shortenedURL}
                            </a>
                            <button
                                onClick={copyToClipboard}
                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                            >
                                Copy
                            </button>
                        </div>
                        {copySuccess && (
                            <p className="text-green-600 dark:text-green-400 mt-2">{copySuccess}</p>
                        )}
                    </div>
                )}

                {/* QR Code Generation and Download */}
                {shortenedURL && (
                    <div className="mt-5 flex flex-col items-center">
                        <p className="text-lg text-gray-900 dark:text-white">Your QR code:</p>
                        <QRCodeCanvas
                            id="qrcode"
                            value={shortenedURL}
                            size={200}
                            bgColor={"#ffffff"}
                            fgColor={"#000000"}
                            level={"H"}
                            className=''
                            includeMargin={false}
                        />
                        <button
                            onClick={downloadQRCode}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-3 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                        >
                            Download QR Code
                        </button>
                    </div>

                )}
            </section>
        </>
    );
}

export default InputCardLink;
