"use client";
import { useState, useEffect } from "react";
import TempChangeChart from "./charts/TempChangeChart";

export default function TempChange() {
    const [rateOfChangeResults, setRateOfChangeResults] = useState([]);
    const [lastModified, setLastModified] = useState(null);

    const baselineMeanTemperature = 13.84; // Pre-industrial baseline temperature

    // Calculate average temperature from anomalies
    const calculateAverageTemperature = (data, baseline) => {
        const validAnomalies = data.filter(anomaly => anomaly !== null && !isNaN(anomaly)); // Remove null and NaN values
        if (validAnomalies.length === 0) return null; // Return null if no valid anomalies

        const actualTemperatures = validAnomalies.map(anomaly => baseline + anomaly); // Convert anomalies to temperatures
        const totalTemp = actualTemperatures.reduce((acc, curr) => acc + curr, 0); // Sum temperatures
        const averageTemp = totalTemp / validAnomalies.length; // Calculate average
        return Math.round(averageTemp * 100) / 100; // Round to two decimal places
    };

    // Calculate rate of change
    const calculateRateOfChange = (data, windowSize = 30) => {
        const results = [];

        for (let i = 0; i <= data.length - windowSize; i++) {
            const segment = data.slice(i, i + windowSize);
            const years = segment.map(d => d.year);
            const anomalies = segment.map(d => d.averageAnomaly);

            const { slope } = linearRegression(years, anomalies);

            results.push({
                year: segment[windowSize - 1].year, // Year at the end of the window
                rateOfChange: Math.round(slope * 1000) / 1000, // Round to three decimal places
            });
        }

        return results;
    };

    const linearRegression = (xValues, yValues) => {
        const n = xValues.length;
        const sumX = xValues.reduce((a, b) => a + b, 0);
        const sumY = yValues.reduce((a, b) => a + b, 0);
        const sumXY = xValues.reduce((sum, xi, i) => sum + xi * yValues[i], 0);
        const sumXX = xValues.reduce((sum, xi) => sum + xi * xi, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        return { slope, intercept };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/nasa/temperature-anomalies');
                const data = await response.json();

                // Calculate average temperature for each year
                const avgTemps = data.map(yearData => ({
                    year: yearData.year,
                    averageAnomaly: calculateAverageTemperature(yearData.data, baselineMeanTemperature)
                }));

                // Calculate rate of change
                const rateOfChangeResults = calculateRateOfChange(avgTemps);
                setRateOfChangeResults(rateOfChangeResults);
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
                    <h2 className="text-white/85 font-semibold">Rate of Temperature Change</h2>
                </div>
                <TempChangeChart data={rateOfChangeResults} />
            </div>
        </div>
    );
}