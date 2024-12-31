"use client";

import { useState, useEffect } from "react";
import GreenhouseChart from "./charts/GreenhouseChart";

// Pre-industrial baseline concentrations
const preIndustrialCO2 = 280; // ppm
const preIndustrialCH4 = 722; // ppb
const preIndustrialN2O = 270; // ppb

// Radiative forcing calculation for CO2 (in ppm)
function calculateCO2Forcing(currentCO2) {
    return 5.35 * Math.log(currentCO2 / preIndustrialCO2);
}

// Radiative forcing calculation for CH4 (in ppb)
function calculateCH4Forcing(currentCH4) {
    return 0.036 * (Math.sqrt(currentCH4) - Math.sqrt(preIndustrialCH4));
}

// Radiative forcing calculation for N2O (in ppb)
function calculateN2OForcing(currentN2O) {
    return 0.12 * (Math.sqrt(currentN2O) - Math.sqrt(preIndustrialN2O));
}

export default function GreenhouseGas() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [co2Response, n2oResponse, ch4Response] = await Promise.all([
                    fetch('/api/noaa/co2'),
                    fetch('/api/noaa/n2o'),
                    fetch('/api/noaa/ch4')
                ]);

                const [co2Data, n2oData, ch4Data] = await Promise.all([
                    co2Response.json(),
                    n2oResponse.json(),
                    ch4Response.json()
                ]);

                const combinedData = co2Data
                    .filter(co2Item => co2Item.year > 2004)
                    .map(co2Item => {
                        const n2oItem = n2oData.find(item => item.year === co2Item.year && item.month === co2Item.month);
                        const ch4Item = ch4Data.find(item => item.year === co2Item.year && item.month === co2Item.month);

                        // Calculate radiative forcing
                        const co2Forcing = calculateCO2Forcing(co2Item.average);
                        const n2oForcing = n2oItem ? calculateN2OForcing(n2oItem.average) : null;
                        const ch4Forcing = ch4Item ? calculateCH4Forcing(ch4Item.average) : null;

                        return {
                            year: co2Item.year,
                            month: co2Item.month,
                            co2Forcing: co2Forcing !== null ? Number(co2Forcing.toFixed(2)) : null,
                            n2oForcing: n2oForcing !== null ? Number(n2oForcing.toFixed(2)) : null,
                            ch4Forcing: ch4Forcing !== null ? Number(ch4Forcing.toFixed(2)) : null,
                        };
                    })
                    .filter(item => item.co2Forcing !== null && item.n2oForcing !== null && item.ch4Forcing !== null);

                setData(combinedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-zinc-950/80 rounded-2xl border-2 border-gray-700/40 shadow-xl">
            <div className="flex flex-col justify-center h-full">
                <div className="flex flex-row items-center justify-between px-4 sm:px-5 mt-5">
                    <h2 className="text-white/85 font-semibold">Monthly Impact of Greenhouse Gases on Energy Balance</h2>
                </div>
                <GreenhouseChart data={data} />
            </div>
        </div>
    );
}
