
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';

interface SqlDisplayProps {
  query: string;
}

const SqlDisplay = ({ query }: SqlDisplayProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!query) return null;

  return (
    <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Code size={16} className="text-analyst-dark" />
          <span className="text-sm font-medium">SQL Query</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-gray-600 hover:text-analyst-primary"
        >
          {isExpanded ? 'Hide' : 'Show'} query
        </Button>
      </div>
      {isExpanded && (
        <div className="bg-gray-50 p-4 overflow-x-auto">
          <pre className="text-xs text-gray-700 whitespace-pre-wrap">{query}</pre>
        </div>
      )}
    </div>
  );
};

export default SqlDisplay;
