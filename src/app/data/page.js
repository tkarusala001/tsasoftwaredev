// Enable client-side rendering
"use client";

// Import necessary components and dependencies
import Link from "next/link";
import AverageTemp from "../components/AverageTemp";
import AverageTempAnomaly from "../components/AverageTempAnomaly";
import TempChange from "../components/TempChange";
import { LuHelpingHand } from "react-icons/lu";  // Help icon from Lucide React icons
import Footer from "../components/Footer";
import GreenhouseGas from "../components/GreenhouseGas";
import { useEffect, useState } from "react";
import SeaLevel from "../components/SeaLevel";
import Image from "next/image";
import CarbonCalculator from '../components/CarbonCalculator';
import CarbonQuizGame from "../components/CarbonQuizGame";

export default function GlobalWarming() {
    // State to handle client-side rendering
    const [isClient, setIsClient] = useState(false);

    // Effect to set client-side rendering flag once component mounts
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Return null (or loading state) during server-side rendering
    if (!isClient) {
        return null; // Could alternatively show loading spinner or placeholder
    }

    return (
        // Main container with padding and minimum height
        <div className="p-5 min-h-screen">
            {/* Logo link to home page */}
            <Link href="/" className="flex items-center justify-center">
                <Image alt='logo' src="/logo.png" width={35} height={35} />
            </Link>

            {/* Main content container with max width and spacing */}
            <main className="mx-auto max-w-6xl space-y-5">
                {/* Header section with title and help icon */}
                <section className="text-white/80 p-2 flex items-center justify-between">
                    <div className="leading-tight">
                        <h2 className="font-semibold text-lg">Global Warming</h2>
                        <p className="text-[0.9rem]">Crucial indicators of Earth&#39;s rising temperatures</p>
                    </div>
                    {/* Help icon with tooltip */}
                    <Link href="/data/info" className="tooltip tooltip-left rounded-full p-2 bg-gray-800 hover:bg-gray-800/75" data-tip="Information">
                        <LuHelpingHand className="text-blue-500 cursor-pointer w-6 h-6" />
                    </Link>
                </section>

                {/* Data visualization grid section */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {/* Temperature anomaly chart (full width) */}
                    <div className="sm:col-span-2 w-full">
                        <AverageTempAnomaly />
                    </div>
                    
                    {/* Average temperature and temperature change charts */}
                    <AverageTemp />
                    <TempChange />
                    
                    {/* Greenhouse gas and sea level charts container */}
                    <div className="w-full sm:col-span-2 flex flex-col sm:flex-row gap-1.5">
                        {/* Greenhouse gas chart (75% width on desktop) */}
                        <div className="basis-3/4"><GreenhouseGas /></div>
                        {/* Sea level chart (25% width on desktop) */}
                        <div className="basis-1/3"><SeaLevel /></div>
                    </div>
                </section>

                {/* Carbon calculator section */}
                <section>
                    <CarbonCalculator />
                </section>

                {/* Carbon quiz game section */}
                <section className="mt-8">
                    <CarbonQuizGame />
                </section>

                {/* Footer component */}
                <Footer />
            </main>
        </div>
    );
}