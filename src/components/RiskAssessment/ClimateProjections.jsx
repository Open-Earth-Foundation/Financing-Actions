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
  // State for chart view (summary vs time series)
  const [showTimeSeries, setShowTimeSeries] = useState(false);

  // Effects
  useEffect(() => {
    const fetchData = async () => {
      if (!cityname) return;

      setLoading(true);
      setError(null);

      try {
        // Replace spaces with underscores in city name for the API
        const formattedCityName = cityname.replace(/\s+/g, '_');

        console.log(`Fetching climate data for: ${formattedCityName}`);
        const data = await fetchCityClimateData(formattedCityName);

        if (!data) {
          throw new Error('No data returned from API');
        }

        setCityData(data);

        // Set the first available index as default selection
        const availableIndices = Object.keys(data.indices || {});
        if (availableIndices.length > 0) {
          setSelectedIndex(availableIndices[0]);
        } else {
          console.warn(`No climate indices found for ${cityname}`);
        }
      } catch (err) {
        console.error("Error fetching climate data:", err);
        setError(err.message || 'Failed to fetch climate data');
        setCityData(null);
        setSelectedIndex(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityname]);

  // Create chart data
  const summaryChartData = useMemo(() => {
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

  const timeSeriesData = useMemo(() => {
    if (!cityData || !selectedIndex) return [];
    const indexData = cityData.indices[selectedIndex];
    if (!indexData) return [];
    
    const data = [];
    //Process historical data
    if (selectedScenarios.historical && indexData.historical?.timeSeries) {
      indexData.historical.timeSeries.forEach(item => {
        data.push({
          year: item.year,
          [`${selectedIndex}_historical`]: item.value
        });
      });
    }

    // Process RCP45 data
    if (selectedScenarios.rcp45 && indexData.projections?.rcp45?.timeSeries) {
      indexData.projections.rcp45.timeSeries.forEach(item => {
        let existingEntry = data.find(entry => entry.year === item.year);
        if (existingEntry) {
          existingEntry[`${selectedIndex}_rcp45`] = item.value;
        } else {
          data.push({ year: item.year, [`${selectedIndex}_rcp45`]: item.value });
        }
      });
    }

    // Process RCP85 data
    if (selectedScenarios.rcp85 && indexData.projections?.rcp85?.timeSeries) {
      indexData.projections.rcp85.timeSeries.forEach(item => {
        let existingEntry = data.find(entry => entry.year === item.year);
        if (existingEntry) {
          existingEntry[`${selectedIndex}_rcp85`] = item.value;
        } else {
          data.push({ year: item.year, [`${selectedIndex}_rcp85`]: item.value });
        }
      });
    }
    
    // Sort data by year for proper display
    return data.sort((a, b) => a.year - b.year);

    const data = [];
    //Process historical data
    if (selectedScenarios.historical && indexData.historical?.timeSeries) {
      indexData.historical.timeSeries.forEach(item => {
        data.push({
          year: item.year,
          [`${selectedIndex}_historical`]: item.value
        });
      });
    }

    // Process RCP45 data
    if (selectedScenarios.rcp45 && indexData.projections?.rcp45?.timeSeries) {
      indexData.projections.rcp45.timeSeries.forEach(item => {
        let existingEntry = data.find(entry => entry.year === item.year);
        if (existingEntry) {
          existingEntry[`${selectedIndex}_rcp45`] = item.value;
        } else {
          data.push({ year: item.year, [`${selectedIndex}_rcp45`]: item.value });
        }
      });
    }

    // Process RCP85 data
    if (selectedScenarios.rcp85 && indexData.projections?.rcp85?.timeSeries) {
      indexData.projections.rcp85.timeSeries.forEach(item => {
        let existingEntry = data.find(entry => entry.year === item.year);
        if (existingEntry) {
          existingEntry[`${selectedIndex}_rcp85`] = item.value;
        } else {
          data.push({ year: item.year, [`${selectedIndex}_rcp85`]: item.value });
        }
      });
    }
    return data;
  }, [cityData, selectedIndex, selectedScenarios]);


  // Event handlers
  const toggleScenario = (scenario) => {
    setSelectedScenarios(prev => ({
      ...prev,
      [scenario]: !prev[scenario]
    }));
  };
  
  // Format index data for display
  const formatIndexName = (index) => {
    // Common climate indices and their readable names
    const indexMap = {
      "CDD": t('sections:climate_projections.indices.cdd'),
      "RX1day": t('sections:climate_projections.indices.rx1day'),
      "RX5day": t('sections:climate_projections.indices.rx5day'),
      "TX90p": t('sections:climate_projections.indices.tx90p'),
      "tas": t('sections:climate_projections.indices.tas'),
      "tasmax": t('sections:climate_projections.indices.tasmax')
    };
    
    return indexMap[index] || index;
  };

  const handleIndexSelect = (index) => {
    setSelectedIndex(index);
  };

  // Get trend information for the selected index
  const trendInfo = useMemo(() => {
    if (!selectedIndex) return null;
    const trend = getIndexTrend(selectedIndex, i18n.language);
    if (typeof trend === 'object') {
      return {
        direction: trend.negative ? t('sections:projections.decrease') : t('sections:projections.increase'),
        description: trend.description
      };
    }
    return trend;
  }, [selectedIndex, i18n.language, t]);

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
      <div className="flex flex-col items-center justify-center h-[400px] p-4 bg-red-50 border border-red-100 rounded-lg">
        <div className="text-red-500 mb-2 font-medium">{t('common:error', { error })}</div>
        <div className="text-sm text-gray-600">
          {t('sections:projections.no_data_available_try_another')}
        </div>
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
    <div ref={ref} className="flex flex-col space-y-6">
      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center h-[300px]">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Content when not loading */}
      {!loading && (
        <>
          {/* Index selection */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <label htmlFor="index-select" className="block text-sm font-medium text-gray-700 mb-1">
                {t('common:labels.climate_index')}
              </label>
              <select
                id="index-select"
                value={selectedIndex || ''}
                onChange={e => handleIndexSelect(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {availableIndices.map(index => (
                  <option key={index} value={index}>
                    {getIndexLabel(index, t)} ({index})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                {t('common:labels.scenarios')}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => toggleScenario('historical')}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    selectedScenarios.historical
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {t('sections:projections.scenarios.historical')}
                </button>
                <button
                  onClick={() => toggleScenario('rcp45')}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    selectedScenarios.rcp45
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {t('sections:projections.scenarios.optimistic')}
                </button>
                <button
                  onClick={() => toggleScenario('rcp85')}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    selectedScenarios.rcp85
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {t('sections:projections.scenarios.pessimistic')}
                </button>
              </div>
            </div>
          </div>

          {/* Index description */}
          {selectedIndex && (
            <div className="flex items-start bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex-shrink-0 pt-0.5">
                <Info size={18} className="text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  {getIndexLabel(selectedIndex, t)} ({selectedIndex})
                </h3>
                <div className="mt-1 text-sm text-gray-700">
                  <p>{getIndexDescription(selectedIndex, t)}</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-xs font-medium"
                  >
                    {t('common:actions.show_details')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* No selected scenarios warning */}
          {(Object.values(selectedScenarios).every(v => !v) || !selectedIndex) && (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-gray-500">
                {t('sections:projections.select_scenario')}
              </div>
            </div>
          )}

          {/* Chart view toggle */}
          {selectedIndex && Object.values(selectedScenarios).some(v => v) && (timeSeriesData.length > 0 || summaryChartData.length > 0) && (
            <div className="flex justify-center mb-4">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={() => setShowTimeSeries(false)}
                  className={`px-4 py-2 text-sm font-medium border border-r-0 rounded-l-lg 
                    ${!showTimeSeries
                      ? 'bg-blue-700 text-white'
                      : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'}`}
                >
                  {t('sections:projections.summary_view')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowTimeSeries(true)}
                  className={`px-4 py-2 text-sm font-medium border rounded-r-lg
                    ${showTimeSeries
                      ? 'bg-blue-700 text-white'
                      : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700'}`}
                >
                  {t('sections:projections.time_series')}
                </button>
              </div>
            </div>
          )}

          {/* Summary Chart */}
          {selectedIndex && Object.values(selectedScenarios).some(v => v) && summaryChartData.length > 0 && !showTimeSeries && (
            <div className="pb-4">
              <div className="mb-4 text-center text-sm font-medium text-gray-700">
                {t('sections:projections.chart_title')}
              </div>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={summaryChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      dataKey="displayPeriod"
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <YAxis 
                      label={{ 
                        value: getIndexUnit(selectedIndex, t),
                        angle: -90,
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fill: '#6B7280', fontSize: 12 }
                      }}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <Tooltip />
                    <Legend />
                    {selectedScenarios.historical && (
                      <Line
                        type="monotone"
                        dataKey={`${selectedIndex}_historical`}
                        name={t('sections:projections.scenarios.historical')}
                        stroke="#64748B"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        dot={{ strokeWidth: 2, r: 4 }}
                      />
                    )}
                    {selectedScenarios.rcp45 && (
                      <Line
                        type="monotone"
                        dataKey={`${selectedIndex}_rcp45`}
                        name={t('sections:projections.scenarios.optimistic')}
                        stroke="#22C55E"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        dot={{ strokeWidth: 2, r: 4 }}
                      />
                    )}
                    {selectedScenarios.rcp85 && (
                      <Line
                        type="monotone"
                        dataKey={`${selectedIndex}_rcp85`}
                        name={t('sections:projections.scenarios.pessimistic')}
                        stroke="#EF4444"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        dot={{ strokeWidth: 2, r: 4 }}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Time Series Chart */}
          {selectedIndex && Object.values(selectedScenarios).some(v => v) && timeSeriesData.length > 0 && showTimeSeries && (
            <div className="pb-4">
              <div className="mb-4 text-center text-sm font-medium text-gray-700">
                {t('sections:projections.time_series_title')}
              </div>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeSeriesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      dataKey="year"
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      label={{ 
                        value: t('common:labels.year'),
                        position: 'insideBottom',
                        offset: -10,
                        style: { textAnchor: 'middle', fill: '#6B7280', fontSize: 12 }
                      }}
                    />
                    <YAxis 
                      label={{ 
                        value: getIndexUnit(selectedIndex, t),
                        angle: -90,
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fill: '#6B7280', fontSize: 12 }
                      }}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <Tooltip />
                    <Legend />
                    {selectedScenarios.historical && (
                      <Line
                        type="monotone"
                        dataKey={`${selectedIndex}_historical`}
                        name={t('sections:projections.scenarios.historical')}
                        stroke="#64748B"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 5 }}
                      />
                    )}
                    {selectedScenarios.rcp45 && (
                      <Line
                        type="monotone"
                        dataKey={`${selectedIndex}_rcp45`}
                        name={t('sections:projections.scenarios.optimistic')}
                        stroke="#22C55E"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 5 }}
                      />
                    )}
                    {selectedScenarios.rcp85 && (
                      <Line
                        type="monotone"
                        dataKey={`${selectedIndex}_rcp85`}
                        name={t('sections:projections.scenarios.pessimistic')}
                        stroke="#EF4444"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 5 }}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Trend indicator */}
          {selectedIndex && (
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <AlertTriangle size={20} className="text-amber-500" />
              <div className="text-sm text-amber-700">
                <span className="font-medium">{t('sections:projections.trend')}:</span>{' '}
                {typeof getIndexTrend(selectedIndex, t) === 'object' 
                  ? (getIndexTrend(selectedIndex, t).negative ? t('sections:projections.decrease') : t('sections:projections.increase')) + ' - ' + getIndexTrend(selectedIndex, t).description
                  : getIndexTrend(selectedIndex, t)}
              </div>
            </div>
          )}
        </>
      )}

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