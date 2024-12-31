import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TermsAndPrivacy = () => {
    return (
        <div className="p-5 flex flex-col items-center justify-start min-h-screen">
            <Link href="/" className="flex items-center justify-center">
                <Image alt='logo' src="/logo.png" width={35} height={35} />
            </Link>
            <main className="flex-grow mx-auto max-w-xl space-y-5">
                <h1 className='font-semibold text-xl'>Privacy Policy</h1>

                <p className='text-sm'>
                    We don&#39;t store any personal information about you. We don&#39;t use cookies or any other tracking technologies.
                </p>
                <p className='text-sm'>
                    You can access our website without creating an account or providing any personal information.
                </p>
                <p className=' text-sm font-semibold'>Last updated: January 4th, 2025</p>

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

export default TermsAndPrivacy;