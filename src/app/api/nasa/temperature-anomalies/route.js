import { NextResponse } from 'next/server';

export async function GET() {
    const apiUrl = "https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv";

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

const parseCSV = (data) => {
    const rows = data.split('\n');
    const result = [];

    // Extract the header row
    const headers = rows[1].split(',');

    // Loop through each row starting from the third row
    for (let i = 2; i < rows.length; i++) {
        const row = rows[i].trim();
        if (!row) continue; // Skip empty rows

        const values = row.split(',');
        const year = parseInt(values[0], 10);
        // Remove the J-D, D-N, DJF, MAM, JJA, SON columns
        const dataValues = values.slice(1, 13).map(value => parseFloat(value));

        result.push({
            year: year,
            data: dataValues
        });
    }

    return result;
}
