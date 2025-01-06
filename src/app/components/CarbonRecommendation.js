import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, Car, Home, Utensils, Recycle, Zap,
  Shower, Wind, TreePine, ShoppingBag, 
  Lightbulb, Plane, ThermometerSun, Droplet
} from 'lucide-react';

const CarbonRecommendations = ({ formData, totalEmissions }) => {
  const recommendations = useMemo(() => {
    const recs = [];
    
    // Existing Transportation Recommendations
    if (formData.carType === 'gasoline') {
      const electricSavings = totalEmissions * 0.3;
      recs.push({
        category: 'Transportation',
        title: 'Consider Switching to an Electric Vehicle',
        description: `Switching to an electric vehicle could reduce your carbon footprint by approximately ${electricSavings.toFixed(1)} kg CO₂ per month.`,
        impact: 'High',
        icon: Car,
        saving: electricSavings
      });
    }

    // Existing Home Energy Recommendations
    const monthlyElectricity = parseFloat(formData.electricity.amount || 0);
    if (monthlyElectricity > 900) {
      const solarSavings = monthlyElectricity * 0.92 * 0.6;
      recs.push({
        category: 'Energy',
        title: 'Install Solar Panels',
        description: `Your high electricity usage suggests solar panels could be beneficial. This could save approximately ${solarSavings.toFixed(1)} kg CO₂ per month.`,
        impact: 'High',
        icon: Zap,
        saving: solarSavings
      });
    }

    // New Energy Recommendations
    const ledSavings = monthlyElectricity * 0.92 * 0.1; // 10% reduction from LED bulbs
    recs.push({
      category: 'Energy',
      title: 'Switch to LED Lighting',
      description: `Replacing all traditional bulbs with LED alternatives could save approximately ${ledSavings.toFixed(1)} kg CO₂ per month.`,
      impact: 'Medium',
      icon: Lightbulb,
      saving: ledSavings
    });

    // Smart Thermostat
    const gasUsage = parseFloat(formData.naturalGas.amount || 0);
    const thermostatSavings = (gasUsage * 5.3 * 0.12) + (monthlyElectricity * 0.92 * 0.12); // 12% reduction
    recs.push({
      category: 'Energy',
      title: 'Install a Smart Thermostat',
      description: `A smart thermostat could optimize your heating and cooling, saving approximately ${thermostatSavings.toFixed(1)} kg CO₂ per month.`,
      impact: 'Medium',
      icon: ThermometerSun,
      saving: thermostatSavings
    });

    // Existing Food Recommendations
    const beefServings = parseFloat(formData.beefServings.amount || 0);
    if (beefServings > 2) {
      const beefSavings = beefServings * 6.61 * 2;
      recs.push({
        category: 'Diet',
        title: 'Reduce Beef Consumption',
        description: `Reducing your beef consumption by half could save approximately ${beefSavings.toFixed(1)} kg CO₂ per month. Consider plant-based alternatives or chicken.`,
        impact: 'Medium',
        icon: Utensils,
        saving: beefSavings
      });
    }

    // New Food/Shopping Recommendations
    const localFoodSavings = totalEmissions * 0.05; // 5% reduction from local food
    recs.push({
      category: 'Diet',
      title: 'Buy Local and Seasonal Food',
      description: `Choosing local, seasonal produce could reduce your carbon footprint by approximately ${localFoodSavings.toFixed(1)} kg CO₂ per month by reducing transportation emissions.`,
      impact: 'Medium',
      icon: ShoppingBag,
      saving: localFoodSavings
    });

    // Water Usage
    const waterSavings = totalEmissions * 0.03; // 3% reduction from water conservation
    recs.push({
      category: 'Water',
      title: 'Reduce Hot Water Usage',
      description: `Installing low-flow showerheads and washing clothes in cold water could save approximately ${waterSavings.toFixed(1)} kg CO₂ per month.`,
      impact: 'Low',
      icon: Droplet,
      saving: waterSavings
    });

    // Air Travel Alternative
    const airTravelSavings = totalEmissions * 0.15; // 15% potential reduction
    recs.push({
      category: 'Transportation',
      title: 'Consider Alternatives to Air Travel',
      description: `When possible, choose train travel or virtual meetings instead of flying. This could save approximately ${airTravelSavings.toFixed(1)} kg CO₂ per month.`,
      impact: 'High',
      icon: Plane,
      saving: airTravelSavings
    });

    // Existing Waste Management Recommendations
    if (formData.recycling !== 'always') {
      const recyclingSavings = totalEmissions * 0.05;
      recs.push({
        category: 'Waste',
        title: 'Improve Recycling Habits',
        description: 'Consistently recycling can reduce your carbon footprint by approximately 5%. Focus on recycling paper, plastic, glass, and metal.',
        impact: 'Medium',
        icon: Recycle,
        saving: recyclingSavings
      });
    }

    // New Waste/Consumption Recommendations
    const reusableSavings = totalEmissions * 0.02; // 2% reduction
    recs.push({
      category: 'Consumption',
      title: 'Use Reusable Products',
      description: `Switch to reusable bags, bottles, and containers. This could save approximately ${reusableSavings.toFixed(1)} kg CO₂ per month.`,
      impact: 'Low',
      icon: ShoppingBag,
      saving: reusableSavings
    });

    // Home Gardening
    const gardeningSavings = totalEmissions * 0.04; // 4% reduction
    recs.push({
      category: 'Lifestyle',
      title: 'Start a Home Garden',
      description: `Growing your own vegetables could save approximately ${gardeningSavings.toFixed(1)} kg CO₂ per month while providing fresh produce.`,
      impact: 'Low',
      icon: TreePine,
      saving: gardeningSavings
    });

    // Existing Home Efficiency
    if (gasUsage > 50) {
      const efficiencySavings = gasUsage * 5.3 * 0.2;
      recs.push({
        category: 'Energy',
        title: 'Improve Home Insulation',
        description: `Your natural gas usage suggests room for improvement. Better insulation could save approximately ${efficiencySavings.toFixed(1)} kg CO₂ per month.`,
        impact: 'Medium',
        icon: Home,
        saving: efficiencySavings
      });
    }

    // New Home Efficiency
    const ventilationSavings = totalEmissions * 0.04; // 4% reduction
    recs.push({
      category: 'Energy',
      title: 'Improve Natural Ventilation',
      description: `Using natural ventilation and ceiling fans instead of air conditioning when possible could save approximately ${ventilationSavings.toFixed(1)} kg CO₂ per month.`,
      impact: 'Low',
      icon: Wind,
      saving: ventilationSavings
    });

    if (formData.composting === 'no') {
      const compostingSavings = totalEmissions * 0.03;
      recs.push({
        category: 'Waste',
        title: 'Start Composting',
        description: `Starting a composting practice could reduce your carbon footprint by approximately ${compostingSavings.toFixed(1)} kg CO₂ per month.`,
        impact: 'Low',
        icon: Leaf,
        saving: compostingSavings
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