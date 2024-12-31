import { NextResponse } from 'next/server';

export async function GET() {
    const apiUrl = "https://gml.noaa.gov/webdata/ccgg/trends/ch4/ch4_mm_gl.csv";

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/csv',
                'User-Agent': 'Mozilla/5.0',
            }
        });

        if (!response.ok) {
            console.error('Fetch error:', response.statusText);
            throw new Error(response.statusText);
        }

        const data = await response.text();
        const parsedData = parseCSV(data);
        return NextResponse.json(parsedData);
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

const parseCSV = (csv) => {
    const lines = csv.trim().split("\n");

    return lines
    .filter(line => !line.startsWith("#") && line.trim())  // Ignore comment lines and empty lines
    .slice(1)  // Ignore the headers line itself
    .map(line => {
        const values = line.split(",");
        return {
            year: parseInt(values[0]), // Year from the 1st column
            month: parseInt(values[1]), // Month from the 2nd column
            average: parseFloat(values[3]) // Average from the 4th column
        };
    });
}