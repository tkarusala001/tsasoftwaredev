//api/nasa/temperature-anomalies/route.js
import { NextResponse } from 'next/server';

// API route handler to fetch and parse NASA GISTEMP temperature anomaly data
export async function GET() {
    // URL for NASA's GISTEMP temperature anomaly data in CSV format
    const apiUrl = "https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv";

    try {
        // Fetch data with custom headers to ensure request isn't rejected
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/csv',
                'User-Agent': 'Mozilla/5.0',
            }
        });

        // Check if the fetch was successful
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
const parseCSV = (data) => {
    // Split the CSV into rows
    const rows = data.split('\n');
    const result = [];

    // Extract the header row (second row in the file)
    const headers = rows[1].split(',');

    // Process each data row starting from the third row
    // First row contains metadata, second row is headers
    for (let i = 2; i < rows.length; i++) {
        const row = rows[i].trim();
        // Skip empty rows
        if (!row) continue;

        // Split row into values and process
        const values = row.split(',');
        const year = parseInt(values[0], 10);
        
        // Extract only the monthly temperature anomalies
        // Excludes annual and seasonal averages (J-D, D-N, DJF, MAM, JJA, SON)
        const dataValues = values.slice(1, 13).map(value => parseFloat(value));

        // Add processed row to results
        result.push({
            year: year,
            data: dataValues
        });
    }

    return result;
}