//app/api/noaa/sea-level/route.js
import { NextResponse } from 'next/server';

// Define an async GET request handler function
export async function GET() {
    // URL for NOAA's sea level data CSV
    const apiUrl = "https://www.climate.gov/sites/default/files/graphs/csv/graphdata-sealevel-202407.csv";

    try {
        // Fetch data from climate.gov with specific headers
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/csv',         // Specify we're expecting CSV data
                'User-Agent': 'Mozilla/5.0',         // Set User-Agent to avoid potential blocking
            }
        });

        // Check if the fetch request was successful
        if (!response.ok) {
            console.error('Fetch error:', response.statusText);
            throw new Error(response.statusText);
        }

        // Convert the response to text
        const data = await response.text();
        // Parse and format the CSV data using helper function
        const formattedData = parseCSV(data);
        // Return the formatted data as JSON
        return NextResponse.json(formattedData);
    } catch (error) {
        // Log and return any errors that occur during the process
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Helper function to parse and format CSV data into structured format
const parseCSV = (csv) => {
    // Split CSV into individual lines and remove any trailing whitespace
    const lines = csv.trim().split('\n');

    // Extract headers from first line and clean up any whitespace
    const headers = lines[0].split(',').map(header => header.trim());

    // Convert remaining lines to array of objects using the headers as keys
    const jsonData = lines.slice(1).map(line => {
        // Split each line by comma and clean whitespace
        const values = line.split(',').map(value => value.trim());
        const obj = {};
        
        // Map each value to its corresponding header
        headers.forEach((header, index) => {
            // Convert values to numbers, handle 'NULL' values as null
            obj[header] = values[index] === 'NULL' ? null : parseFloat(values[index]);
        });
        return obj;
    });

    // Filter data to only include entries between 1885 and 2024
    // This removes older data that might be less reliable
    const filteredData = jsonData.filter(entry => entry['Year'] > 1884 && entry['Year'] <= 2024);

    return filteredData;
}