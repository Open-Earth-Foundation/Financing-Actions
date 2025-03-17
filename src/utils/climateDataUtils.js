// src/utils/climateDataUtils.js

/**
 * Extracts time series data from a climate index object
 * 
 * @param {Object} indexData - The climate index data object
 * @param {string} scenario - The scenario to extract (rcp45, rcp85)
 * @param {Object} range - The year range { start, end }
 * @returns {Array} - Array of year-by-year data points
 */
export const extractTimeSeriesData = (indexData, scenario, range = { start: 2006, end: 2099 }) => {
  if (!indexData || !indexData.projections || !indexData.projections[scenario]) {
    return [];
  }

  const { timeseries } = indexData.projections[scenario];
  if (!timeseries || !Array.isArray(timeseries)) {
    return [];
  }

  return timeseries.filter(point => 
    point.year >= range.start && point.year <= range.end
  );
};

/**
 * Combines time series data from multiple scenarios into a single array
 * 
 * @param {Object} indexData - The climate index data object
 * @param {Object} selectedScenarios - Object with boolean flags for each scenario 
 * @param {Object} range - The year range { start, end }
 * @returns {Array} - Combined array of year data points
 */
export const combineTimeSeriesData = (indexData, selectedScenarios, range = { start: 2006, end: 2099 }) => {
  if (!indexData) return [];

  const yearMap = {};

  // Process RCP 4.5 data
  if (selectedScenarios.rcp45) {
    const rcp45Data = extractTimeSeriesData(indexData, 'rcp45', range);
    rcp45Data.forEach(point => {
      const year = point.year;
      if (!yearMap[year]) {
        yearMap[year] = { year };
      }
      yearMap[year].rcp45_value = point.value;
      yearMap[year].rcp45_anomaly = point.anomaly;
    });
  }

  // Process RCP 8.5 data
  if (selectedScenarios.rcp85) {
    const rcp85Data = extractTimeSeriesData(indexData, 'rcp85', range);
    rcp85Data.forEach(point => {
      const year = point.year;
      if (!yearMap[year]) {
        yearMap[year] = { year };
      }
      yearMap[year].rcp85_value = point.value;
      yearMap[year].rcp85_anomaly = point.anomaly;
    });
  }

  // Convert to array and sort by year
  return Object.values(yearMap).sort((a, b) => a.year - b.year);
};

/**
 * Gets the available year range for a climate index
 * 
 * @param {Object} indexData - The climate index data object
 * @returns {Object} - The year range { start, end }
 */
export const getIndexYearRange = (indexData) => {
  if (!indexData) return { start: 2006, end: 2099 };

  const start = Math.min(
    indexData.projections?.rcp45?.timeseriesStart || 2006,
    indexData.projections?.rcp85?.timeseriesStart || 2006
  );

  const end = Math.max(
    indexData.projections?.rcp45?.timeseriesEnd || 2099,
    indexData.projections?.rcp85?.timeseriesEnd || 2099
  );

  return { start, end };
};

/**
 * Calculates domain (min/max values) for Y axis in time series chart
 * 
 * @param {Array} timeseriesData - Array of time series data points
 * @returns {Array} - [min, max] values for chart domain
 */
export const calculateTimeseriesDomain = (timeseriesData) => {
  if (!timeseriesData || !timeseriesData.length) return [0, 0];

  let min = Infinity;
  let max = -Infinity;

  timeseriesData.forEach(point => {
    if (point.rcp45_value !== undefined && point.rcp45_value !== null) {
      min = Math.min(min, point.rcp45_value);
      max = Math.max(max, point.rcp45_value);
    }

    if (point.rcp85_value !== undefined && point.rcp85_value !== null) {
      min = Math.min(min, point.rcp85_value);
      max = Math.max(max, point.rcp85_value);
    }
  });

  // Add some padding
  const padding = (max - min) * 0.1;
  return [Math.max(0, min - padding), max + padding];
};