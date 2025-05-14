
import { QueryResult } from '../types/analyst';

// Mock service for handling API responses during development
export const mockApiResponse = async (question: string): Promise<QueryResult> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const lowerQuestion = question.toLowerCase();
  
  // Route to appropriate mock data based on question
  if (lowerQuestion.includes('sales performance') || lowerQuestion.includes('sales over')) {
    return mockSalesPerformance();
  } else if (lowerQuestion.includes('top 5') || lowerQuestion.includes('top five')) {
    if (lowerQuestion.includes('customer')) {
      return mockTopCustomers();
    } else if (lowerQuestion.includes('product')) {
      return mockTopProducts();
    }
  } else if (lowerQuestion.includes('revenue') && lowerQuestion.includes('month')) {
    return mockMonthlyRevenue();
  } else if (lowerQuestion.includes('region') || lowerQuestion.includes('performance across')) {
    return mockRegionalData();
  }
  
  // Default response if no specific pattern matches
  return mockGenericResponse();
};

const mockSalesPerformance = (): QueryResult => {
  return {
    answer: "Here's our sales performance over the last 6 months. We see a generally positive trend with a notable increase in May and June.",
    query: "SELECT month, total_sales, profit_margin FROM sales WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH) GROUP BY month ORDER BY date",
    result: [
      { month: 'January', total_sales: 342000, profit_margin: 12.3 },
      { month: 'February', total_sales: 356000, profit_margin: 14.1 },
      { month: 'March', total_sales: 389000, profit_margin: 15.7 },
      { month: 'April', total_sales: 401000, profit_margin: 16.2 },
      { month: 'May', total_sales: 452000, profit_margin: 18.5 },
      { month: 'June', total_sales: 489000, profit_margin: 19.1 }
    ],
    chartType: "line" as const
  };
};

const mockTopCustomers = (): QueryResult => {
  return {
    answer: "These are our top 5 customers by revenue contribution in the current fiscal year.",
    query: "SELECT customer_name, revenue FROM customer_revenue WHERE fiscal_year = 2023 ORDER BY revenue DESC LIMIT 5",
    result: [
      { customer_name: 'Enterprise Corp', revenue: 1250000 },
      { customer_name: 'Megamart Inc', revenue: 890000 },
      { customer_name: 'Tech Solutions Ltd', revenue: 745000 },
      { customer_name: 'Global Industries', revenue: 680000 },
      { customer_name: 'Acme Corporation', revenue: 520000 }
    ],
    chartType: "bar" as const
  };
};

const mockTopProducts = (): QueryResult => {
  return {
    answer: "Here are our top 5 selling products from last quarter by units sold.",
    query: "SELECT product_name, units_sold, revenue FROM product_sales WHERE quarter = PREVIOUS_QUARTER() ORDER BY units_sold DESC LIMIT 5",
    result: [
      { product_name: 'Business Analytics Suite', units_sold: 1250, revenue: 625000 },
      { product_name: 'Cloud Integration Module', units_sold: 980, revenue: 392000 },
      { product_name: 'Data Security Package', units_sold: 840, revenue: 588000 },
      { product_name: 'Enterprise Collaboration Tool', units_sold: 720, revenue: 432000 },
      { product_name: 'Mobile Workforce Solution', units_sold: 690, revenue: 345000 }
    ],
    chartType: "bar" as const
  };
};

const mockMonthlyRevenue = (): QueryResult => {
  return {
    answer: "Here's the monthly revenue and new customer acquisition for this year so far.",
    query: "SELECT month, revenue, new_customers FROM monthly_metrics WHERE year = YEAR(CURRENT_DATE()) ORDER BY month_num",
    result: [
      { month: 'Jan', new_customers: 120, revenue: 450000 },
      { month: 'Feb', new_customers: 108, revenue: 429000 },
      { month: 'Mar', new_customers: 132, revenue: 470000 },
      { month: 'Apr', new_customers: 145, revenue: 520000 },
      { month: 'May', new_customers: 160, revenue: 580000 },
      { month: 'Jun', new_customers: 170, revenue: 605000 }
    ],
    chartType: "line" as const
  };
};

const mockRegionalData = (): QueryResult => {
  return {
    answer: "Here's a comparison of sales performance across our main regions for Q2.",
    query: "SELECT region, q2_sales, q2_target, growth_vs_q1 FROM regional_performance WHERE quarter = 'Q2' AND year = YEAR(CURRENT_DATE()) ORDER BY q2_sales DESC",
    result: [
      { region: 'North America', q2_sales: 1250000, q2_target: 1200000, growth_vs_q1: 12.5 },
      { region: 'Europe', q2_sales: 980000, q2_target: 1000000, growth_vs_q1: 9.8 },
      { region: 'Asia Pacific', q2_sales: 745000, q2_target: 800000, growth_vs_q1: 15.2 },
      { region: 'Latin America', q2_sales: 420000, q2_target: 400000, growth_vs_q1: 7.5 },
      { region: 'Middle East', q2_sales: 325000, q2_target: 300000, growth_vs_q1: 14.2 }
    ],
    chartType: "bar" as const
  };
};

const mockGenericResponse = (): QueryResult => {
  return {
    answer: "Based on your question, here's a general overview of our quarterly performance metrics.",
    query: "SELECT quarter, revenue, costs, profit FROM quarterly_performance WHERE year = YEAR(CURRENT_DATE()) ORDER BY quarter",
    result: [
      { quarter: 'Q1', revenue: 1250000, costs: 750000, profit: 500000 },
      { quarter: 'Q2', revenue: 1450000, costs: 820000, profit: 630000 },
      { quarter: 'Q3', revenue: 1380000, costs: 790000, profit: 590000 },
      { quarter: 'Q4', revenue: 1520000, costs: 840000, profit: 680000 }
    ],
    chartType: "bar" as const
  };
};
