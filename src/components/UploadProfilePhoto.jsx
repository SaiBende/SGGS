import React, { useState } from 'react';

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);

    // Handler to update the selected file
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Function to handle file upload
    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }

        // Create a FormData object
        const formData = new FormData();
        formData.append('file', selectedFile); // 'file' is the key for the file

        try {
            // Make the fetch request
            const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
                method: 'POST',
                body: formData,
                // Do NOT set the Content-Type header explicitly; it will be set automatically
                credentials: 'include', // Include credentials if needed
            });

            // Handle the response
            const result = await response.json();
            if (response.ok) {
                alert('File uploaded successfully.');
            } else {
                alert(`Error: ${result.message || 'Failed to upload file.'}`);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file.');
        }
    };

    return (
        <div>
            <h2>File Upload</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload File</button>
        </div>
    );
}

export default FileUpload;
