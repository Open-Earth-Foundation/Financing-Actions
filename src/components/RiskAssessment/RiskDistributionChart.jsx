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

const CustomTooltip = ({ active, payload, label }) => {
  const { t } = useTranslation();

  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
      {payload.map((entry, index) => {
        const riskLevel = getRiskLevel(entry.value);
        return (
          <div key={`${entry.name}-${index}`} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600">{t('charts:risk_distribution.legend.hazard_prefix')} {entry.name}</span>
            <span className="font-medium" style={{ color: riskLevel.color }}>
              {formatScore(entry.value)}
            </span>
            <span className="text-xs text-gray-500">({t('common:risk_levels.' + riskLevel.label.toLowerCase())})</span>
          </div>
        );
      })}
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
    <div ref={ref} className="h-[412px]">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false}
            stroke="#E5E7EB"
          />
          <XAxis 
            dataKey="sector"
            tick={{ fill: '#6B7280', fontSize: 12 }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={80}
            label={{ 
              value: t('charts:risk_distribution.axis.sector'),
              position: 'bottom',
              offset: 40
            }}
          />
          <YAxis
            tickFormatter={value => formatScore(value)}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            domain={[0, 1]}
            ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]}
            label={{ 
              value: t('charts:risk_distribution.axis.risk_score'),
              angle: -90,
              position: 'insideLeft',
              offset: -10
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: 20 }}
            formatter={(value) => (
              <span className="text-sm text-gray-600">
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </span>
            )}
          />
          {hazards.map(hazard => (
            <Bar
              key={hazard}
              dataKey={hazard}
              stackId="a"
              fill={getHazardColor(hazard)}
              shape={<RoundedBar />}
              name={t(`common:hazards.${hazard}`, { defaultValue: hazard.charAt(0).toUpperCase() + hazard.slice(1) })}
            >
              {chartData.map((entry, index) => {
                const value = entry[hazard];
                const riskLevel = value ? getRiskLevel(value) : null;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fillOpacity={riskLevel ? 0.8 : 0.4}
                  />
                );
              })}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

RiskDistributionChart.displayName = 'RiskDistributionChart';
export default RiskDistributionChart;