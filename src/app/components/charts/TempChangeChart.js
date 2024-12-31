"use client";

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';

const TempChangeChart = ({ data }) => {
    const [isClient, setIsClient] = useState(false);
    const [hoveredData, setHoveredData] = useState(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const dataPoint2024 = data.find(point => point.year === 2024);

    const handleMouseMove = (e) => {
        if (e && e.activePayload && e.activePayload.length) {
            setHoveredData(e.activePayload[0].payload);
        } else {
            setHoveredData(null);
        }
    };

    const displayData = hoveredData || dataPoint2024;

    if (!isClient) {
        return null;
    }

    const axisTickStyle = {
        fontSize: 10,
        fill: '#ffffff'
    };

    return (
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ position: 'absolute', top: 5, right: 20, color: 'white', zIndex: 10 }}>
                {displayData ? (
                    <div className='flex flex-col items-end leading-tight text-[0.8rem]'>
                        <p className='font-medium'>{displayData.year}</p>
                        <p className='text-gray-500/90'>in °C </p>
                        <p className='font-semibold'>{displayData.rateOfChange}</p>
                    </div>
                ) : ''}
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                    data={data}
                    margin={{
                        top: 75, right: 20, left: -15, bottom: 5
                    }}
                    onMouseMove={handleMouseMove}
                >
                    <defs>
                        <linearGradient id="colorChange" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="60%" stopColor="#ff0000" />
                            <stop offset="95%" stopColor="#0000ff" />
                        </linearGradient>
                    </defs>
                    <XAxis 
                        dataKey="year" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={axisTickStyle} 
                        ticks={[1910, 1930, 1950, 1970, 1990, 2010, 2024]} 
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={axisTickStyle}
                        ticks={[0, 0.01, 0.02]}
                    />
                    <Tooltip
                        content={<></>}
                    />
                    <ReferenceLine y={0} fill='#8c8c8c' opacity={0.5} />
                    <Area
                        type="monotone"
                        dataKey="rateOfChange"
                        stroke="url(#colorChange)" 
                        fillOpacity={0}
                        activeDot={{ r: 3, fill: '#ebebeb' }}
                    />
                    {dataPoint2024 && (
                        <>
                            <ReferenceDot x={dataPoint2024.year} y={dataPoint2024.rateOfChange} r={3} fill="#ebebeb" />
                        </>
                    )}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TempChangeChart;
