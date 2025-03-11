import React, { useState, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
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
import { getRiskLevel, formatScore } from '../../constants/riskLevels';
import HazardDetailModal from './HazardDetailModal';

const CustomTooltip = ({ active, payload, label }) => {
  const { t } = useTranslation();

  if (!active || !payload || !payload.length) return null;

  const getBaseHazard = (dataKey) => dataKey.split('_')[0];

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
      {payload.map((entry, index) => {
        const baseHazard = getBaseHazard(entry.dataKey);
        const isProjection = entry.dataKey.includes('_');
        const scenario = entry.dataKey.includes('optimistic') ? 
          t('sections:projections.scenarios.optimistic') : 
          t('sections:projections.scenarios.pessimistic');

        return (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600">
              {isProjection ? 
                `${t(`common:hazards.${baseHazard}`)} (${scenario})` : 
                entry.name}:
            </span>
            <span className="font-medium" style={{ color: entry.color }}>
              {formatScore(entry.value)}
            </span>
          </div>
        );
      })}
      {label === 'Current' && (
        <div className="mt-2 text-xs text-gray-500 italic">
          {t('sections:projections.scenarios.current')}
        </div>
      )}
    </div>
  );
};

const HazardProjections = forwardRef(({ projectionData }, ref) => {
  const { t } = useTranslation();
  const [selectedHazards, setSelectedHazards] = useState(
    new Set(Object.keys(projectionData || {}))
  );
  const [selectedScenarios, setSelectedScenarios] = useState({
    optimistic: true,
    pessimistic: true
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        {t('sections:projections.no_data')}
      </div>
    );
  }

  const chartData = [
    {
      year: t('sections:projections.scenarios.current'),
      ...Object.keys(projectionData)
        .filter(hazard => hazard !== "sea-level-rise")
        .reduce((acc, hazard) => ({
        ...acc,
        [hazard]: projectionData[hazard].current,
        [`${hazard}_optimistic`]: projectionData[hazard].current,
        [`${hazard}_pessimistic`]: projectionData[hazard].current
      }), {})
    },
    {
      year: '2030',
      ...Object.keys(projectionData)
        .filter(hazard => hazard !== "sea-level-rise")
        .reduce((acc, hazard) => ({
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
      ...Object.keys(projectionData)
        .filter(hazard => hazard !== "sea-level-rise")
        .reduce((acc, hazard) => ({
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

  return (
    <div ref={ref} className="">
      <div>
        <div className="flex justify-between items-start gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-500">
              {t('common:labels.hazards')}:
            </label>
            <div className="flex flex-wrap gap-3">
              {Object.keys(projectionData)
                .filter(hazard => hazard !== "sea-level-rise") 
                .map(hazard => (
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
                  {t(`common:hazards.${hazard.toLowerCase()}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-500">
              {t('common:labels.scenarios')}:
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => toggleScenario('optimistic')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  hover:scale-105 active:scale-95
                  ${selectedScenarios.optimistic 
                    ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                    : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'}`}
              >
                {t('sections:projections.scenarios.optimistic')}
              </button>
              <button
                onClick={() => toggleScenario('pessimistic')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  hover:scale-105 active:scale-95
                  ${selectedScenarios.pessimistic 
                    ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                    : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'}`}
              >
                {t('sections:projections.scenarios.pessimistic')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 
                     bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors
                     border border-blue-200 hover:border-blue-300"
        >
          {t('common:actions.view_details')}
        </button>
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

            {Object.keys(projectionData)
              .filter(hazard => hazard !== "sea-level-rise") 
              .map(hazard => {
              if (!selectedHazards.has(hazard)) return null;

              return (
                <React.Fragment key={hazard}>
                  <Line
                    type="monotone"
                    dataKey={hazard}
                    stroke={getHazardColor(hazard)}
                    name={t(`common:hazards.${hazard.toLowerCase()}`)}
                    strokeWidth={2}
                    dot={{ fill: getHazardColor(hazard), r: 4 }}
                  />
                  {selectedScenarios.optimistic && (
                    <Line
                      type="monotone"
                      dataKey={`${hazard}_optimistic`}
                      stroke={getHazardColor(hazard, 'optimistic')}
                      name={`${t(`common:hazards.${hazard.toLowerCase()}`)} (RCP 4.5)`}
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
                      name={`${t(`common:hazards.${hazard.toLowerCase()}`)} (RCP 8.5)`}
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

      <HazardDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hazardData={projectionData}
      />
    </div>
  );
});

HazardProjections.displayName = 'HazardProjections';
export default HazardProjections;