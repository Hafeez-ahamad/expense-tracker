import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Charts = ({ expenses }) => {
  const categories = [...new Set(expenses.map((expense) => expense.category))];
  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses',
        data: categories.map((category) =>
          expenses
            .filter((expense) => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0)
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expense Distribution by Category',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Charts;
