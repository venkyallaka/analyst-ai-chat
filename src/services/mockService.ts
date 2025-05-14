
import { QueryResult } from '../types/analyst';

// Mock data for development and testing
const mockData: Record<string, QueryResult> = {
  "Show me our sales performance over the last 6 months": {
    answer: "Here's your sales performance over the last 6 months. I can see that sales were highest in April at $842,500, followed closely by March at $791,300. There was a slight dip in May, but sales have been trending upward overall.",
    query: "SELECT month, sales_amount FROM monthly_sales WHERE date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) ORDER BY date ASC;",
    result: [
      { month: "January", sales_amount: 645800 },
      { month: "February", sales_amount: 728400 },
      { month: "March", sales_amount: 791300 },
      { month: "April", sales_amount: 842500 },
      { month: "May", sales_amount: 803200 },
      { month: "June", sales_amount: 825600 }
    ],
    chartType: "line"
  },
  "Who are our top 5 customers by revenue?": {
    answer: "Based on our analysis, Enterprise Corp is our highest value customer with $1.25M in revenue. TechGiant follows closely with $980K. These top 5 customers represent 36% of our total revenue.",
    query: "SELECT customer_name, SUM(revenue) as total_revenue FROM transactions GROUP BY customer_name ORDER BY total_revenue DESC LIMIT 5;",
    result: [
      { customer_name: "Enterprise Corp", total_revenue: 1250000 },
      { customer_name: "TechGiant Inc", total_revenue: 980000 },
      { customer_name: "Global Services Ltd", total_revenue: 875000 },
      { customer_name: "Acme Industries", total_revenue: 742000 },
      { customer_name: "Innovate Solutions", total_revenue: 693000 }
    ],
    chartType: "bar"
  },
  "Show me monthly revenue for this year": {
    answer: "Looking at this year's monthly revenue, we see a strong upward trend with June being our best month so far at $1.2M. Q1 performance was lower than expected but Q2 showed significant growth of 28% compared to Q1.",
    query: "SELECT month_name, revenue FROM monthly_revenue WHERE year = YEAR(CURDATE()) ORDER BY month_number;",
    result: [
      { month_name: "January", revenue: 850000 },
      { month_name: "February", revenue: 920000 },
      { month_name: "March", revenue: 980000 },
      { month_name: "April", revenue: 1050000 },
      { month_name: "May", revenue: 1150000 },
      { month_name: "June", revenue: 1200000 }
    ],
    chartType: "bar"
  },
  "What were our top 5 selling products last quarter?": {
    answer: "Last quarter, the Premium Suite was our top-selling product with 1,850 units sold, generating $925K in revenue. Enterprise Solution came in second with 1,320 units. The Developer Toolkit showed strong growth despite being a newer product.",
    query: "SELECT product_name, units_sold, revenue FROM product_sales WHERE quarter = CONCAT('Q', QUARTER(DATE_SUB(CURDATE(), INTERVAL 1 QUARTER))) AND year = YEAR(CURDATE()) ORDER BY units_sold DESC LIMIT 5;",
    result: [
      { product_name: "Premium Suite", units_sold: 1850, revenue: 925000 },
      { product_name: "Enterprise Solution", units_sold: 1320, revenue: 792000 },
      { product_name: "Professional Package", units_sold: 980, revenue: 392000 },
      { product_name: "Basic License", units_sold: 2450, revenue: 245000 },
      { product_name: "Developer Toolkit", units_sold: 740, revenue: 333000 }
    ],
    chartType: "bar"
  },
  "Compare sales performance across regions for Q2": {
    answer: "In Q2, North America led our sales with $2.4M, representing 42% of global revenue. Europe showed strong growth at $1.8M, while Asia-Pacific and Latin America contributed $1.1M and $0.6M respectively. Middle East & Africa remains our smallest region at $0.3M but showed the highest growth rate at 18% YoY.",
    query: "SELECT region, sales_amount FROM regional_sales WHERE quarter = 'Q2' AND year = YEAR(CURDATE()) ORDER BY sales_amount DESC;",
    result: [
      { region: "North America", sales_amount: 2400000 },
      { region: "Europe", sales_amount: 1800000 },
      { region: "Asia-Pacific", sales_amount: 1100000 },
      { region: "Latin America", sales_amount: 600000 },
      { region: "Middle East & Africa", sales_amount: 300000 }
    ],
    chartType: "bar"
  }
};

// Generic fallback to handle arbitrary questions
const fallbackResponse = {
  answer: "Based on the analysis of your data, I can see trends showing improved performance in the last quarter. Key metrics are trending upward, especially in the customer acquisition segment.",
  query: "SELECT month, new_customers, revenue FROM business_metrics ORDER BY month ASC LIMIT 6;",
  result: [
    { month: "Jan", new_customers: 120, revenue: 450000 },
    { month: "Feb", new_customers: 132, revenue: 485000 },
    { month: "Mar", new_customers: 141, revenue: 510000 },
    { month: "Apr", new_customers: 158, revenue: 585000 },
    { month: "May", new_customers: 163, revenue: 612000 },
    { month: "Jun", new_customers: 175, revenue: 658000 }
  ],
  chartType: "line"
};

// Function to get a response with a small delay to simulate network request
export const getMockResponse = (question: string): Promise<QueryResult> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Look for exact match first
      if (mockData[question]) {
        resolve(mockData[question]);
        return;
      }
      
      // Check for partial matches
      const matchingKey = Object.keys(mockData).find(key => 
        question.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(question.toLowerCase())
      );
      
      if (matchingKey) {
        resolve(mockData[matchingKey]);
      } else {
        // Use fallback for questions we don't have specific answers for
        resolve(fallbackResponse);
      }
    }, 1500); // 1.5 second delay to simulate API call
  });
};
