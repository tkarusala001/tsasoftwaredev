// src/app/api/readNetCDF/route.js

import fs from 'fs';
import path from 'path';
import { NetCDFReader } from 'netcdfjs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Path to your .nc file
    const filePath = path.resolve('./public', 'CERES.nc');

    // Read the file buffer
    const fileData = fs.readFileSync(filePath);

    // Initialize NetCDFReader
    const reader = new NetCDFReader(fileData);

    // Extract data from the file
    const dimensions = reader.dimensions;
    const variables = reader.variables;

    // Send the data as JSON response
    return NextResponse.json({
      dimensions,
      variables,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read .nc file', details: error.message },
      { status: 500 }
    );
  }
}
