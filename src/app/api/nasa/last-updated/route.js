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

        const lastModified = response.headers.get('last-modified');
        const date = new Date(lastModified);

        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        return NextResponse.json({ date: formattedDate }, { status: 200 });
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

//Last data update 