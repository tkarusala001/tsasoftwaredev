//app/api/noaa/ch4/route.js
import { NextResponse } from 'next/server';

// API route handler to fetch and parse NOAA's global methane concentration data
export async function GET() {
    // URL for NOAA's monthly mean CH4 global data
    const apiUrl = "https://gml.noaa.gov/webdata/ccgg/trends/ch4/ch4_mm_gl.csv";

    try {
        // Fetch data with custom headers to prevent request rejection
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/csv',
                'User-Agent': 'Mozilla/5.0',
            }
        });

        // Verify the fetch was successful
        if (!response.ok) {
            console.error('Fetch error:', response.statusText);
            throw new Error(response.statusText);
        }

        // Get the raw CSV text and parse it
        const data = await response.text();
        const parsedData = parseCSV(data);
        return NextResponse.json(parsedData);
    } catch (error) {
        // Log and return any errors that occur
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Helper function to parse CSV data into a structured format
const parseCSV = (csv) => {
    // Split CSV into lines and trim any extra whitespace
    const lines = csv.trim().split("\n");

    // Process the lines and return structured data
    return lines
        // Remove comment lines (starting with #) and empty lines
        .filter(line => !line.startsWith("#") && line.trim())
        // Skip the header row
        .slice(1)
        // Transform each line into a structured object
        .map(line => {
            const values = line.split(",");
            return {
                year: parseInt(values[0]),    // First column contains year
                month: parseInt(values[1]),   // Second column contains month
                average: parseFloat(values[3]) // Fourth column contains average CH4 concentration
            };
        });
}