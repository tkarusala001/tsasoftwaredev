"use client";

import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';

const TemperatureChart = ({ data = [] }) => {
    const lastYear = new Date().getFullYear();
    const lastDataPoint = data.find(d => d.year === lastYear);

    const [xTicks, setXTicks] = useState([1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000 , 2010, 2024]);
    const [yTicks, setYTicks] = useState([11, 12, 13, 14, 15]);
    const [hoveredData, setHoveredData] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 800) {
                setXTicks([1880, 1900, 1920, 1940, 1960, 1980, 2000, 2024]);
            } else {
                setXTicks([1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000 , 2010, 2024]);
            }

            if (window.innerWidth < 550) {
                setYTicks([11, 13, 15]);
            } else {
                setYTicks([11, 12, 13, 14, 15]);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call initially to set the correct ticks

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseMove = (e) => {
        if (e && e.activePayload) {
            setHoveredData(e.activePayload[0].payload);
        } else {
            setHoveredData(null);
        }
    };

    const displayData = hoveredData || lastDataPoint;

    if (typeof window === 'undefined') {
        return null; // Ensure the component is rendered only on the client side
    }

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 5, right: 20, color: 'white', zIndex: 10 }}>
                {displayData ? (
                    <div className='flex flex-col items-end leading-tight text-[0.8rem]'>
                        <p className='font-medium'>{displayData.year}</p>
                        <p className='text-gray-500/90'>in °C </p>
                        <p className='font-semibold'>{displayData.averageTemp}</p>
                    </div>  
                ) : ''}
            </div>
            <ResponsiveContainer width="100%" height={window.innerWidth < 600 ? 200 : 225}>
                <AreaChart data={data} margin={{ top: 75, right: 20, left: -25, bottom: 5 }} onMouseMove={handleMouseMove} onMouseLeave={() => setHoveredData(null)}>
                    <CartesianGrid vertical={false} horizontal={false} />
                    <XAxis 
                        dataKey="year" 
                        ticks={xTicks} 
                        tick={{ fill: 'white', fontSize: 10 }} // Adjust font size here
                        axisLine={false}
                        tickLine={false}
                        tickCount={xTicks.length}
                    />
                    <YAxis 
                        domain={[11, 'dataMax']} 
                        ticks={yTicks} 
                        tick={{ fill: 'white', fontSize: 10 }} // Adjust font size here
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip 
                        content={<></>} // Disable tooltip content
                    />
                    <ReferenceLine y={13.84} stroke="#8c8c8c" strokeDasharray="3 3" />
                    <Area 
                        type="monotone" 
                        dataKey="averageTemp" 
                        fill="#666666" 
                        stroke="#666666"
                        activeDot={{ r: 3, fill: '#ebebeb' }}
                    />
                    {lastDataPoint && (
                        <>
                            <ReferenceDot x={lastDataPoint.year} y={lastDataPoint.averageTemp} r={3} fill="#ebebeb" />
                        </>
                    )}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TemperatureChart;