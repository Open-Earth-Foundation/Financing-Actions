// src/components/RiskAssessment/ClimateProjections.jsx
import React, { useState, useEffect, useMemo, forwardRef } from 'react';
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
import { Info, AlertTriangle } from 'lucide-react';
import { getHazardColor } from '../../constants/hazardColors';
import { 
  CLIMATE_INDEX_MAP, 
  getIndexLabel, 
  getIndexDescription,
  getIndexHazardType,
  getIndexUnit,
  getIndexTrend
} from '../../constants/climateIndices';
import { fetchCityClimateData } from '../../api/climateDataApi';
import ClimateDetailModal from './ClimateDetailModal';

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }) => {
  const { t, i18n } = useTranslation();

  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
      {payload.map((entry, index) => {
        const indexCode = entry.dataKey.split('_')[0];
        const scenario = entry.dataKey.includes('rcp45') 
          ? t('sections:projections.scenarios.optimistic') 
          : entry.dataKey.includes('rcp85')
            ? t('sections:projections.scenarios.pessimistic')
            : t('sections:projections.scenarios.historical');

        const unit = getIndexUnit(indexCode);

        return (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600">
              {`${scenario}`}:
            </span>
            <span className="font-medium" style={{ color: entry.color }}>
              {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
              {unit ? ` ${unit}` : ''}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Main component
const ClimateProjections = forwardRef(({ cityname }, ref) => {
  const { t, i18n } = useTranslation();

  // State
  const [cityData, setCityData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedScenarios, setSelectedScenarios] = useState({
    historical: true,
    rcp45: true,
    rcp85: true
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effects
  useEffect(() => {
    const fetchData = async () => {
      if (!cityname) return;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchCityClimateData(cityname);
        setCityData(data);

        // Set the first available index as default selection
        const availableIndices = Object.keys(data.indices);
        if (availableIndices.length > 0) {
          setSelectedIndex(availableIndices[0]);
        }
      } catch (err) {
        console.error("Error fetching climate data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityname]);

  // Create chart data
  const chartData = useMemo(() => {
    if (!cityData || !selectedIndex) return [];

    const indexData = cityData.indices[selectedIndex];
    if (!indexData) return [];

    const result = [];

    // Add historical data point
    if (selectedScenarios.historical && indexData.historical?.baseline) {
      result.push({
        period: t('sections:projections.scenarios.historical'),
        displayPeriod: t('sections:projections.scenarios.historical'),
        [`${selectedIndex}_historical`]: indexData.historical.baseline.value
      });
    }

    // Add near future (2030) projections
    if ((selectedScenarios.rcp45 && indexData.projections?.rcp45?.periods?.near) ||
        (selectedScenarios.rcp85 && indexData.projections?.rcp85?.periods?.near)) {
      const nearPoint = {
        period: '2030',
        displayPeriod: '2030'
      };

      if (selectedScenarios.rcp45 && indexData.projections?.rcp45?.periods?.near) {
        nearPoint[`${selectedIndex}_rcp45`] = indexData.projections.rcp45.periods.near.value;
      }

      if (selectedScenarios.rcp85 && indexData.projections?.rcp85?.periods?.near) {
        nearPoint[`${selectedIndex}_rcp85`] = indexData.projections.rcp85.periods.near.value;
      }

      result.push(nearPoint);
    }

    // Add mid-century (2050) projections
    if ((selectedScenarios.rcp45 && indexData.projections?.rcp45?.periods?.mid) ||
        (selectedScenarios.rcp85 && indexData.projections?.rcp85?.periods?.mid)) {
      const midPoint = {
        period: '2050',
        displayPeriod: '2050'
      };

      if (selectedScenarios.rcp45 && indexData.projections?.rcp45?.periods?.mid) {
        midPoint[`${selectedIndex}_rcp45`] = indexData.projections.rcp45.periods.mid.value;
      }

      if (selectedScenarios.rcp85 && indexData.projections?.rcp85?.periods?.mid) {
        midPoint[`${selectedIndex}_rcp85`] = indexData.projections.rcp85.periods.mid.value;
      }

      result.push(midPoint);
    }

    return result;
  }, [cityData, selectedIndex, selectedScenarios, t]);

  // Event handlers
  const toggleScenario = (scenario) => {
    setSelectedScenarios(prev => ({
      ...prev,
      [scenario]: !prev[scenario]
    }));
  };

  const handleIndexSelect = (index) => {
    setSelectedIndex(index);
  };

  // Get trend information for the selected index
  const trendInfo = useMemo(() => {
    if (!selectedIndex) return null;
    return getIndexTrend(selectedIndex, i18n.language);
  }, [selectedIndex, i18n.language]);

  // Determine anomaly direction and significance for 2050 RCP8.5 (worst-case)
  const anomalyInfo = useMemo(() => {
    if (!cityData || !selectedIndex) return null;

    const indexData = cityData.indices[selectedIndex];
    if (!indexData?.projections?.rcp85?.periods?.mid) return null;

    const anomaly = indexData.projections.rcp85.periods.mid.anomaly;
    const trend = getIndexTrend(selectedIndex);

    // Determine if the anomaly is significant (more than 10% change)
    const baselineValue = indexData.historical?.baseline?.value || 0;
    const percentChange = baselineValue !== 0 ? (anomaly / baselineValue) * 100 : 0;
    const isSignificant = Math.abs(percentChange) >= 10;

    // Determine if the trend is concerning based on direction and significance
    const isConcerning = isSignificant && 
      ((anomaly > 0 && trend.negative) || (anomaly < 0 && !trend.negative));

    return {
      value: anomaly,
      percentChange,
      isPositive: anomaly > 0,
      isSignificant,
      isConcerning
    };
  }, [cityData, selectedIndex]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-gray-500">{t('common:loading')}</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-red-500">{t('common:error')}: {error}</div>
      </div>
    );
  }

  // No data state
  if (!cityData) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-gray-500">{t('sections:projections.no_data')}</div>
      </div>
    );
  }

  // Get available indices
  const availableIndices = Object.keys(cityData.indices).filter(index => 
    cityData.indices[index].historical?.baseline?.value !== undefined ||
    cityData.indices[index].projections?.rcp45?.periods?.near?.value !== undefined ||
    cityData.indices[index].projections?.rcp85?.periods?.near?.value !== undefined
  );

  if (availableIndices.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-gray-500">{t('sections:projections.no_indices')}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className="space-y-6">
      {/* Climate index selector */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-500">
          {t('common:labels.climate_indices')}:
        </label>
        <div className="flex flex-wrap gap-3">
          {availableIndices.map(index => {
            const hazardType = getIndexHazardType(index);

            return (
              <button
                key={index}
                onClick={() => handleIndexSelect(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  hover:scale-105 active:scale-95
                  ${index === selectedIndex 
                    ? 'text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                style={{
                  backgroundColor: index === selectedIndex 
                    ? getHazardColor(hazardType) 
                    : undefined
                }}
              >
                {getIndexLabel(index, i18n.language)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scenario toggles */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-500">
          {t('common:labels.scenarios')}:
        </label>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => toggleScenario('historical')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              hover:scale-105 active:scale-95
              ${selectedScenarios.historical 
                ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'}`}
          >
            {t('sections:projections.scenarios.historical')}
          </button>
          <button
            onClick={() => toggleScenario('rcp45')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              hover:scale-105 active:scale-95
              ${selectedScenarios.rcp45 
                ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'}`}
          >
            {t('sections:projections.scenarios.optimistic')}
          </button>
          <button
            onClick={() => toggleScenario('rcp85')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              hover:scale-105 active:scale-95
              ${selectedScenarios.rcp85 
                ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'}`}
          >
            {t('sections:projections.scenarios.pessimistic')}
          </button>
        </div>
      </div>

      {/* Index description and anomaly alert */}
      {selectedIndex && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <Info size={20} className="text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                {getIndexLabel(selectedIndex, i18n.language)}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {getIndexDescription(selectedIndex, i18n.language)}
              </p>

              {trendInfo && (
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">{t('sections:projections.trend')}:</span> {trendInfo.description}
                </p>
              )}

              {anomalyInfo?.isConcerning && (
                <div className="flex items-start gap-2 mt-3 p-2 bg-amber-50 border border-amber-200 rounded-md">
                  <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    {t('sections:projections.significant_change', { 
                      direction: anomalyInfo.isPositive ? t('sections:projections.increase') : t('sections:projections.decrease'),
                      percent: Math.abs(Math.round(anomalyInfo.percentChange)),
                      by2050: '2050'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-900">
          {t('sections:projections.chart_title')}
        </h4>

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
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData} 
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.25} />
              <XAxis 
                dataKey="displayPeriod" 
                stroke="#6b7280"
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                stroke="#6b7280"
                tick={{ fill: '#6b7280' }}
                label={{
                  value: getIndexUnit(selectedIndex),
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: '#6b7280' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              {selectedScenarios.historical && (
                <Line
                  type="monotone"
                  dataKey={`${selectedIndex}_historical`}
                  name={getIndexLabel(selectedIndex, i18n.language)}
                  stroke={getHazardColor(getIndexHazardType(selectedIndex))}
                  strokeWidth={2}
                  dot={{ fill: getHazardColor(getIndexHazardType(selectedIndex)), r: 5 }}
                  activeDot={{ r: 8 }}
                  connectNulls
                />
              )}

              {selectedScenarios.rcp45 && (
                <Line
                  type="monotone"
                  dataKey={`${selectedIndex}_rcp45`}
                  name={getIndexLabel(selectedIndex, i18n.language)}
                  stroke={getHazardColor(getIndexHazardType(selectedIndex), 'optimistic')}
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={{ fill: getHazardColor(getIndexHazardType(selectedIndex), 'optimistic'), r: 5 }}
                  activeDot={{ r: 8 }}
                  connectNulls
                />
              )}

              {selectedScenarios.rcp85 && (
                <Line
                  type="monotone"
                  dataKey={`${selectedIndex}_rcp85`}
                  name={getIndexLabel(selectedIndex, i18n.language)}
                  stroke={getHazardColor(getIndexHazardType(selectedIndex), 'pessimistic')}
                  strokeDasharray="3 3"
                  strokeWidth={2}
                  dot={{ fill: getHazardColor(getIndexHazardType(selectedIndex), 'pessimistic'), r: 5 }}
                  activeDot={{ r: 8 }}
                  connectNulls
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            {t('sections:projections.select_scenario')}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedIndex && (
        <ClimateDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          cityName={cityname}
          indexCode={selectedIndex}
          indexData={cityData.indices[selectedIndex]}
        />
      )}
    </div>
  );
});

ClimateProjections.displayName = 'ClimateProjections';
export default ClimateProjections;