"use client";
import { useState, useEffect } from "react";
import SeaLevelChart from "./charts/SeaLevelChart";

export default function SeaLevel() {
    const [data, setData] = useState([]);

    const calculateYearlyAverages = (rawData) => {
        const yearlyAverages = {};

        rawData.forEach((item) => {
            const year = item.Year;
            const cwValue = item.CW_2011;
            const uhsValue = item.UHSLC_FD;

            // Initialize the year entry if it doesn't exist
            if (!yearlyAverages[year]) {
                yearlyAverages[year] = { totalSeaLevelChange: 0, count: 0 };
            }

            // If both values are present, average them. If one is null, use the other.
            let combinedValue = 0;
            if (cwValue !== null && uhsValue !== null) {
                combinedValue = (cwValue + uhsValue) / 2;
            } else if (cwValue !== null) {
                combinedValue = cwValue;
            } else if (uhsValue !== null) {
                combinedValue = uhsValue;
            }

            // Add the combined value to the yearly total
            yearlyAverages[year].totalSeaLevelChange += combinedValue;
            yearlyAverages[year].count += 1; // Increment count for each entry
        });

        // Convert the aggregated data into the final averaged format
        return Object.keys(yearlyAverages).map((year) => {
            const avgSeaLevelChange = yearlyAverages[year].totalSeaLevelChange / yearlyAverages[year].count || 0;

            return {
                year: year,
                avgSeaLevelChange: Number(avgSeaLevelChange/10).toFixed(2)
            };
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/noaa/sea-level');
                const rawData = await response.json();

                // Calculate yearly averages from the raw data
                const finalData = calculateYearlyAverages(rawData);

                setData(finalData); // Set the processed data
            } catch (error) {
                console.error('Error fetching sea level data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-zinc-950/80 rounded-2xl border-2 border-gray-700/40 shadow-xl">
            <div className="flex flex-col justify-center h-full">
                <div className="flex flex-row items-center justify-between px-4 sm:px-5 mt-5">
                    <h2 className="text-white/85 font-semibold">Yearly Sea Level Change</h2>
                </div>
                <SeaLevelChart data={data} />
            </div>
        </div>
    );
}
