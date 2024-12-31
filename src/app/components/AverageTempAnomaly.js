"use client";

import { useState, useEffect } from "react";
import TempAnomalyChart from "./charts/TempAnomalyChart";

export default function AverageTempAnomaly() {
    const [averageAn, setAverageAn] = useState([]);
    const [lastModified, setLastModified] = useState(null);

    // Calculate average temperature anomaly
    const calculateAverageAnomaly = (data) => {
        const validAnomalies = data.filter(anomaly => anomaly !== null); // Remove null values
        const totalAnomaly = validAnomalies.reduce((acc, curr) => acc + curr, 0); // Sum anomalies
        const averageAnomaly = totalAnomaly / validAnomalies.length; // Calculate average
        return Math.round(averageAnomaly * 100) / 100; // Round to two decimal places
    };

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await fetch('/api/nasa/temperature-anomalies');
                const data = await response.json();
                
                // Calculate average temperature anomaly for each year
                const avgAnomalies = data.map(yearData => ({
                    year: yearData.year,
                    averageAnomaly: calculateAverageAnomaly(yearData.data)
                }));

                setAverageAn(avgAnomalies);
            } catch (error) {
                console.error('Error fetching temperature anomalies:', error);
            }
        };

        const fetchLastModified = async () => {
            try {
                const response = await fetch('/api/nasa/last-updated');
                const data = await response.json();
                setLastModified(data.date);
            } catch (error) {
                console.error('Error fetching last modified date:', error);
            }
        };

        fetchData();
        fetchLastModified();
    }, []);

    return (
        <div className="bg-zinc-950/80 rounded-2xl border-2 border-gray-700/40 shadow-xl">
            <div className="flex flex-col justify-center h-full">
                <div className="flex flex-row items-center justify-between px-4 sm:px-5 mt-5">
                    <h2 className="text-white/85 font-semibold">Yearly Average Temperature Anomaly</h2>
                </div>
                <TempAnomalyChart data={averageAn} />
            </div>
        </div>
    );
}
