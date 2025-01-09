//api/nasa/last-updated/route.js
import { NextResponse } from 'next/server';

// API route handler to fetch and return the last update date from NASA GISTEMP dataset
export async function GET() {
    // URL for NASA's GISTEMP temperature anomaly data in CSV format
    const apiUrl = "https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv";

    try {
        // Fetch data with custom headers to ensure request isn't rejected
        // User-Agent header helps prevent the request from being blocked
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/csv',
                'User-Agent': 'Mozilla/5.0',
            }
        });

        // Extract the last-modified header from the response
        const lastModified = response.headers.get('last-modified');
        // Convert the header string to a Date object
        const date = new Date(lastModified);

        // Format the date in British format (DD Month YYYY)
        // Example output: "31 December 2023"
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        // Return the formatted date as a JSON response with 200 status code
        return NextResponse.json({ date: formattedDate }, { status: 200 });
    } catch (error) {
        // Log any errors to the console for debugging
        console.error('Error:', error.message);
        // Return error message with 500 status code
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}