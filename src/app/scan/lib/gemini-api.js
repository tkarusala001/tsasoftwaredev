// app/scan/lib/gemini-api.js

// Function to convert the image file to base64
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // Get the base64 string by removing the data URL prefix
        const base64String = reader.result.split(',')[1]
        resolve(base64String)
      }
      reader.onerror = (error) => reject(error)
    })
  }
  
  // Function to analyze the image using Gemini AI
  export async function analyzeImage(imageFile, description = '') {
    try {
      // Convert image to base64
      const imageBase64 = await fileToBase64(imageFile)
      
      // Prepare the API endpoint
      const endpoint = '/api/gemini'
      
      // Prepare the request data
      const requestData = {
        image: imageBase64,
        description: description,
      }
      
      // Make the API request
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }
      
      const result = await response.json()
      return result
      
      // For testing without an API, uncomment this and comment the above code
      /*
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock response for testing
      return {
        score: Math.floor(Math.random() * 10) + 1,
        positives: [
          "Made from recycled materials",
          "Packaging is biodegradable",
          "Company has carbon-neutral initiatives"
        ],
        negatives: [
          "Contains some synthetic materials",
          "Not locally produced (high transport emissions)",
          "Short product lifespan"
        ],
        alternatives: [
          "Consider products from local artisans using natural materials",
          "Look for items with longer warranties and repair options",
          "EcoFriendly brand offers similar items with better sustainability metrics"
        ]
      }
      */
    } catch (error) {
      console.error('Error analyzing image:', error)
      throw error
    }
  }