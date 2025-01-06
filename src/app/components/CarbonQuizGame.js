import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Heart, AlertTriangle, Sparkles, Zap, CheckCircle, XCircle } from 'lucide-react';

const CarbonQuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      question: "Which activity generates the most CO₂ emissions?",
      options: [
        "Taking a 4-hour flight",
        "Driving 100 miles in a gas car",
        "Using AC for a month",
        "Eating beef for a week"
      ],
      correct: 0,
      explanation: "A 4-hour flight generates about 1 metric ton of CO₂ per passenger!",
      wrongExplanation: "While other activities also contribute to CO₂ emissions, air travel has a particularly high impact due to the altitude at which emissions occur and the amount of fuel burned."
    },
    {
      question: "How much CO₂ does one tree absorb per year on average?",
      options: [
        "48 pounds",
        "10 pounds",
        "100 pounds",
        "25 pounds"
      ],
      correct: 0,
      explanation: "That's right! A mature tree absorbs about 48 pounds of CO₂ annually through photosynthesis.",
      wrongExplanation: "The correct answer is 48 pounds. Trees are natural carbon sinks, and a mature tree can absorb approximately 48 pounds of CO₂ per year through photosynthesis."
    },
    {
      question: "What percentage of global CO₂ emissions come from transportation?",
      options: [
        "25%",
        "15%",
        "35%",
        "45%"
      ],
      correct: 0,
      explanation: "Correct! Transportation accounts for about 25% of global CO₂ emissions, making it one of the largest contributors to climate change.",
      wrongExplanation: "Transportation makes up approximately 25% of global CO₂ emissions. This includes emissions from cars, trucks, planes, ships, and other vehicles."
    },
    {
      question: "Which household appliance typically uses the most energy?",
      options: [
        "Water Heater",
        "Refrigerator",
        "Dishwasher",
        "Microwave"
      ],
      correct: 0,
      explanation: "Correct! Water heaters typically account for about 20% of home energy use, more than any other appliance.",
      wrongExplanation: "The water heater is actually the biggest energy consumer, accounting for about 20% of home energy use. This is due to the constant energy needed to maintain hot water."
    },
    {
      question: "How much can switching to LED bulbs reduce lighting energy use?",
      options: [
        "75%",
        "25%",
        "50%",
        "90%"
      ],
      correct: 3,
      explanation: "That's right! LED bulbs are incredibly efficient, using up to 90% less energy than traditional incandescent bulbs.",
      wrongExplanation: "LED bulbs can actually reduce energy use by up to 90%, making them one of the most effective energy-saving upgrades available."
    },
    {
      question: "What's the biggest source of food-related carbon emissions?",
      options: [
        "Beef production",
        "Food transportation",
        "Food packaging",
        "Food waste"
      ],
      correct: 0,
      explanation: "Correct! Beef production generates about 60 kg of CO₂ per kg of meat, making it the largest food-related source of emissions.",
      wrongExplanation: "Beef production is the largest source, generating about 60 kg of CO₂ per kg of meat. This is due to factors like methane from cattle and deforestation for grazing."
    },
    {
      question: "How much CO₂ does recycling one aluminum can save?",
      options: [
        "0.73 kg",
        "0.12 kg",
        "1.5 kg",
        "0.25 kg"
      ],
      correct: 0,
      explanation: "That's right! Recycling just one aluminum can saves 0.73 kg of CO₂. This shows how small actions can add up!",
      wrongExplanation: "Recycling one aluminum can saves 0.73 kg of CO₂. This is because recycling aluminum uses much less energy than producing new aluminum from raw materials."
    },
    {
      question: "What percentage of home energy is typically lost through poor insulation?",
      options: [
        "25-30%",
        "5-10%",
        "40-50%",
        "15-20%"
      ],
      correct: 0,
      explanation: "Correct! About 25-30% of heating/cooling energy is lost through poor insulation, making it a critical area for improvement.",
      wrongExplanation: "Poor insulation typically leads to 25-30% energy loss in homes. This significant loss makes proper insulation one of the most effective ways to reduce energy consumption."
    }
  ];

  useEffect(() => {
    const stored = localStorage.getItem('carbonQuizHighScore');
    if (stored) setHighScore(parseInt(stored));
  }, []);

  const handleAnswer = (selectedIndex) => {
    setShowAnswer(true);
    setSelectedAnswer(selectedIndex);
    
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + (100 * (streak + 1)));
      setStreak(streak + 1);
    } else {
      setLives(lives - 1);
      setStreak(0);
      if (lives <= 1) {
        setGameOver(true);
        if (score > highScore) {
          localStorage.setItem('carbonQuizHighScore', score.toString());
          setHighScore(score);
        }
      }
    }

    setTimeout(() => {
      setShowAnswer(false);
      setSelectedAnswer(null);
      if (lives > 1 || selectedIndex === questions[currentQuestion].correct) {
        setCurrentQuestion((current) => (current + 1) % questions.length);
      }
    }, 3000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setStreak(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Carbon Footprint Quiz</span>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              {score}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              {lives}
            </Badge>
            {streak > 0 && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                x{streak}
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {gameOver ? (
          <div className="text-center space-y-4">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
            <h3 className="text-xl font-bold">Game Over!</h3>
            <p>Final Score: {score}</p>
            {score > highScore && (
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <p>New High Score!</p>
              </div>
            )}
            <p>Previous High Score: {highScore}</p>
            <Button onClick={resetGame} className="mt-4">
              Play Again
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Progress value={(currentQuestion / questions.length) * 100} className="w-full" />
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {questions[currentQuestion].question}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showAnswer}
                    variant={
                      showAnswer
                        ? index === questions[currentQuestion].correct
                          ? "default"
                          : selectedAnswer === index
                            ? "destructive"
                            : "outline"
                        : "outline"
                    }
                    className={`h-auto py-4 px-6 text-left ${
                      showAnswer && index === questions[currentQuestion].correct
                        ? "bg-green-600 hover:bg-green-700"
                        : ""
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {showAnswer && (
                <div className={`flex items-start gap-2 p-4 rounded-lg mt-4 ${
                  selectedAnswer === questions[currentQuestion].correct
                    ? "bg-green-900/20"
                    : "bg-red-900/20"
                }`}>
                  {selectedAnswer === questions[currentQuestion].correct ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mt-1" />
                  )}
                  <p>{selectedAnswer === questions[currentQuestion].correct
                    ? questions[currentQuestion].explanation
                    : questions[currentQuestion].wrongExplanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CarbonQuizGame;