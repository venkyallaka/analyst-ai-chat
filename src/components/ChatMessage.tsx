
import React from 'react';
import { Message } from '../types/analyst';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={cn(
        "flex w-full my-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isUser 
            ? "bg-analyst-primary text-white rounded-tr-none" 
            : "bg-gray-100 text-gray-800 rounded-tl-none"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <p className={cn(
          "text-xs mt-1",
          isUser ? "text-gray-200" : "text-gray-500"
        )}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
