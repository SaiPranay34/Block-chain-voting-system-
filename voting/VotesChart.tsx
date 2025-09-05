import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Candidate } from '../../types';
import Card from '../ui/Card';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface VotesChartProps {
  candidates: Candidate[];
  votes: Record<string, number>;
}

const VotesChart: React.FC<VotesChartProps> = ({ candidates, votes }) => {
  const data = {
    labels: candidates.map(c => c.name),
    datasets: [
      {
        label: 'Number of Votes',
        data: candidates.map(c => votes[c.id] || 0),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Election Results',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  return (
    <Card className="h-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Live Results</h2>
        <p className="text-gray-600 text-sm">Total votes: {totalVotes}</p>
      </div>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
};

export default VotesChart;