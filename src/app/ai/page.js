// app/ai/page.js
"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState, useRef, useEffect } from 'react';
import { Leaf, Send, ThumbsUp, ThumbsDown, Image, Sparkles, Info, RefreshCw, X, Home } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';

export default function EcoAI() {
  // Initial message with the original welcome message
  const INITIAL_MESSAGE = {
    role: 'assistant', 
    content: 'Hi there! I\'m your EcoScan AI assistant. I can help answer questions about sustainability, eco-friendly practices, and how to make better environmental choices. How can I assist you today?'
  };

  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const chatEndRef = useRef(null);

  // Predefined context about EcoScan
  const ECOSCAN_CONTEXT = `
You are an AI assistant for EcoScan, a comprehensive eco-friendly product analysis application.

App Overview:
- EcoScan helps users understand the sustainability of everyday products
- Provides clear insights into the environmental impact of items
- Offers alternatives for more sustainable choices
- Focuses on education and actionable eco-friendly information

Key Features:
1. Sustainability Scanning
- Users can upload photos of products to analyze sustainability
- AI provides a sustainability score from 1-10
- Detailed breakdown of positive and negative environmental impacts

2. Eco-friendly Education
- Information about sustainable materials and production methods
- Tips for reducing personal environmental footprint
- Explanation of sustainability certifications and labels

3. Alternative Suggestions
- Recommendations for more eco-friendly product options
- Links to verified sustainable brands when available
- Tips for extending product life or proper recycling

4. Environmental Impact Categories
- Carbon footprint
- Water usage
- Material sustainability
- End-of-life recyclability or biodegradability
- Manufacturing ethics

5. Personalized Recommendations
- Based on user's previous scans and interests
- Tailored sustainability tips
- Progress tracking for eco-friendly choices

Limitations:
- Analysis based on visual appearance and provided information
- Cannot detect chemicals or hidden components
- Relies on public information about manufacturing processes

Always be encouraging and positive about sustainability efforts, while being honest about environmental impacts.
`;

  // Suggested questions for users
  const suggestedQuestions = [
    [
      "What makes a product sustainable?",
      "How accurate is the sustainability scanning?",
      "Tips for reducing plastic waste?"
    ],
    [
      "What are sustainable clothing materials?",
      "How to recycle electronics properly?",
      "What eco-friendly certifications should I look for?"
    ],
    [
      "Is bamboo truly sustainable?",
      "How to reduce my carbon footprint?",
      "Are biodegradable plastics actually good?"
    ]
  ];

  // Rotate suggestion sets every 45 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSuggestionIndex((prevIndex) => (prevIndex + 1) % suggestedQuestions.length);
    }, 45000);
    
    return () => clearInterval(interval);
  }, []);

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (messageToSend = inputMessage) => {
    if (!messageToSend.trim()) return;

    // Add user message
    const newMessages = [
      ...messages, 
      { role: 'user', content: messageToSend }
    ];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare prompt with context
      const prompt = `
${ECOSCAN_CONTEXT}

User Question: ${messageToSend}

Please provide a helpful, specific, and friendly answer based on the EcoScan app context. If the question is not directly related to sustainability or eco-friendly topics, politely redirect the conversation toward environmental topics. Use an encouraging, positive tone while still being factual about environmental impacts.
      `;

      // Generate AI response
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Add AI response to messages
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'assistant', content: text }
      ]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      
      // More detailed error logging
      let errorMessage = "I'm sorry, there was an error processing your request. ";
      
      if (error.message) {
        errorMessage += `Error details: ${error.message}`;
        console.log("Error message:", error.message);
      }
      
      setMessages(prevMessages => [
        ...prevMessages, 
        { 
          role: 'assistant', 
          content: errorMessage
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle suggested question click
  const handleSuggestion = (question) => {
    handleSendMessage(question);
  };

  // Clear conversation history
  const handleClearHistory = () => {
    setMessages([INITIAL_MESSAGE]);
    setIsAlertOpen(false);
  };

  return (
    <div className="container mx-auto py-6 px-4 h-screen flex flex-col">
      {/* Home button */}
      <div className="mb-4">
        <Link href="/">
          <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2">
            <Home size={18} />
            <span>Back to Home</span>
          </Button>
        </Link>
      </div>
      
      <Card className="flex-1 flex flex-col shadow-xl shadow-green-100 border-2 border-green-100 rounded-xl overflow-hidden">
        {/* Header with gradient and logo */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Leaf size={24} className="text-white" />
            <h3 className="text-lg font-bold">EcoAI Assistant</h3>
          </div>
          <div className="flex items-center space-x-2">
            {/* Info button with tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-white/20"
                  >
                    <Info size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p className="max-w-60">Ask me anything about sustainability, eco-friendly products, or environmental impacts!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Clear History Alert Dialog */}
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsAlertOpen(true)}
                >
                  <RefreshCw size={20} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Conversation History?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove all messages except the initial welcome message. 
                    Are you sure you want to clear the conversation?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearHistory} className="bg-green-600 hover:bg-green-700">
                    Clear History
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Chat Content */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-green-50/50">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex items-start space-x-2 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="bg-white p-2 rounded-full shadow-md">
                  <Leaf size={20} className="text-green-600" />
                </div>
              )}
              <div 
                className={`p-3 rounded-2xl max-w-[280px] shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-800'
                }`}
              >
                {msg.content}
                {msg.role === 'assistant' && (
                  <div className="flex justify-end mt-2 space-x-1 opacity-70">
                    <button className="hover:text-green-600 transition-colors p-1">
                      <ThumbsUp size={12} />
                    </button>
                    <button className="hover:text-red-600 transition-colors p-1">
                      <ThumbsDown size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start items-center space-x-2">
              <div className="bg-white p-2 rounded-full shadow-md">
                <Leaf size={20} className="text-green-600" />
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-md relative">
                <div className="typing-indicator flex space-x-1">
                  <div className="w-2 h-2 bg-green-600/70 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-green-600/70 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-green-600/70 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </CardContent>

        {/* Suggestions */}
        <div className="px-4 py-2 bg-white border-t border-green-100">
          <p className="text-xs text-green-600 mb-2 flex items-center">
            <Sparkles size={12} className="mr-1" /> Suggested questions:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions[suggestionIndex].map((question, i) => (
              <Badge 
                key={i} 
                variant="outline" 
                className="cursor-pointer hover:bg-green-50 border-green-200 text-green-700"
                onClick={() => handleSuggestion(question)}
              >
                {question}
              </Badge>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <CardFooter className="border-t border-green-100 p-4 bg-white">
          <div className="flex space-x-2 w-full">
            <Button
              variant="outline"
              size="icon"
              className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-700"
            >
              <Image size={18} />
            </Button>
            <Input 
              placeholder="Ask about sustainability..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-black flex-1 border-green-200 focus:ring-2 focus:ring-green-300 rounded-full"
            />
            <Button 
              onClick={() => handleSendMessage()} 
              disabled={!inputMessage.trim() || isLoading}
              className="rounded-full bg-green-600 hover:bg-green-700 transition-all"
              size="icon"
            >
              <Send size={18} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}