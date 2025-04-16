// app/scan/page.js
'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { UploadCloud, RefreshCw, AlertCircle } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import SustainabilityResult from './components/sustainability-result'
import ImageUploader from './components/image-uploader'
import { analyzeImage } from './lib/gemini-api'

export default function ScanPage() {
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleImageChange = (file) => {
    setImage(file)
    
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
    
    setResult(null)
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!image) {
      setError('Please upload an image first')
      return
    }

    try {
      setIsAnalyzing(true)
      setError(null)
      
      const analysisResult = await analyzeImage(image, description)
      setResult(analysisResult)
    } catch (err) {
      console.error('Analysis error:', err)
      setError('Failed to analyze the image. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetForm = () => {
    setImage(null)
    setImagePreview(null)
    setDescription('')
    setResult(null)
    setError(null)
  }

  return (
    <div className="container mx-auto py-8 px-4">
        <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
    <ArrowLeft size={16} className="mr-1" />
    Back to Home
  </Link>
      <h1 className="text-3xl font-bold text-center mb-2 text-green-600">EcoScan</h1>
      <p className="text-center text-gray-500 mb-6">Analyze the sustainability of everyday items</p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload and Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Item</CardTitle>
            <CardDescription>Upload a clear image of the item you want to analyze</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <ImageUploader 
                  onImageChange={handleImageChange} 
                  imagePreview={imagePreview} 
                />
                
                <div className="space-y-2">
                  <Label htmlFor="description">Additional Information (Optional)</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide any relevant details about the item (material, brand, etc.)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-20"
                  />
                </div>
                
                {error && (
                  <div className="bg-red-50 p-3 rounded-md flex items-center gap-2 text-red-600">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <Button 
                  type="submit" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={isAnalyzing || !image}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw size={16} className="mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : 'Analyze Sustainability'}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetForm}
                  className="flex-1"
                >
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Sustainability Results</CardTitle>
            <CardDescription>
              {result ? 'Analysis of your item' : 'Upload an image to see results'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <RefreshCw size={48} className="text-green-500 animate-spin" />
                <div className="text-center">
                  <p className="font-medium">Analyzing your item...</p>
                  <p className="text-sm text-gray-500">Our AI is checking sustainability factors</p>
                </div>
                <Progress value={45} className="w-full" />
              </div>
            ) : result ? (
              <SustainabilityResult result={result} />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <UploadCloud size={64} strokeWidth={1} />
                <p className="mt-4 text-center">Upload an item to analyze its sustainability score</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}