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

  if (!projectionData) {
    return null;
  }
  
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

  if (!projectionData) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-normal font-poppins mb-4">Hazards Projection</h3>
        <p className="text-base font-normal font-opensans text-gray-600 mb-6">
          Compare how hazard scores are projected to change over time under different climate scenarios.
        </p>

        <div className="flex justify-between items-start gap-4 mb-6">
          {/* Hazards section */}
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

          {/* Scenarios section */}
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
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <Tooltip
              formatter={(value) => value ? `${(value * 100).toFixed(1)}%` : 'N/A'}
              labelStyle={{ color: '#374151' }}
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px'
              }}
            />
            <Legend />

            {Object.keys(projectionData).map(hazard => {
              if (!selectedHazards.has(hazard)) return null;

              return (
                <React.Fragment key={hazard}>
                  {/* Current scenario - solid line */}
                  <Line
                    type="monotone"
                    dataKey={hazard}
                    stroke={getHazardColor(hazard)}
                    name={hazard}
                    strokeWidth={2}
                    dot={{ fill: getHazardColor(hazard), r: 4 }}
                  />
                  {/* Optimistic scenario - dashed line */}
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
                  {/* Pessimistic scenario - dotted line */}
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