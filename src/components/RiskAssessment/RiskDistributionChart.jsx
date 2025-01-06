import React, { useMemo, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { getHazardColor } from '../../constants/hazardColors';
import { getRiskLevel, formatScore } from '../../constants/riskLevels';

const RoundedBar = (props) => {
  const { fill, x, y, width, height } = props;
  const radius = 2;

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
        opacity={0.8}
      />
    </g>
  );
};

const CustomXAxisTick = ({ x, y, payload }) => {
  const maxLength = 15;

  const truncateText = (text) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#6B7280"
        fontSize={12}
        transform="rotate(-45)"
      >
        {truncateText(payload.value)}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  const { t } = useTranslation();

  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <p className="text-sm font-medium text-gray-900 mb-2 break-words max-w-[200px]">{label}</p>
      {payload.map((entry, index) => {
        const riskLevel = getRiskLevel(entry.value);
        return (
          <div key={`${entry.name}-${index}`} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600">{entry.name}</span>
            <span className="font-medium" style={{ color: riskLevel.color }}>
              {formatScore(entry.value)}
            </span>
            <span className="text-xs text-gray-500">
              ({t('common:risk_levels.' + riskLevel.label.toLowerCase())})
            </span>
          </div>
        );
      })}
    </div>
  );
};

const CustomLegend = ({ payload }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-6 flex justify-center items-center pb-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {payload.map((entry) => (
          <div key={entry.value} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-gray-600">
              {t(`common:hazards.${entry.value}`, { 
                defaultValue: entry.value.charAt(0).toUpperCase() + entry.value.slice(1) 
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RiskDistributionChart = forwardRef(({ riskAssessment }, ref) => {
  const { t } = useTranslation();

  const chartData = useMemo(() => {
    if (!riskAssessment || riskAssessment.length === 0) return [];

    const sectorData = riskAssessment.reduce((acc, item) => {
      const sector = item.keyimpact || t('common:sectors.other');
      const hazard = item.hazard?.toLowerCase() || 'unknown';
      const score = item.risk_score || 0;

      if (!acc[sector]) {
        acc[sector] = { 
          sector,
          totalRisk: 0,
          hazards: {}
        };
      }

      acc[sector].hazards[hazard] = score;
      acc[sector].totalRisk += score;

      return acc;
    }, {});

    return Object.values(sectorData)
      .sort((a, b) => b.totalRisk - a.totalRisk)
      .map(({ sector, hazards }) => ({
        sector,
        fullSector: sector,
        ...hazards
      }));
  }, [riskAssessment, t]);

  const hazards = useMemo(() => {
    if (!riskAssessment || riskAssessment.length === 0) return [];
    return [...new Set(riskAssessment.map(item => 
      item.hazard?.toLowerCase()
    ))].filter(Boolean);
  }, [riskAssessment]);

  if (!chartData.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        {t('charts:risk_distribution.no_data')}
      </div>
    );
  }

  return (
    <div className="h-[450px]">
      <ResponsiveContainer width="100%" height={560}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 90 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false}
            stroke="#E5E7EB"
          />
          <XAxis 
            dataKey="sector"
            tick={<CustomXAxisTick />}
            interval={0}
            height={100}
          />
          <YAxis
            tickFormatter={value => formatScore(value)}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            domain={[0, 1]}
            ticks={[0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2]}
            label={{ 
              value: t('charts:risk_distribution.axis.risk_score'),
              angle: -90,
              position: 'insideLeft',
              offset: -10
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          {hazards.map(hazard => (
            <Bar
              key={hazard}
              dataKey={hazard}
              stackId="a"
              fill={getHazardColor(hazard)}
              shape={<RoundedBar />}
              name={t(`common:hazards.${hazard}`, { 
                defaultValue: hazard.charAt(0).toUpperCase() + hazard.slice(1) 
              })}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

RiskDistributionChart.displayName = 'RiskDistributionChart';
export default RiskDistributionChart;