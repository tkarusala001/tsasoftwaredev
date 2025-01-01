import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Leaf, Car, Home, Utensils, Recycle, Zap } from 'lucide-react';

const CarbonRecommendations = ({ formData, totalEmissions }) => {
  const recommendations = useMemo(() => {
    const recs = [];
    
    // Transportation Recommendations
    if (formData.carType === 'gasoline') {
      const electricSavings = totalEmissions * 0.3; // Approximate savings from switching to electric
      recs.push({
        category: 'Transportation',
        title: 'Consider Switching to an Electric Vehicle',
        description: `Switching to an electric vehicle could reduce your carbon footprint by approximately ${electricSavings.toFixed(1)} kg CO₂ per month.`,
        impact: 'High',
        icon: Car,
        saving: electricSavings
      });
    }

    // Home Energy Recommendations
    const monthlyElectricity = parseFloat(formData.electricity.amount || 0);
    if (monthlyElectricity > 900) {
      const solarSavings = monthlyElectricity * 0.92 * 0.6; // 60% reduction from solar
      recs.push({
        category: 'Energy',
        title: 'Install Solar Panels',
        description: `Your high electricity usage suggests solar panels could be beneficial. This could save approximately ${solarSavings.toFixed(1)} kg CO₂ per month.`,
        impact: 'High',
        icon: Zap,
        saving: solarSavings
      });
    }

    // Food Recommendations
    const beefServings = parseFloat(formData.beefServings.amount || 0);
    if (beefServings > 2) {
      const beefSavings = beefServings * 6.61 * 2; // Reducing beef consumption by half
      recs.push({
        category: 'Diet',
        title: 'Reduce Beef Consumption',
        description: `Reducing your beef consumption by half could save approximately ${beefSavings.toFixed(1)} kg CO₂ per month. Consider plant-based alternatives or chicken.`,
        impact: 'Medium',
        icon: Utensils,
        saving: beefSavings
      });
    }

    // Waste Management Recommendations
    if (formData.recycling !== 'always') {
      const recyclingSavings = totalEmissions * 0.05; // 5% reduction from consistent recycling
      recs.push({
        category: 'Waste',
        title: 'Improve Recycling Habits',
        description: 'Consistently recycling can reduce your carbon footprint by approximately 5%. Focus on recycling paper, plastic, glass, and metal.',
        impact: 'Medium',
        icon: Recycle,
        saving: recyclingSavings
      });
    }

    if (formData.composting === 'no') {
      const compostingSavings = totalEmissions * 0.03; // 3% reduction from composting
      recs.push({
        category: 'Waste',
        title: 'Start Composting',
        description: `Starting a composting practice could reduce your carbon footprint by approximately ${compostingSavings.toFixed(1)} kg CO₂ per month.`,
        impact: 'Low',
        icon: Leaf,
        saving: compostingSavings
      });
    }

    // Home Efficiency
    const gasUsage = parseFloat(formData.naturalGas.amount || 0);
    if (gasUsage > 50) {
      const efficiencySavings = gasUsage * 5.3 * 0.2; // 20% reduction from better insulation
      recs.push({
        category: 'Energy',
        title: 'Improve Home Insulation',
        description: `Your natural gas usage suggests room for improvement. Better insulation could save approximately ${efficiencySavings.toFixed(1)} kg CO₂ per month.`,
        impact: 'Medium',
        icon: Home,
        saving: efficiencySavings
      });
    }

    // Sort recommendations by potential savings
    return recs.sort((a, b) => b.saving - a.saving);
  }, [formData, totalEmissions]);

  const totalPotentialSavings = recommendations.reduce((acc, rec) => acc + rec.saving, 0);
  const percentageReduction = (totalPotentialSavings / totalEmissions) * 100;

  return (
    <Card className="mt-8">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <Alert>
            <AlertTitle className="text-lg font-semibold">
              Personalized Recommendations
            </AlertTitle>
            <AlertDescription className="mt-2">
              Following these recommendations could reduce your carbon footprint by approximately{' '}
              <span className="font-semibold text-green-600">
                {totalPotentialSavings.toFixed(1)} kg CO₂
              </span>{' '}
              per month ({percentageReduction.toFixed(1)}% reduction).
            </AlertDescription>
          </Alert>

          <div className="grid gap-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <rec.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{rec.title}</h4>
                      <Badge variant={
                        rec.impact === 'High' ? 'default' :
                        rec.impact === 'Medium' ? 'secondary' : 
                        'outline'
                      }>
                        {rec.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-white/60">{rec.description}</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-green-600">
                        Potential Savings: {rec.saving.toFixed(1)} kg CO₂/month
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonRecommendations;