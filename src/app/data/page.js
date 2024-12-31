"use client";

import Link from "next/link";
import AverageTemp from "../components/AverageTemp";
import AverageTempAnomaly from "../components/AverageTempAnomaly";
import TempChange from "../components/TempChange";
import { LuHelpingHand } from "react-icons/lu";
import Footer from "../components/Footer";
import GreenhouseGas from "../components/GreenhouseGas";
import { useEffect, useState } from "react";
import SeaLevel from "../components/SeaLevel";
import Image from "next/image";

export default function GlobalWarming() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // or a loading spinner, or some placeholder
    }

    return (
        <div className="p-5 min-h-screen">
            <Link href="/" className="flex items-center justify-center">
                <Image alt='logo' src="/logo.png" width={35} height={35} />
            </Link>
            <main className="mx-auto max-w-6xl space-y-5">
                <section className="text-white/80 p-2 flex items-center justify-between">
                    <div className="leading-tight">
                        <h2 className="font-semibold text-lg">Global Warming</h2>
                        <p className="text-[0.9rem]">Crucial indicators of Earth&#39;s rising temperatures</p>
                    </div>
                    <Link href="/data/info" className="tooltip tooltip-left rounded-full p-2 bg-gray-800 hover:bg-gray-800/75" data-tip="Information">
                        <LuHelpingHand className="text-blue-500 cursor-pointer w-6 h-6" />
                    </Link>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    <div className="sm:col-span-2 w-full">
                        <AverageTempAnomaly />
                    </div>
                    <AverageTemp />
                    <TempChange />
                    <div className="w-full sm:col-span-2 flex flex-col sm:flex-row gap-1.5">
                        <div className="basis-3/4"><GreenhouseGas /></div>
                        <div className="basis-1/3"><SeaLevel /></div>
                    </div>

                </section>

                <Footer />
            </main>
        </div>
    );
}