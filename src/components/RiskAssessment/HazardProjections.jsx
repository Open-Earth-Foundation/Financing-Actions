import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { getHazardColor } from '../../constants/hazardColors';
import { formatScore } from '../../constants/riskLevels';

const HazardProjections = ({ projectionData }) => {
  const [selectedHazards, setSelectedHazards] = useState(
    new Set(Object.keys(projectionData || {}))
  );
  const [selectedScenarios, setSelectedScenarios] = useState({
    optimistic: true,
    pessimistic: true
  });

  const toggleHazard = (hazard) => {
    const newSelected = new Set(selectedHazards);
    if (newSelected.has(hazard)) {
      newSelected.delete(hazard);
    } else {
      newSelected.add(hazard);
    }
    setSelectedHazards(newSelected);
  };

  const toggleScenario = (scenario) => {
    setSelectedScenarios(prev => ({
      ...prev,
      [scenario]: !prev[scenario]
    }));
  };

  // Calculate change between years
  const calculateYearChange = (currentValue, previousValue) => {
    if (!currentValue || !previousValue) return null;
    const change = ((currentValue - previousValue) / previousValue) * 100;
    return change.toFixed(1);
  };

  // Transform data for the chart
  const chartData = useMemo(() => {
    if (!projectionData) return [];

    return [
      {
        year: 'Current',
        ...Object.keys(projectionData).reduce((acc, hazard) => ({
          ...acc,
          [hazard]: projectionData[hazard].current,
          [`${hazard}_optimistic`]: projectionData[hazard].current,
          [`${hazard}_pessimistic`]: projectionData[hazard].current
        }), {})
      },
      {
        year: '2030',
        ...Object.keys(projectionData).reduce((acc, hazard) => ({
          ...acc,
          [hazard]: null,
          ...(selectedScenarios.optimistic ? {
            [`${hazard}_optimistic`]: projectionData[hazard]['2030_optimistic']
          } : {}),
          ...(selectedScenarios.pessimistic ? {
            [`${hazard}_pessimistic`]: projectionData[hazard]['2030_pessimistic']
          } : {})
        }), {})
      },
      {
        year: '2050',
        ...Object.keys(projectionData).reduce((acc, hazard) => ({
          ...acc,
          [hazard]: null,
          ...(selectedScenarios.optimistic ? {
            [`${hazard}_optimistic`]: projectionData[hazard]['2050_optimistic']
          } : {}),
          ...(selectedScenarios.pessimistic ? {
            [`${hazard}_pessimistic`]: projectionData[hazard]['2050_pessimistic']
          } : {})
        }), {})
      }
    ];
  }, [projectionData, selectedScenarios]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const getBaseHazard = (dataKey) => dataKey.split('_')[0];

    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
        {payload.map((entry, index) => {
          const baseHazard = getBaseHazard(entry.dataKey);
          const isProjection = entry.dataKey.includes('_');
          const scenario = entry.dataKey.includes('optimistic') ? 'RCP 4.5' : 'RCP 8.5';

          // Find the value from the previous year for projections
          let changeFromPrevious = null;
          if (label !== 'Current' && isProjection) {
            const previousYear = label === '2050' ? '2030' : 'Current';
            const previousValue = chartData.find(d => d.year === previousYear)?.[
              label === '2050' ? `${baseHazard}_${entry.dataKey.includes('optimistic') ? 'optimistic' : 'pessimistic'}` : baseHazard
            ];
            changeFromPrevious = calculateYearChange(entry.value, previousValue);
          }

          return (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600">
                {isProjection ? `${baseHazard} (${scenario})` : entry.name}:
              </span>
              <span className="font-medium" style={{ color: entry.color }}>
                {formatScore(entry.value)}
              </span>
              {changeFromPrevious && (
                <span className={`text-xs ${Number(changeFromPrevious) >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                  ({changeFromPrevious > 0 ? '+' : ''}{changeFromPrevious}% from {label === '2050' ? '2030' : 'current'})
                </span>
              )}
            </div>
          );
        })}

        {label === 'Current' && (
          <div className="mt-2 text-xs text-gray-500 italic">
            Current hazard scores based on historical data
          </div>
        )}
        {label === '2030' && (
          <div className="mt-2 text-xs text-gray-500 italic">
            Changes shown relative to current scores
          </div>
        )}
        {label === '2050' && (
          <div className="mt-2 text-xs text-gray-500 italic">
            Changes shown relative to 2030 scores
          </div>
        )}
      </div>
    );
  };

  if (!projectionData) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-normal font-poppins mb-4">Hazards Projection</h3>
        <p className="text-base font-normal font-opensans text-gray-600 mb-6">
          Compare how hazard scores are projected to change over time under different climate scenarios. Changes in 2030 are relative to current scores, while changes in 2050 are relative to 2030 projections.
        </p>

        <div className="flex justify-between items-start gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-500">Hazards:</label>
            <div className="flex flex-wrap gap-3">
              {Object.keys(projectionData).map(hazard => (
                <button
                  key={hazard}
                  onClick={() => toggleHazard(hazard)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                    hover:scale-105 active:scale-95
                    ${selectedHazards.has(hazard) 
                      ? 'text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  style={{
                    backgroundColor: selectedHazards.has(hazard) 
                      ? getHazardColor(hazard) 
                      : undefined
                  }}
                >
                  {hazard.charAt(0).toUpperCase() + hazard.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-500">Scenarios:</label>
            <div className="flex gap-4">
              <button
                onClick={() => toggleScenario('optimistic')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  hover:scale-105 active:scale-95
                  ${selectedScenarios.optimistic 
                    ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                    : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'}`}
              >
                RCP 4.5
              </button>
              <button
                onClick={() => toggleScenario('pessimistic')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  hover:scale-105 active:scale-95
                  ${selectedScenarios.pessimistic 
                    ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                    : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'}`}
              >
                RCP 8.5
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.25} />
            <XAxis 
              dataKey="year" 
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              domain={[0, 1]} 
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
              tickFormatter={value => formatScore(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            {Object.keys(projectionData).map(hazard => {
              if (!selectedHazards.has(hazard)) return null;

              return (
                <React.Fragment key={hazard}>
                  <Line
                    type="monotone"
                    dataKey={hazard}
                    stroke={getHazardColor(hazard)}
                    name={hazard}
                    strokeWidth={2}
                    dot={{ fill: getHazardColor(hazard), r: 4 }}
                  />
                  {selectedScenarios.optimistic && (
                    <Line
                      type="monotone"
                      dataKey={`${hazard}_optimistic`}
                      stroke={getHazardColor(hazard, 'optimistic')}
                      name={`${hazard} (RCP 4.5)`}
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      dot={{ fill: getHazardColor(hazard, 'optimistic'), r: 4 }}
                      connectNulls
                    />
                  )}
                  {selectedScenarios.pessimistic && (
                    <Line
                      type="monotone"
                      dataKey={`${hazard}_pessimistic`}
                      stroke={getHazardColor(hazard, 'pessimistic')}
                      name={`${hazard} (RCP 8.5)`}
                      strokeDasharray="2 2"
                      strokeWidth={2}
                      dot={{ fill: getHazardColor(hazard, 'pessimistic'), r: 4 }}
                      connectNulls
                    />
                  )}
                </React.Fragment>
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>* RCP 4.5: Optimistic scenario - Lower emissions pathway</p>
        <p>* RCP 8.5: Pessimistic scenario - Higher emissions pathway</p>
      </div>
    </div>
  );
};

export default HazardProjections;