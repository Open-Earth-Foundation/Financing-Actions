import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { getHazardColor } from '../../constants/hazardColors';

// Custom shape for rounded bars
const RoundedBar = (props) => {
  const { fill, x, y, width, height } = props;

  const radius = 2; // Adjust this value to change the roundedness

  return (
    <g>
      <path
        d={`
          M${x},${y + height}
          L${x},${y + radius}
          Q${x},${y} ${x + radius},${y}
          L${x + width - radius},${y}
          Q${x + width},${y} ${x + width},${y + radius}
          L${x + width},${y + height}
          L${x},${y + height}
          Z
        `}
        fill={fill}
      />
    </g>
  );
};

const RiskDistributionChart = ({ riskAssessment }) => {
  // Transform data for stacked bar chart
  const sectorData = riskAssessment.reduce((acc, item) => {
    const sector = item.keyimpact || 'Other';
    const hazard = item.hazard?.toLowerCase() || 'unknown';
    const score = item.risk_score || 0;

    if (!acc[sector]) {
      acc[sector] = { sector };
    }
    acc[sector][hazard] = score;
    return acc;
  }, {});

  const data = Object.values(sectorData);
  const hazards = [...new Set(riskAssessment.map(item => item.hazard?.toLowerCase()))];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="sector"
          tick={{ fill: '#6b7280' }}
          interval={0}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis
          tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
          tick={{ fill: '#6b7280' }}
        />
        <Tooltip
          formatter={(value) => `${(value * 100).toFixed(1)}%`}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '6px'
          }}
        />
        <Legend />
        {hazards.map(hazard => (
          <Bar
            key={hazard}
            dataKey={hazard}
            stackId="a"
            fill={getHazardColor(hazard)}
            name={hazard.charAt(0).toUpperCase() + hazard.slice(1)}
            shape={<RoundedBar />}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RiskDistributionChart;