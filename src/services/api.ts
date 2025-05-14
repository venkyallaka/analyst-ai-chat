
import axios from 'axios';
import { QueryResult } from '../types/analyst';
import { mockApiResponse } from './mockService';

const isDev = import.meta.env.DEV;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const askQuestion = async (question: string): Promise<QueryResult> => {
  try {
    // Use mock service in development mode
    if (isDev) {
      return await mockApiResponse(question);
    }
    
    // In production, use actual API
    const response = await api.post('/ask-question', { question });
    return response.data;
  } catch (error) {
    console.error('Error asking question:', error);
    return {
      error: 'Failed to get response. Please try again later.',
    };
  }
};
