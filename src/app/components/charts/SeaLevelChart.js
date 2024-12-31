import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";

export default function SeaLevelChart({ data }) {
    const lastYear = new Date().getFullYear();
    const lastDataPoint = data.find(d => Number(d.year) === lastYear);
    const [hoveredData, setHoveredData] = useState(null);

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
                        <p className='text-gray-500/90'>in cm</p>
                        <p className='font-semibold'>{displayData.avgSeaLevelChange}</p>
                    </div>  
                ) : ''}
            </div>
            <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data} margin={{ top: 75, right: 20, left: -25, bottom: 5 }} onMouseMove={handleMouseMove} onMouseLeave={() => setHoveredData(null)} >
                    <CartesianGrid vertical={false} horizontal={false} />
                    <XAxis 
                            dataKey="year"
                            tick={{ fill: 'white', fontSize: 10 }}
                            tickFormatter={(tick) => `${tick}`} 
                            axisLine={false}
                            tickLine={false}
                            ticks={["1885", "1900", "1920", "1940", "1960", "1980", "2000", "2024"]}
                    />
                    <YAxis
                            tick={{ fill: 'white', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            ticks={[-20, -10, 0, 10]}
                    />
                    <Tooltip
                        content={<></>}
                    />
                    <Line type="monotone" dataKey="avgSeaLevelChange" stroke="#0076ff" dot={false} activeDot={{ r: 3, fill: '#ebebeb' }} />
                    {lastDataPoint && (
                        <>
                            <ReferenceDot x={lastDataPoint.year} y={lastDataPoint.avgSeaLevelChange} r={3} fill="#ebebeb" />
                        </>
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
