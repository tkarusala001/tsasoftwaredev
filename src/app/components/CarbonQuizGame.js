import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Heart, AlertTriangle, Sparkles, Zap, CheckCircle, XCircle, Award, Star, Brain, Target } from 'lucide-react';

const CarbonQuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameStats, setGameStats] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
    maxStreak: 0,
    questionsAttempted: 0
  });

  const questions = [
    {
      question: "Which activity generates the most CO₂ emissions?",
      options: [
        "Using AC for a month",
        "Taking a 4-hour flight",
        "Driving 100 miles in a gas car",
        "Eating beef for a week"
      ],
      correct: 1,
      explanation: "A 4-hour flight generates about 1 metric ton of CO₂ per passenger!",
      wrongExplanation: "While other activities also contribute to CO₂ emissions, air travel has a particularly high impact due to the altitude at which emissions occur and the amount of fuel burned."
    },
    {
      question: "How much CO₂ does one tree absorb per year on average?",
      options: [
        "100 pounds",
        "25 pounds",
        "48 pounds",
        "10 pounds"
      ],
      correct: 2,
      explanation: "That's right! A mature tree absorbs about 48 pounds of CO₂ annually through photosynthesis.",
      wrongExplanation: "The correct answer is 48 pounds. Trees are natural carbon sinks, and a mature tree can absorb approximately 48 pounds of CO₂ per year through photosynthesis."
    },
    {
      question: "What percentage of global CO₂ emissions come from transportation?",
      options: [
        "45%",
        "35%",
        "15%",
        "25%"
      ],
      correct: 3,
      explanation: "Correct! Transportation accounts for about 25% of global CO₂ emissions, making it one of the largest contributors to climate change.",
      wrongExplanation: "Transportation makes up approximately 25% of global CO₂ emissions. This includes emissions from cars, trucks, planes, ships, and other vehicles."
    },
    {
      question: "Which household appliance typically uses the most energy?",
      options: [
        "Microwave",
        "Dishwasher",
        "Water Heater",
        "Refrigerator"
      ],
      correct: 2,
      explanation: "Correct! Water heaters typically account for about 20% of home energy use, more than any other appliance.",
      wrongExplanation: "The water heater is actually the biggest energy consumer, accounting for about 20% of home energy use. This is due to the constant energy needed to maintain hot water."
    },
    {
      question: "How much can switching to LED bulbs reduce lighting energy use?",
      options: [
        "50%",
        "90%",
        "25%",
        "75%"
      ],
      correct: 1,
      explanation: "That's right! LED bulbs are incredibly efficient, using up to 90% less energy than traditional incandescent bulbs.",
      wrongExplanation: "LED bulbs can actually reduce energy use by up to 90%, making them one of the most effective energy-saving upgrades available."
    },
    {
      question: "What's the biggest source of food-related carbon emissions?",
      options: [
        "Food waste",
        "Food transportation",
        "Beef production",
        "Food packaging"
      ],
      correct: 2,
      explanation: "Correct! Beef production generates about 60 kg of CO₂ per kg of meat, making it the largest food-related source of emissions.",
      wrongExplanation: "Beef production is the largest source, generating about 60 kg of CO₂ per kg of meat. This is due to factors like methane from cattle and deforestation for grazing."
    },
    {
      question: "How much CO₂ does recycling one aluminum can save?",
      options: [
        "0.25 kg",
        "0.73 kg",
        "1.5 kg",
        "0.12 kg"
      ],
      correct: 1,
      explanation: "That's right! Recycling just one aluminum can saves 0.73 kg of CO₂. This shows how small actions can add up!",
      wrongExplanation: "Recycling one aluminum can saves 0.73 kg of CO₂. This is because recycling aluminum uses much less energy than producing new aluminum from raw materials."
    },
    {
      question: "What percentage of home energy is typically lost through poor insulation?",
      options: [
        "15-20%",
        "40-50%",
        "5-10%",
        "25-30%"
      ],
      correct: 3,
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
    const isCorrect = selectedIndex === questions[currentQuestion].correct;
    
    setGameStats(prev => ({
      ...prev,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      wrongAnswers: prev.wrongAnswers + (isCorrect ? 0 : 1),
      maxStreak: Math.max(prev.maxStreak, isCorrect ? streak + 1 : streak),
      questionsAttempted: prev.questionsAttempted + 1
    }));
    
    if (isCorrect) {
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
      if (lives > 1 || isCorrect) {
        if (currentQuestion + 1 === questions.length) {
          setGameOver(true);
          if (score > highScore) {
            localStorage.setItem('carbonQuizHighScore', score.toString());
            setHighScore(score);
          }
        } else {
          setCurrentQuestion(current => current + 1);
        }
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
    setGameStats({
      correctAnswers: 0,
      wrongAnswers: 0,
      maxStreak: 0,
      questionsAttempted: 0
    });
  };

  const renderGameOver = () => (
    <div className="text-center space-y-6">
      <Trophy className="w-20 h-20 mx-auto text-yellow-500" />
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Thanks for Playing!</h3>
        <p className="text-lg">You've completed the Carbon Footprint Quiz</p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="p-4 rounded-lg bg-secondary/20">
          <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
          <p className="text-sm font-medium">Final Score</p>
          <p className="text-xl font-bold">{score}</p>
        </div>
        <div className="p-4 rounded-lg bg-secondary/20">
          <Star className="w-6 h-6 mx-auto mb-2 text-blue-500" />
          <p className="text-sm font-medium">High Score</p>
          <p className="text-xl font-bold">{highScore}</p>
        </div>
        <div className="p-4 rounded-lg bg-secondary/20">
          <Brain className="w-6 h-6 mx-auto mb-2 text-green-500" />
          <p className="text-sm font-medium">Correct Answers</p>
          <p className="text-xl font-bold">{gameStats.correctAnswers}</p>
        </div>
        <div className="p-4 rounded-lg bg-secondary/20">
          <Zap className="w-6 h-6 mx-auto mb-2 text-orange-500" />
          <p className="text-sm font-medium">Best Streak</p>
          <p className="text-xl font-bold">{gameStats.maxStreak}</p>
        </div>
      </div>

      {score > highScore && (
        <div className="flex items-center justify-center gap-2 p-4 bg-yellow-500/20 rounded-lg">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          <p className="font-bold">New High Score!</p>
        </div>
      )}

      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Accuracy Rate: {Math.round((gameStats.correctAnswers / gameStats.questionsAttempted) * 100)}%
        </p>
        <Progress 
          value={(gameStats.correctAnswers / gameStats.questionsAttempted) * 100} 
          className="w-48 h-2"
        />
      </div>

      <Button 
        onClick={resetGame} 
        className="mt-4 px-8 py-2"
        size="lg"
      >
        Play Again
      </Button>
    </div>
  );

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
        {gameOver ? renderGameOver() : (
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