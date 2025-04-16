// app/scan/components/sustainability-result.js
'use client'

import { CheckCircle, XCircle, Leaf, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'

export default function SustainabilityResult({ result }) {
  const { score, positives, negatives, alternatives } = result
  
  // Determine score color
  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600'
    if (score >= 5) return 'text-amber-600'
    return 'text-red-600'
  }
  
  // Determine badge color
  const getBadgeVariant = (score) => {
    if (score >= 8) return 'bg-green-100 text-green-800 hover:bg-green-100'
    if (score >= 5) return 'bg-amber-100 text-amber-800 hover:bg-amber-100'
    return 'bg-red-100 text-red-800 hover:bg-red-100'
  }

  return (
    <div className="space-y-4">
      {/* Score Section */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Sustainability Score</p>
          <div className="flex items-center mt-1">
            <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}/10</span>
            <Badge 
              className={`ml-3 ${getBadgeVariant(score)}`}
            >
              {score >= 8 ? 'Excellent' : score >= 5 ? 'Average' : 'Poor'}
            </Badge>
          </div>
        </div>
        <div className="h-16 w-16 rounded-full flex items-center justify-center">
          <Leaf size={32} className={getScoreColor(score)} />
        </div>
      </div>
      
      <Separator />
      
      {/* Positives Section */}
      <div>
        <h3 className="font-medium text-green-600 flex items-center mb-2">
          <CheckCircle size={16} className="mr-2" />
          Positives
        </h3>
        <ul className="space-y-2">
          {positives.map((positive, index) => (
            <li key={index} className="text-sm flex">
              <span className="text-green-600 mr-2">•</span>
              {positive}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Negatives Section */}
      <div>
        <h3 className="font-medium text-red-600 flex items-center mb-2">
          <XCircle size={16} className="mr-2" />
          Areas of Concern
        </h3>
        <ul className="space-y-2">
          {negatives.map((negative, index) => (
            <li key={index} className="text-sm flex">
              <span className="text-red-600 mr-2">•</span>
              {negative}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Alternatives Section */}
      <div>
        <h3 className="font-medium text-blue-600 flex items-center mb-2">
          <ArrowRight size={16} className="mr-2" />
          Sustainable Alternatives
        </h3>
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
          {alternatives.map((alternative, index) => (
            <Card key={index} className="bg-gray-50">
              <CardContent className="p-3">
                <p className="text-sm text-black">{alternative}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}