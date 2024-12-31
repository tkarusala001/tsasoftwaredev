import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
    const [isSharing, setIsSharing] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                setIsSharing(true); // Set sharing status to true
                await navigator.share({
                    title: 'Global Warming Data Tracker',
                    text: 'Check out this amazing resource on global warming data!',
                    url: window.location.href,
                });
            } catch (error) {
            } finally {
                setIsSharing(false); // Reset sharing status
            }
        } 
    };
    return (
        <footer className="flex flex-col items-center pt-5 space-y-5">
            <div className="text-gray-400/80 text-sm flex flex-row items-center gap-1">
                <Image src="/bw-logo.png" alt='logo' width={20} height={20}/>
                <p>
                    Most recent data from NOAA, Climate.gov, NASA, NASA GISS, NASA CERES
                </p>
            </div>
            <button
                onClick={handleShare}
                disabled={isSharing}
                className="bg-blue-600 text-sm text-white px-6 py-2 rounded-full hover:bg-blue-700 disabled:bg-blue-800 transition-colors"
            >
                Share link 🌍
            </button>
            <div className="max-w-lg mt-5">
                <div className="text-sm flex flex-wrap justify-center items-center gap-3.5 leading-none">
                    <Link href="/" className="text-blue-500 hover:underline">Home</Link>
                    <Link href="/data" className="text-blue-500 hover:underline">Global Warming</Link>
                    <Link href="/about" className="text-blue-500 hover:underline">About</Link>
                    <Link href="/terms" className="text-blue-500 hover:underline">Privacy & Terms</Link>
                </div>
                <div className="flex flex-col items-center justify-center my-8">
                    <Image src="/logo.png" width={30} height={30} alt="Logo" />
                    <p className="text-gray-400/65 text-sm mt-1">
                        &copy; {new Date().getFullYear()} Global Warming Data Tracker. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
