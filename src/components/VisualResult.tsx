
import React from 'react';
import { QueryResult } from '../types/analyst';
import SqlDisplay from './SqlDisplay';
import DataTable from './DataTable';
import DataChart from './DataChart';

interface VisualResultProps {
  result: QueryResult;
}

const VisualResult = ({ result }: VisualResultProps) => {
  if (!result || !result.result || result.result.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      {result.query && <SqlDisplay query={result.query} />}
      
      {result.result && (
        <>
          <h3 className="text-md font-medium mt-4 mb-2">Data Results</h3>
          <DataTable data={result.result} />
        </>
      )}
      
      {result.result && result.chartType && (
        <>
          <h3 className="text-md font-medium mt-6 mb-2">Visualization</h3>
          <DataChart data={result.result} chartType={result.chartType} />
        </>
      )}
    </div>
  );
};

export default VisualResult;
