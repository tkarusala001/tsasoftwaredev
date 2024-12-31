import { NextResponse } from 'next/server';

export async function GET() {
    const apiUrl = "https://www.climate.gov/sites/default/files/graphs/csv/graphdata-sealevel-202407.csv";

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
        const formattedData = parseCSV(data);
        return NextResponse.json(formattedData);
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

const parseCSV = (csv) => {
    // Split the CSV into lines
    const lines = csv.trim().split('\n');

    // Extract the header (first line) and the data (subsequent lines)
    const headers = lines[0].split(',').map(header => header.trim());
    const jsonData = lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] === 'NULL' ? null : parseFloat(values[index]);
        });
        return obj;
    });

    // Filter data to only include entries after the year 1885
    const filteredData = jsonData.filter(entry => entry['Year'] > 1884 && entry['Year'] <= 2024);

    return filteredData;
}