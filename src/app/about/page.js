import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
    return (
        <div className="p-5 flex flex-col items-center justify-start min-h-screen">
            <Link href="/" className="flex items-center justify-center">
                <Image alt='logo' src="/logo.png" width={35} height={35} />
            </Link>
            <main className="flex-grow mx-auto max-w-5xl space-y-5">
                <h1 className='font-semibold text-xl'>About us</h1>
                <div className='text-sm space-y-5'>
                    <p>Welcome to the Global Warming Data Tracker!</p>
                    <div>
                        <p>Our goal is to simplify climate data through visualization to help you understand global warming and its effects.</p>
                        <h6 className='font-semibold mt-1'>Sources:</h6>
                        <p>The data presented on this website is sourced from reputable organizations and scientific institutions, including:</p>
                        <ul className='list-disc list-inside'>
                            <li>NASA&#39;s Goddard Insitute for Space Studies (GISS)</li>
                            <li>NASA CERES</li>
                            <li>National Oceanic and Atmospheric Administration (NOAA)</li>
                            <li>Climate.gov Sea Level Data</li>
                        </ul>
                    </div>
                    <p>Thank you for visiting us!</p>
                </div>
            </main>
            <footer className="flex flex-col items-center pt-5 space-y-5">
                <div className="max-w-lg mt-5">
                    <div className="text-sm flex flex-wrap justify-center items-center gap-3.5 leading-none">
                        <Link href="/" className="text-blue-500 hover:underline">Home</Link>
                        <Link href="/data" className="text-blue-500 hover:underline">Global Warming</Link>
                        <Link href="/about" className="text-blue-500 hover:underline">About</Link>
                        <Link href="/terms" className="text-blue-500 hover:underline">Privacy & Terms</Link>
                    </div>
                    <div className="flex flex-col items-center justify-center my-8">
                        <Image src="/logo.png" width={30} height={30} alt="Earth Pulse Logo" />
                        <p className="text-gray-400/65 text-sm mt-1">
                            &copy; {new Date().getFullYear()} Global Warming Data Tracker. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;
