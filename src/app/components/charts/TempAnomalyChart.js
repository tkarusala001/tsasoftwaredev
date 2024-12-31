"use client";

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, ReferenceDot } from 'recharts';

const TempAnomalyChart = ({ data }) => {
    const dataPoint2024 = data.find(point => point.year === 2024);

    const [hoveredData, setHoveredData] = useState(dataPoint2024);

    const xTicks = [1880, 1900, 1920, 1940, 1960, 1980, 2000, 2024];

    const axisTickStyle = {
        fontSize: 10,
        fill: '#fffff6'
    };

    const CustomTooltip = ({ active, payload }) => {
        useEffect(() => {
            if (active && payload && payload.length) {
                setHoveredData(payload[0].payload);
            } else {
                setHoveredData(null);
            }
        }, [active, payload]);

        return null; // Return null as the tooltip content is handled by the state
    };

    const displayData = hoveredData || dataPoint2024;

    if (typeof window === 'undefined') {
        return null; // Ensure the component is rendered only on the client side
    }

    return (
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ position: 'absolute', top: 5, right: 20, color: 'white', zIndex: 10 }}>
                {displayData ? (
                    <div className='flex flex-col items-end leading-tight text-[0.8rem]'>
                        <p className='font-medium'>{displayData.year}</p>
                        <p className='text-gray-500/90'>in °C </p>
                        <p className='font-semibold'>{displayData.averageAnomaly}</p>
                    </div>  
                ) : ''}
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data} margin={{ top: 75, right: 20, left: -25, bottom: 5 }} >
                    <defs>
                        <linearGradient id="colorAnomaly" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ff4c0b"/>
                            <stop offset="35%" stopColor="#ff9b0b" />
                            <stop offset="65%" stopColor="#ffb20b" />
                            <stop offset="75%" stopColor="#00ffff" />
                            <stop offset="100%" stopColor="#00ffff"/>
                        </linearGradient>
                    </defs>
                    <XAxis 
                        dataKey="year" 
                        ticks={xTicks} 
                        axisLine={false} 
                        tickLine={false} 
                        tick={axisTickStyle}
                    />
                    <YAxis 
                        ticks={[0, 0.5, 1, 1.5]} 
                        axisLine={false} 
                        tickLine={false} 
                        tick={axisTickStyle}
                        domain={[0, 1.5]} // Adjust the domain to remove negative space
                        allowDataOverflow={false} // Allow data overflow
                    />
                    <Tooltip 
                        content={<CustomTooltip />} // Custom tooltip content
                    />
                    <Area 
                        type="monotone" 
                        dataKey="averageAnomaly" 
                        fill="url(#colorAnomaly)" 
                        stroke="none" 
                        activeDot={{ r: 3, fill: '#ebebeb' }}
                    />
                    {/* Add a dot for the year 2024 data point */}
                    {dataPoint2024 && (
                        <>
                            <ReferenceDot 
                                x={dataPoint2024.year} 
                                y={dataPoint2024.averageAnomaly} 
                                r={2} 
                                fill="#f0f0f0"
                            />
                            <ReferenceDot 
                                x={dataPoint2024.year} 
                                y={dataPoint2024.averageAnomaly} 
                                r={3} 
                                fill="#ffffff"
                                className="animate-pulse opacity-70"
                            />
                        </>
                    )}
                    <ReferenceLine x="year" stroke="rgba(255, 255, 255, 0.5)" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TempAnomalyChart;
