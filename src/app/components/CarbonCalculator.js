import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import CarbonRecommendations from '../components/CarbonRecommendation';

const CarbonCalculator = () => {
  const [formData, setFormData] = useState({
    // Home Energy
    electricity: { amount: '', unit: 'kWh' },
    naturalGas: { amount: '', unit: 'therms' },
    
    // Transportation
    carMileage: { amount: '', frequency: 'weekly' },
    carType: 'gasoline',
    publicTransit: { amount: '', frequency: 'weekly' },
    
    // Food & Consumption
    beefServings: { amount: '', frequency: 'weekly' },
    porkServings: { amount: '', frequency: 'weekly' },
    poultryServings: { amount: '', frequency: 'weekly' },
    dairyServings: { amount: '', frequency: 'weekly' },
    
    // Waste
    recycling: 'sometimes',
    composting: 'no',
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (name, value, subfield = null) => {
    setFormData(prev => ({
      ...prev,
      [name]: subfield ? { ...prev[name], [subfield]: value } : value
    }));
  };

  const calculateEmissions = () => {
    // Enhanced calculations (values are approximate for demonstration)
    let totalEmissions = 0;

    // Home Energy
    totalEmissions += parseFloat(formData.electricity.amount || 0) * 0.92; // kWh to kg CO2
    totalEmissions += parseFloat(formData.naturalGas.amount || 0) * 5.3; // therms to kg CO2

    // Transportation
    const carMileageMonthly = parseFloat(formData.carMileage.amount || 0) * 
      (formData.carMileage.frequency === 'weekly' ? 4 : 1);
    const carEmissionFactor = formData.carType === 'electric' ? 0.1 : 
      formData.carType === 'hybrid' ? 0.2 : 0.404;
    totalEmissions += carMileageMonthly * carEmissionFactor;

    // Food (monthly calculations)
    const beefEmissions = parseFloat(formData.beefServings.amount || 0) * 6.61 * 4;
    const porkEmissions = parseFloat(formData.porkServings.amount || 0) * 3.8 * 4;
    const poultryEmissions = parseFloat(formData.poultryServings.amount || 0) * 2.1 * 4;
    const dairyEmissions = parseFloat(formData.dairyServings.amount || 0) * 1.9 * 4;
    
    totalEmissions += beefEmissions + porkEmissions + poultryEmissions + dairyEmissions;

    // Waste reduction credits
    if (formData.recycling === 'always') totalEmissions *= 0.95;
    if (formData.composting === 'yes') totalEmissions *= 0.97;

    setResult(totalEmissions);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Carbon Footprint Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Home Energy Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Home Energy Usage</h3>
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="electricity">Monthly Electricity Usage (kWh)</Label>
              <Input
                id="electricity"
                type="number"
                placeholder="e.g., 900"
                value={formData.electricity.amount}
                onChange={(e) => handleInputChange('electricity', e.target.value, 'amount')}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="naturalGas">Monthly Natural Gas (therms)</Label>
              <Input
                id="naturalGas"
                type="number"
                placeholder="e.g., 50"
                value={formData.naturalGas.amount}
                onChange={(e) => handleInputChange('naturalGas', e.target.value, 'amount')}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Transportation Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Transportation</h3>
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="carMileage">Car Mileage</Label>
              <div className="flex gap-2">
                <Input
                  id="carMileage"
                  type="number"
                  placeholder="Distance"
                  value={formData.carMileage.amount}
                  onChange={(e) => handleInputChange('carMileage', e.target.value, 'amount')}
                  className="mt-1"
                />
                <Select 
                  value={formData.carMileage.frequency}
                  onValueChange={(value) => handleInputChange('carMileage', value, 'frequency')}
                >
                  <SelectTrigger className="w-[140px] mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="carType">Vehicle Type</Label>
              <Select 
                value={formData.carType}
                onValueChange={(value) => handleInputChange('carType', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gasoline">Gasoline</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Food Consumption Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Food Consumption</h3>
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="beefServings">Beef Servings</Label>
              <div className="flex gap-2">
                <Input
                  id="beefServings"
                  type="number"
                  placeholder="Servings"
                  value={formData.beefServings.amount}
                  onChange={(e) => handleInputChange('beefServings', e.target.value, 'amount')}
                  className="mt-1"
                />
                <Select 
                  value={formData.beefServings.frequency}
                  onValueChange={(value) => handleInputChange('beefServings', value, 'frequency')}
                >
                  <SelectTrigger className="w-[140px] mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="porkServings">Pork Servings</Label>
              <div className="flex gap-2">
                <Input
                  id="porkServings"
                  type="number"
                  placeholder="Servings"
                  value={formData.porkServings.amount}
                  onChange={(e) => handleInputChange('porkServings', e.target.value, 'amount')}
                  className="mt-1"
                />
                <Select 
                  value={formData.porkServings.frequency}
                  onValueChange={(value) => handleInputChange('porkServings', value, 'frequency')}
                >
                  <SelectTrigger className="w-[140px] mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="poultryServings">Poultry Servings</Label>
              <div className="flex gap-2">
                <Input
                  id="poultryServings"
                  type="number"
                  placeholder="Servings"
                  value={formData.poultryServings.amount}
                  onChange={(e) => handleInputChange('poultryServings', e.target.value, 'amount')}
                  className="mt-1"
                />
                <Select 
                  value={formData.poultryServings.frequency}
                  onValueChange={(value) => handleInputChange('poultryServings', value, 'frequency')}
                >
                  <SelectTrigger className="w-[140px] mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="dairyServings">Dairy Servings</Label>
              <div className="flex gap-2">
                <Input
                  id="dairyServings"
                  type="number"
                  placeholder="Servings"
                  value={formData.dairyServings.amount}
                  onChange={(e) => handleInputChange('dairyServings', e.target.value, 'amount')}
                  className="mt-1"
                />
                <Select 
                  value={formData.dairyServings.frequency}
                  onValueChange={(value) => handleInputChange('dairyServings', value, 'frequency')}
                >
                  <SelectTrigger className="w-[140px] mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Waste Management Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Waste Management</h3>
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="recycling">How often do you recycle?</Label>
              <Select 
                value={formData.recycling}
                onValueChange={(value) => handleInputChange('recycling', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="always">Always</SelectItem>
                  <SelectItem value="sometimes">Sometimes</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="composting">Do you compost?</Label>
              <Select 
                value={formData.composting}
                onValueChange={(value) => handleInputChange('composting', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button 
          onClick={calculateEmissions}
          className="w-full"
        >
          Calculate Carbon Footprint
        </Button>

        {result !== null && (
  <>
    <div className="mt-6 p-6 bg-gray-100 rounded-lg">
      <p className="text-center text-lg font-semibold text-black">
        Your Estimated Monthly Carbon Footprint
      </p>
      <p className="text-center text-4xl font-bold text-green-600 mt-3">
        {result.toFixed(2)} kg CO₂
      </p>
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p className="text-center">
          Average monthly footprint in developed countries: ~400 kg CO₂
        </p>
        <p className="text-center">
          Sustainable monthly target: ~150 kg CO₂
        </p>
      </div>
    </div>
    <CarbonRecommendations formData={formData} totalEmissions={result} />
  </>
)}
      </CardContent>
    </Card>
  );
};

export default CarbonCalculator;