import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const GreenhouseChart = ({ data }) => {
    const [xTicks, setXTicks] = useState([2005, 2008, 2011, 2014, 2017, 2020, 2024]);
    const lastYear = 2024;
    const lastMonth = 6;
    const lastDataPoint = data.find(d => d.year === lastYear && d.month === lastMonth);
    const lastDataPointIndex = data.findIndex(d => d.year === lastYear && d.month === lastMonth);

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
                        <p className='font-medium'>{monthNames[displayData.month - 1]} {displayData.year}</p>
                        <p className='text-gray-500/90'>in W/m²</p>
                        <div className='flex flex-row gap-2'>
                            <div className='flex flex-col items-end text-sm'>
                                <p>{displayData.co2Forcing}</p>
                                <div className='w-full h-[3px] bg-[#8884d8] rounded-md' />
                                <p> CO₂</p>
                            </div>
                            <div className='flex flex-col items-end text-sm'>
                                <p>{displayData.ch4Forcing}</p>
                                <div className='w-full h-[3px] bg-[#ffc658] rounded-md' />
                                <p> CH₄</p>
                            </div>
                            <div className='flex flex-col items-end text-sm'>
                                <p>{displayData.n2oForcing}</p>
                                <div className='w-full h-[3px] bg-[#82ca9d] rounded-md' />
                                <p> N₂O</p>
                            </div>
                            <div className='flex flex-col items-end text-sm'>
                                <p>{Number(displayData.co2Forcing + displayData.ch4Forcing + displayData.n2oForcing).toFixed(2)}</p>
                                <div className='w-full h-[3px] bg-zinc-500 rounded-md' />
                                <p>Impact</p>
                            </div>
                        </div>
                    </div>  
                ) : ''}
            </div>
            <ResponsiveContainer width="100%" height={220}>
                <AreaChart
                    data={data}
                    margin={{
                        top: 80, right: 20, left: -25, bottom: 5,
                    }}
                    onMouseMove={handleMouseMove} onMouseLeave={() => setHoveredData(null)}
                >
                    <XAxis 
                        dataKey="year" 
                        ticks={xTicks} 
                        tick={{ fill: 'white', fontSize: 10 }} // Adjust font size here
                        axisLine={false}
                        tickLine={false}
                        tickCount={xTicks.length}
                    />
                    <YAxis 
                        tick={{ fontSize: 10, fill: 'white' }} 
                        axisLine={false}
                        tickLine={false}
                        ticks={[0, 1, 2, 3]} // Only include the values 0, 1, 2, 3
                    />
                    <Tooltip
                        content={<></>}
                    />
                    <Area type="monotone" dataKey="co2Forcing" stroke="#8884d8" fill="#8884d8" activeDot={{ r: 2, fill: '#ebebeb' }} />
                    <Area type="monotone" dataKey="ch4Forcing" stroke="#ffc658" fill="#ffc658" activeDot={{ r: 2, fill: '#ebebeb' }} />
                    <Area type="monotone" dataKey="n2oForcing" stroke="#82ca9d" fill="#82ca9d" activeDot={{ r: 2, fill: '#ebebeb' }} />
                    {lastDataPoint && (
                        <>
                            <ReferenceDot x={lastDataPointIndex} y={lastDataPoint.co2Forcing} r={3} fill="#ebebeb" />
                            <ReferenceDot x={lastDataPointIndex} y={lastDataPoint.ch4Forcing} r={3} fill="#ebebeb" />
                            <ReferenceDot x={lastDataPointIndex} y={lastDataPoint.n2oForcing} r={3} fill="#ebebeb" />
                        </>
                    )}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GreenhouseChart;
