
export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface QueryResult {
  answer?: string;
  query?: string;
  result?: Record<string, any>[];
  chartType?: "bar" | "line";
  error?: string;
}

export type ChartData = Record<string, any>[];
