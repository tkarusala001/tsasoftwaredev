// app/api/gemini/route.js

import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { image, description } = await request.json()
    
    if (!image) {
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      )
    }

    // Prepare the Gemini API request
    const apiKey = process.env.GEMINI_API_KEY
    const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
    
    // Construct the prompt for sustainability analysis
    const prompt = `
      Analyze this image and provide a sustainability assessment with the following:
      1. A sustainability score from 1-10 (where 10 is most sustainable)
      2. 3-5 positive sustainability aspects
      3. 3-5 negative sustainability concerns
      4. 2-3 more sustainable alternatives
      
      Additional context about the item: ${description || 'No additional information provided.'}
      
      Format the response as JSON with the following structure:
      {
        "score": (number between 1-10),
        "positives": [(string), (string), ...],
        "negatives": [(string), (string), ...],
        "alternatives": [(string), (string), ...]
      }
    `

    // Prepare the request body for Gemini
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: image
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1024
      }
    }

    // Send request to Gemini API
    const geminiResponse = await fetch(`${geminiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json()
      console.error('Gemini API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to analyze image with Gemini' },
        { status: 500 }
      )
    }

    const geminiData = await geminiResponse.json()
    
    // Extract the JSON response from Gemini
    const responseText = geminiData.candidates[0].content.parts[0].text
    
    // Parse the JSON from the response text
    // This might need some regex or string manipulation if Gemini doesn't return clean JSON
    let jsonResponse
    try {
      // Try to extract JSON from the text if it's not clean JSON
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      const jsonString = jsonMatch ? jsonMatch[0] : responseText
      jsonResponse = JSON.parse(jsonString)
    } catch (err) {
      console.error('Error parsing Gemini response:', err)
      
      // Fallback to a simple structured response
      return NextResponse.json({
        score: 5,
        positives: ["Could not properly analyze positives"],
        negatives: ["Could not properly analyze negatives"],
        alternatives: ["Could not properly suggest alternatives"]
      })
    }

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}