import React, { useState } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { capitalize } from '../../utils/textUtils';
import { RADIAL_COLORS } from '../../constants/radialColors';
import { formatScore } from '../../constants/riskLevels';

// Helper function to get radial color based on index
const getRadialColor = (index) => {
  const colorKeys = ['first', 'second', 'third'];
  return RADIAL_COLORS[colorKeys[index]]?.base || RADIAL_COLORS.first.base;
};

// Helper function to format key impact
const formatKeyImpact = (keyimpact) => {
  const impactShortNames = {
    'water resources': 'Water',
    'food security': 'Food',
    'energy security': 'Energy',
    'healthcare': 'Health',
    'infrastructure': 'Infra',
    'geo-hydrological disasters': 'Geo-hydro',
    'coastal zones': 'Coastal',
    'biodiversity': 'Bio',
    'urban infrastructure': 'Urban',
    'agricultural production': 'Agri'
  };

  const normalized = keyimpact.toLowerCase();
  return impactShortNames[normalized] || keyimpact;
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <p className="text-sm font-medium text-gray-900 mb-2">{payload[0].payload.name}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600">{entry.name}:</span>
          <span className="font-medium" style={{ color: entry.color }}>
            {formatScore(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

const RadialComparison = ({ riskAssessment }) => {
  // Get top hazards based on risk score
  const topHazards = [...(riskAssessment || [])]
    .sort((a, b) => b.risk_score - a.risk_score)
    .slice(0, 3)
    .map(risk => ({
      id: `${risk.hazard}-${risk.keyimpact}`,
      hazard: risk.hazard,
      keyimpact: risk.keyimpact,
      sensitivity_score: risk.sensitivity_score,
      exposure_score: risk.exposure_score,
      hazard_score: risk.hazard_score,
      vulnerability_score: risk.vulnerability_score,
      risk_score: risk.risk_score
    }));

  const [selectedHazards, setSelectedHazards] = useState(
    topHazards.map(hazard => hazard.id)
  );

  const metrics = [
    { key: "sensitivity_score", label: "Sensitivity" },
    { key: "exposure_score", label: "Exposure" },
    { key: "hazard_score", label: "Climate Threat" },
    { key: "vulnerability_score", label: "Vulnerability" },
    { key: "risk_score", label: "Risk" }
  ];

  const chartData = metrics.map(metric => ({
    name: metric.label,
    ...topHazards.reduce((acc, hazard) => {
      if (selectedHazards.includes(hazard.id)) {
        acc[hazard.id] = hazard[metric.key];
      }
      return acc;
    }, {})
  }));

  const toggleHazard = (hazardId) => {
    setSelectedHazards(prev =>
      prev.includes(hazardId)
        ? prev.filter(h => h !== hazardId)
        : [...prev, hazardId]
    );
  };

  if (!topHazards.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No risk comparison data available
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Hazard Toggles */}
      <div className="flex flex-col gap-2 mb-6">
        <label className="text-sm font-medium text-gray-700">Hazards:</label>
        <div className="flex flex-wrap gap-3">
          {topHazards.map((hazard, index) => (
            <button
              key={hazard.id}
              onClick={() => toggleHazard(hazard.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                hover:scale-105 active:scale-95
                ${selectedHazards.includes(hazard.id)
                  ? 'text-white shadow-sm'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              style={{
                backgroundColor: selectedHazards.includes(hazard.id)
                  ? getRadialColor(index)
                  : undefined
              }}
            >
              {`${capitalize(hazard.hazard)} (${formatKeyImpact(hazard.keyimpact)})`}
            </button>
          ))}
        </div>
      </div>

      {/* Radar Chart */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={chartData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <PolarGrid gridType="circle" strokeOpacity={0.2} />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fill: '#575757', fontSize: 12, fontFamily: 'Inter' }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 1]}
              tickFormatter={value => formatScore(value)}
              tick={{ fontSize: 10, fontFamily: 'Inter', fill: '#D7D8FA' }}
              tickCount={5}
            />
            <Tooltip content={<CustomTooltip />} />
            {topHazards.map((hazard, index) => (
              selectedHazards.includes(hazard.id) && (
                <Radar
                  key={hazard.id}
                  name={`${capitalize(hazard.hazard)} (${formatKeyImpact(hazard.keyimpact)})`}
                  dataKey={hazard.id}
                  stroke={getRadialColor(index)}
                  fill={getRadialColor(index)}
                  fillOpacity={0.3}
                  dot={{ fill: getRadialColor(index), radius: 4 }}
                />
              )
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="m-auto mt-6 flex flex-wrap gap-4">
        {topHazards.map((hazard, index) => (
          <div key={hazard.id} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getRadialColor(index) }}
            />
            <span
              style={{ color: selectedHazards.includes(hazard.id) ? getRadialColor(index) : '#6B7280' }}
              className="text-sm font-medium transition-colors"
            >
              {`${capitalize(hazard.hazard)} (${formatKeyImpact(hazard.keyimpact)})`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadialComparison;