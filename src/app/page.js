"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IoIosArrowDroprightCircle, IoLogoGithub } from "react-icons/io"
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className='flex-grow flex flex-col items-center justify-center max-w-2xl mx-auto'>
        <Image alt='logo' src='/logo.png' width={35} height={35} />
        <h1 className='text-xl font-bold tracking-tight'>Global Warming Data Tracker</h1>
        <p className='text-sm text-center mb-8'>Explore the latest data and insights on global warming trends.</p>

        <div className='flex flex-row gap-1 w-[75%]'>
          <Link href='/data' className='w-full text-center bg-base-200/75 hover:bg-base-200 rounded-xl py-2.5 px-8 cursor-pointer'>
            <h3 className='text-[0.93rem] font-semibold'>View Data</h3>
          </Link>
          <Link href='/about' className='w-full text-center bg-base-200/75 hover:bg-base-200 rounded-xl py-2.5 px-8 cursor-pointer'>
            <h3 className='text-[0.93rem] font-semibold'>About</h3>
          </Link>
        </div>
      </div>

      <footer className='w-full max-w-2xl mx-auto pt-4 border-t border-gray-700/80 mb-5'>
        <div className='flex flex-col justify-center items-center gap-1'>
          <Link
            href="https://github.com/"
            target='_blank'
            aria-label='GitHub'
            className='text-gray-400 hover:text-gray-300 transition-colors'
          >
            <IoLogoGithub size={25} />
          </Link>
          <p className='text-gray-400 text-center text-sm'>
            © {new Date().getFullYear()} Global Warming Data Tracker. All rights reserved.
          </p>
        </div>
      </footer> 
    </div>
  );
}