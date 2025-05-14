
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4 border-t border-gray-200">
      <div className="flex-1 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your business data..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-analyst-primary"
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit" 
        disabled={!input.trim() || isLoading}
        className="bg-analyst-primary hover:bg-analyst-secondary text-white"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
            <span>Processing</span>
          </div>
        ) : (
          <div className="flex items-center">
            <Send className="mr-2 h-4 w-4" />
            <span>Send</span>
          </div>
        )}
      </Button>
    </form>
  );
};

export default ChatInput;
