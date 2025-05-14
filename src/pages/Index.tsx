
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import VisualResult from '../components/VisualResult';
import { Message, QueryResult } from '../types/analyst';
import { askQuestion } from '../services/api';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<QueryResult | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    // Create and add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setCurrentResult(null);
    
    try {
      // Make API call to get response
      const result = await askQuestion(content);
      
      if (result.error) {
        toast.error(result.error);
        return;
      }
      
      // Create assistant message from result
      const assistantMessage: Message = {
        id: uuidv4(),
        content: result.answer || "I've analyzed your data and prepared a visualization.",
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setCurrentResult(result);
    } catch (error) {
      console.error('Error processing question:', error);
      toast.error('Failed to process your question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // For demonstration purpose - adding mock data interaction
  const handleMockQuery = () => {
    const mockQuestions = [
      "Show me monthly revenue for this year",
      "What were our top 5 selling products last quarter?",
      "Compare sales performance across regions for Q2"
    ];
    
    const randomIndex = Math.floor(Math.random() * mockQuestions.length);
    handleSendMessage(mockQuestions[randomIndex]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <main className="flex-1 overflow-hidden bg-gray-50 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="max-w-md text-center">
              <h2 className="text-2xl font-bold text-analyst-dark mb-4">
                Welcome to AI Business Analyst
              </h2>
              <p className="text-gray-600 mb-6">
                Ask questions about your business data in plain English and get instant insights with visualizations.
              </p>
              <div className="space-y-3">
                <div 
                  className="p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => handleSendMessage("Show me our sales performance over the last 6 months")}
                >
                  <p className="text-analyst-primary">
                    "Show me our sales performance over the last 6 months"
                  </p>
                </div>
                <div 
                  className="p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => handleSendMessage("Who are our top 5 customers by revenue?")}
                >
                  <p className="text-analyst-primary">
                    "Who are our top 5 customers by revenue?"
                  </p>
                </div>
                <div 
                  className="p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition"
                  onClick={handleMockQuery}
                >
                  <p className="text-analyst-primary">Try a random business question</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto">
              {messages.map((message, index) => (
                <React.Fragment key={message.id}>
                  <ChatMessage message={message} />
                  {message.role === 'assistant' && index === messages.length - 1 && currentResult && (
                    <VisualResult result={currentResult} />
                  )}
                </React.Fragment>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
        
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <ChatInput onSend={handleSendMessage} isLoading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
