import { useState, useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';

function QRCodeGenerator() {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState("Title for my QR Code");
    const [size, setSize] = useState(128);
    const [bgColor, setBgColor] = useState("#ffffff");
    const [fgColor, setFgColor] = useState("#000000");
    const [level, setLevel] = useState("L");
    const [logoSrc, setLogoSrc] = useState(null);
    const [logoWidth, setLogoWidth] = useState(24);
    const [logoHeight, setLogoHeight] = useState(24);
    const [logoOpacity, setLogoOpacity] = useState(1);
    const [removeQrCodeBehindLogo, setRemoveQrCodeBehindLogo] = useState(false);
    const [logoPadding, setLogoPadding] = useState(0);
    const [logoPaddingStyle, setLogoPaddingStyle] = useState("square");
    const [qrStyle, setQrStyle] = useState("squares");
    const [quietZone, setQuietZone] = useState(10);
    const [enableCORS, setEnableCORS] = useState(false);
    const [id, setId] = useState("react-qrcode-logo");
    const [qrGenerated, setQrGenerated] = useState(false);

    const qrCodeRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const generateQRCode = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = "/register";
        }
        setQrGenerated(true);
    };

    const downloadQRCode = () => {
        if (qrCodeRef.current) {
            qrCodeRef.current.download('png', 'qrcode.png');
        } else {
            console.error("QRCode ref not found");
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Customize Your QR Code</h2>
            
            <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-md dark:bg-gray-800 dark:text-gray-100 grid grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="col-span-2 mb-4">
                    <label className="block text-sm font-medium mb-2">URL:</label>
                    <input 
                        type="text" 
                        value={url} 
                        onChange={(e) => setUrl(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                        required 
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-2">Title:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-2">Size:</label>
                    <input 
                        type="number" 
                        value={size} 
                        onChange={(e) => setSize(Number(e.target.value))} 
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-2">Background Color:</label>
                    <input 
                        type="color" 
                        value={bgColor} 
                        onChange={(e) => setBgColor(e.target.value)} 
                        className="w-full h-10 border-none rounded-lg cursor-pointer" 
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-2">Foreground Color:</label>
                    <input 
                        type="color" 
                        value={fgColor} 
                        onChange={(e) => setFgColor(e.target.value)} 
                        className="w-full h-10 border-none rounded-lg cursor-pointer" 
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-2">Error Correction Level:</label>
                    <select 
                        value={level} 
                        onChange={(e) => setLevel(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="L">L (Low)</option>
                        <option value="M">M (Medium)</option>
                        <option value="Q">Q (Quartile)</option>
                        <option value="H">H (High)</option>
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-2">Logo Upload:</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-2">Logo Width:</label>
                    <input 
                        type="number" 
                        value={logoWidth} 
                        onChange={(e) => setLogoWidth(Number(e.target.value))} 
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-2">Logo Height:</label>
                    <input 
                        type="number" 
                        value={logoHeight} 
                        onChange={(e) => setLogoHeight(Number(e.target.value))} 
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Logo Opacity:</label>
                    <input 
                        type="number" 
                        min="0" max="1" step="0.01"
                        value={logoOpacity}
                        onChange={(e) => setLogoOpacity(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Remove QR Behind Logo:</label>
                    <input 
                        type="checkbox"
                        checked={removeQrCodeBehindLogo}
                        onChange={(e) => setRemoveQrCodeBehindLogo(e.target.checked)}
                        className="mr-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Logo Padding:</label>
                    <input 
                        type="number"
                        value={logoPadding}
                        onChange={(e) => setLogoPadding(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Logo Padding Style:</label>
                    <select
                        value={logoPaddingStyle}
                        onChange={(e) => setLogoPaddingStyle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="square">Square</option>
                        <option value="circle">Circle</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">QR Style:</label>
                    <select
                        value={qrStyle}
                        onChange={(e) => setQrStyle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="squares">Squares</option>
                        <option value="dots">Dots</option>
                        <option value="fluid">Fluid</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Quiet Zone (px):</label>
                    <input 
                        type="number"
                        value={quietZone}
                        onChange={(e) => setQuietZone(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Enable CORS:</label>
                    <input 
                        type="checkbox"
                        checked={enableCORS}
                        onChange={(e) => setEnableCORS(e.target.checked)}
                        className="mr-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Custom QR ID:</label>
                    <input 
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                <button 
                    type="button" 
                    onClick={generateQRCode} 
                    className="col-span-2 w-full mb-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors"
                >
                    Generate QR Code
                </button>

                <button 
                    type="button" 
                    onClick={downloadQRCode} 
                    disabled={!qrGenerated}
                    className={`col-span-2 w-full p-3 rounded-lg transition-colors ${qrGenerated ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
                >
                    Download QR Code
                </button>
            </form>

            {qrGenerated && (
                <div className="relative mt-6 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-100"
                    onContextMenu={(e) => e.preventDefault()} // Disable right-click
                >
                    <QRCode
                        ref={qrCodeRef}
                        value={url}
                        ecLevel={level}
                        size={size}
                        quietZone={quietZone}
                        bgColor={bgColor}
                        fgColor={fgColor}
                        logoImage={logoSrc}
                        logoWidth={logoWidth}
                        logoHeight={logoHeight}
                        logoOpacity={logoOpacity}
                        removeQrCodeBehindLogo={removeQrCodeBehindLogo}
                        logoPadding={logoPadding}
                        logoPaddingStyle={logoPaddingStyle}
                        qrStyle={qrStyle}
                        enableCORS={enableCORS}
                        id={id}
                        style={{ margin: "0 auto" }}
                        // You can add eyeRadius, eyeColor, logoOnLoad, etc. as needed
                    />
                </div>
            )}
        </div>
    );
}

export default QRCodeGenerator;