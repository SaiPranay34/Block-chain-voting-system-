import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Candidate } from '../../store/electionStore';

interface ResultsChartProps {
  candidates: Candidate[];
}

const ResultsChart: React.FC<ResultsChartProps> = ({ candidates }) => {
  const chartData = candidates.map(candidate => ({
    name: candidate.name,
    votes: candidate.voteCount
  }));
  
  // Custom colors for the bars
  const colors = ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD'];
  
  return (
    <div className="card p-5">
      <h3 className="text-xl font-semibold mb-4">Vote Distribution</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 20, bottom: 50 }}
          >
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              textAnchor="end"
              angle={-45}
              height={70}
            />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: 'none'
              }}
            />
            <Bar dataKey="votes" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResultsChart;