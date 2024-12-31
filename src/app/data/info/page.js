"use client";

import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { IoReturnDownBack } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";

export default function Info(){
    return (
        <div className="p-5 min-h-screen">
            <Link href="/" className="flex items-center justify-center">
                <Image alt='logo' src="/logo.png" width={35} height={35} />
            </Link>
            <main className="mx-auto max-w-3xl space-y-5">
                <section className="text-white/80 p-2 flex items-center justify-between">
                    <div className="leading-tight">
                        <h2 className="font-semibold text-lg">Global Warming Information</h2>
                    </div>
                    <Link href="/data" className="tooltip tooltip-left rounded-full p-2 bg-gray-800 hover:bg-gray-800/75" data-tip="Go Back">
                        <IoReturnDownBack className="text-blue-500 cursor-pointer w-6 h-6" />
                    </Link>
                </section>

                <section>
                    <p>
                        <span className="font-semibold">Global warming</span> refers to the long-term rise in Earth&rsquo;s average surface temperature due to human activities, especially the emission of greenhouse gases 
                        like carbon dioxide (CO2), methane (CH4), and nitrous oxide (N2O). These gases trap heat in the atmosphere, causing the planet&rsquo;s temperature to increase.
                    </p>
                    <a 
                        href="https://en.wikipedia.org/wiki/Global_warming"
                        target="_blank"
                        className="text-blue-500/85 flex items-center text-sm gap-1 my-5"
                    >
                        <IoIosLink className="w-4 h-4" />
                        <p className="underline underline-offset-2">Wikipedia: Global warming</p>
                    </a>
                    <p>
                        The consequences of global warming are far-reaching and include more frequent and intense heatwaves, rising sea levels due to melting polar ice, and shifts in weather patterns that can 
                        lead to severe droughts, flooding, and changes in ecosystems. As a result, global warming poses significant threats to biodiversity, food security, and human livelihoods across the globe.
                    </p>
                    <p className="mt-2">
                        It is important to monitor key indicators of global warming, such as temperature changes, greenhouse gas concentrations, and sea level rise, to understand the extent of its impact and 
                        inform policy decisions aimed at mitigating its effects.
                    </p>
                </section>

                <Footer />
            </main>
        </div>
    )
}