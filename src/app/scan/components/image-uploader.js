// app/scan/components/image-uploader.js
'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { UploadCloud, X, Image } from 'lucide-react'

export default function ImageUploader({ onImageChange, imagePreview }) {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        onImageChange(file)
      }
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0])
    }
  }

  const handleRemoveImage = () => {
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <div 
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'
        } transition-colors duration-200 ${imagePreview ? 'bg-gray-50' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {imagePreview ? (
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="mx-auto max-h-64 rounded object-contain" 
            />
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white text-gray-700 hover:bg-red-100 hover:text-red-600"
              onClick={handleRemoveImage}
            >
              <X size={16} />
            </Button>
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center">
            <UploadCloud size={40} className="text-gray-400 mb-3" />
            <p className="mb-1 font-medium">Drag and drop your image here</p>
            <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 10MB</p>
            <Button 
              type="button" 
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="flex items-center"
            >
              <Image size={16} className="mr-2" />
              Browse Files
            </Button>
          </div>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  )
}