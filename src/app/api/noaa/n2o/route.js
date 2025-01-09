//app/api/noaa/n2o/route.js
import { NextResponse } from 'next/server';

// Define an async GET request handler function
export async function GET() {
    // URL for NOAA's N2O (nitrous oxide) monthly mean global data
    const apiUrl = "https://gml.noaa.gov/webdata/ccgg/trends/n2o/n2o_mm_gl.csv";

    try {
        // Fetch data from NOAA's API with specific headers
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
        // Parse the CSV data using helper function
        const parsedData = parseCSV(data);
        // Return the parsed data as JSON
        return NextResponse.json(parsedData);
    } catch (error) {
        // Log and return any errors that occur during the process
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Helper function to parse CSV data into structured format
const parseCSV = (csv) => {
    // Split CSV into lines
    const lines = csv.trim().split("\n");

    return lines
        // Remove comment lines (starting with #) and empty lines
        .filter(line => !line.startsWith("#") && line.trim())
        // Remove the header line
        .slice(1)
        // Transform each line into a structured object
        .map(line => {
            // Split each line by comma
            const values = line.split(",");
            return {
                year: parseInt(values[0]),    // Convert year to integer
                month: parseInt(values[1]),   // Convert month to integer
                average: parseFloat(values[3]) // Convert average N2O value to float
            };
        });
}