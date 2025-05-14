
import React, { useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartData } from '../types/analyst';

interface DataChartProps {
  data: ChartData;
  chartType: 'bar' | 'line';
}

const DataChart = ({ data, chartType }: DataChartProps) => {
  const chartKeys = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Get all keys except the one we're using for the X axis
    const keys = Object.keys(data[0]);
    // Assume first column is the x-axis
    return keys.slice(1);
  }, [data]);
  
  // Pick appropriate colors for each data series
  const colors = ['#6C63FF', '#33C3F0', '#9b87f5', '#7E69AB', '#D6BCFA'];

  if (!data || data.length === 0) {
    return null;
  }

  // Dynamic X axis based on first key
  const xAxisKey = Object.keys(data[0])[0];

  return (
    <div className="mt-4 h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === 'bar' ? (
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {chartKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {chartKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default DataChart;
