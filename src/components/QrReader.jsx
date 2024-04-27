import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './QrReader.css';

export default function QrReader() {
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            setScanResult(result);
        }

        function error(err) {
            console.warn(err);
        }
    }, []);

    return (
        <div className="qrread">
            <h1>QrReader</h1>
            {scanResult ? (
                <div>
                    Success: <a href={scanResult}>{scanResult}</a>
                </div>
            ) : (
                <div id="reader"></div>
            )}
        </div>
    );
}
