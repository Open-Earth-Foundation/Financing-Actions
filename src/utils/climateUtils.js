// src/utils/climateUtils.js

/**
 * Estimate historical baseline from projection anomalies
 * 
 * @param {Object} indexData - The climate index data
 * @returns {Number|null} - Estimated historical baseline or null
 */
export const estimateHistoricalBaseline = (indexData) => {
  if (!indexData) return null;

  // If we have both value and anomaly, we can estimate the historical baseline
  // Anomaly = Current - Historical, so Historical = Current - Anomaly

  // Try RCP 4.5 first
  if (indexData.projections?.rcp45?.periods?.near?.anomaly !== undefined && 
      indexData.projections?.rcp45?.periods?.near?.value !== undefined) {
    const anomaly = indexData.projections.rcp45.periods.near.anomaly;
    // Only if anomaly is non-zero (zero might mean baseline is unknown)
    if (anomaly !== 0) {
      return indexData.projections.rcp45.periods.near.value - anomaly;
    }
  }

  // Try RCP 8.5 if RCP 4.5 didn't work
  if (indexData.projections?.rcp85?.periods?.near?.anomaly !== undefined && 
      indexData.projections?.rcp85?.periods?.near?.value !== undefined) {
    const anomaly = indexData.projections.rcp85.periods.near.anomaly;
    // Only if anomaly is non-zero
    if (anomaly !== 0) {
      return indexData.projections.rcp85.periods.near.value - anomaly;
    }
  }

  // No valid way to estimate
  return null;
};

/**
 * Generate summary chart data points (baseline, 2030, 2050)
 * 
 * @param {Object} cityData - City climate data
 * @param {String} selectedIndex - Selected climate index code
 * @param {Object} selectedScenarios - Object with selected scenarios flags
 * @returns {Array} - Array of data points for the chart
 */
export const generateSummaryChartData = (cityData, selectedIndex, selectedScenarios) => {
  if (!cityData || !selectedIndex) return [];

  const indexData = cityData.indices[selectedIndex];
  if (!indexData) return [];

  const result = [];
  const hasHistoricalBaseline = Boolean(indexData.historical?.baseline?.value !== undefined);
  let historicalValue = null;

  // Try to get historical value directly
  if (hasHistoricalBaseline) {
    historicalValue = indexData.historical.baseline.value;
  } else {
    // Try to estimate from anomalies if direct value isn't available
    historicalValue = estimateHistoricalBaseline(indexData);
  }

  // Always add a historical point (even if empty/null), this ensures proper X-axis rendering
  result.push({
    period: 'historical',
    displayPeriod: '1980-2005',
    [`${selectedIndex}_historical`]: selectedScenarios.historical ? historicalValue : null
  });

  // Add near future (2030) projections
  const nearPoint = {
    period: '2030',
    displayPeriod: '2030 (2020-2040)',
  };

  if (selectedScenarios.rcp45 && indexData.projections?.rcp45?.periods?.near) {
    nearPoint[`${selectedIndex}_rcp45`] = indexData.projections.rcp45.periods.near.value;
  }

  if (selectedScenarios.rcp85 && indexData.projections?.rcp85?.periods?.near) {
    nearPoint[`${selectedIndex}_rcp85`] = indexData.projections.rcp85.periods.near.value;
  }

  result.push(nearPoint);

  // Add mid-century (2050) projections
  const midPoint = {
    period: '2050',
    displayPeriod: '2050 (2040-2060)',
  };

  if (selectedScenarios.rcp45 && indexData.projections?.rcp45?.periods?.mid) {
    midPoint[`${selectedIndex}_rcp45`] = indexData.projections.rcp45.periods.mid.value;
  }

  if (selectedScenarios.rcp85 && indexData.projections?.rcp85?.periods?.mid) {
    midPoint[`${selectedIndex}_rcp85`] = indexData.projections.rcp85.periods.mid.value;
  }

  result.push(midPoint);

  return result;
};

/**
 * Generate timeseries chart data
 * 
 * @param {Object} cityData - City climate data
 * @param {String} selectedIndex - Selected climate index code
 * @param {Object} selectedScenarios - Object with selected scenarios flags
 * @param {Object} timeseriesRange - Object with start and end years
 * @returns {Array} - Array of year-by-year data points
 */
export const generateTimeseriesChartData = (cityData, selectedIndex, selectedScenarios, timeseriesRange) => {
  if (!cityData || !selectedIndex) return [];

  const indexData = cityData.indices[selectedIndex];
  if (!indexData) return [];

  const result = [];
  const years = {};

  // Add historical data point if it exists
  if (selectedScenarios.historical && indexData.historical?.baseline?.value !== undefined) {
    // If we have historical baseline, try to get a representative year (e.g., middle of baseline period)
    // Most historical baselines are from 1980-2005, so use 1993 as a representative middle year
    const historicalYear = 1993;  // Middle of typical 1980-2005 baseline period
    if (historicalYear >= timeseriesRange.start && historicalYear <= timeseriesRange.end) {
      years[historicalYear] = { 
        year: historicalYear, 
        indexCode: selectedIndex,
        historical_value: indexData.historical.baseline.value
      };
    }
  }

  // Make sure the timeseries data exists and loop through it
  const processTimeseries = (scenario) => {
    const timeseriesData = indexData.projections?.[scenario]?.timeseries;
    if (!timeseriesData || !Array.isArray(timeseriesData)) return;

    timeseriesData.forEach(point => {
      if (!point || typeof point.year !== 'number') return;

      const year = point.year;
      if (year >= timeseriesRange.start && year <= timeseriesRange.end) {
        if (!years[year]) {
          years[year] = { year, indexCode: selectedIndex };
        }
        years[year][`${scenario}_value`] = point.value;
        years[year][`${scenario}_anomaly`] = point.anomaly;
      }
    });
  };

  // Process RCP 4.5 timeseries
  if (selectedScenarios.rcp45) {
    processTimeseries('rcp45');
  }

  // Process RCP 8.5 timeseries
  if (selectedScenarios.rcp85) {
    processTimeseries('rcp85');
  }

  // Convert years object to array and sort by year
  Object.values(years).forEach(yearData => {
    result.push(yearData);
  });

  return result.sort((a, b) => a.year - b.year);
};

/**
 * Calculate trend line data points for time series
 * 
 * @param {Array} timeseriesData - The time series data points
 * @param {String} scenario - The scenario (rcp45 or rcp85)
 * @returns {Array} - Trend line data points
 */
export const calculateTrendLineData = (timeseriesData, scenario) => {
  if (!timeseriesData || !timeseriesData.length || !scenario) return [];

  // Get only points that have data for this scenario
  const validPoints = timeseriesData.filter(
    point => point[`${scenario}_value`] !== undefined && point[`${scenario}_value`] !== null
  );

  if (validPoints.length < 2) return []; // Need at least 2 points for a trend line

  // Extract x (years) and y (values) for linear regression
  const x = validPoints.map(point => point.year);
  const y = validPoints.map(point => point[`${scenario}_value`]);

  // Calculate linear regression (y = mx + b)
  const n = x.length;
  const sumX = x.reduce((acc, val) => acc + val, 0);
  const sumY = y.reduce((acc, val) => acc + val, 0);
  const sumXY = x.reduce((acc, val, i) => acc + val * y[i], 0);
  const sumXX = x.reduce((acc, val) => acc + val * val, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX); // m
  const intercept = (sumY - slope * sumX) / n; // b

  // Function to calculate y value for a given x
  const calculateY = (xValue) => slope * xValue + intercept;

  // Create trend line points (just need the first and last point for a straight line)
  const startYear = Math.min(...x);
  const endYear = Math.max(...x);

  return [
    { year: startYear, [`${scenario}_trend`]: calculateY(startYear) },
    { year: endYear, [`${scenario}_trend`]: calculateY(endYear) }
  ];
};

/**
 * Calculate domain (min/max values) for timeseries chart
 * 
 * @param {Array} timeseriesData - Array of timeseries data points
 * @param {Array} trendLineData - Array of trend line data points
 * @returns {Array} - [min, max] for Y-axis
 */
export const calculateTimeseriesDomain = (timeseriesData, trendLineData = []) => {
  if ((!timeseriesData || !timeseriesData.length) && (!trendLineData || !trendLineData.length)) {
    return [0, 100];
  }

  let min = Infinity;
  let max = -Infinity;
  let hasValues = false;

  // Process regular time series data
  if (timeseriesData && timeseriesData.length) {
    timeseriesData.forEach(point => {
      if (point.rcp45_value !== undefined && point.rcp45_value !== null) {
        min = Math.min(min, point.rcp45_value);
        max = Math.max(max, point.rcp45_value);
        hasValues = true;
      }

      if (point.rcp85_value !== undefined && point.rcp85_value !== null) {
        min = Math.min(min, point.rcp85_value);
        max = Math.max(max, point.rcp85_value);
        hasValues = true;
      }
    });
  }

  // Process trend line data
  if (trendLineData && trendLineData.length) {
    trendLineData.forEach(point => {
      if (point.rcp45_trend !== undefined && point.rcp45_trend !== null) {
        min = Math.min(min, point.rcp45_trend);
        max = Math.max(max, point.rcp45_trend);
        hasValues = true;
      }

      if (point.rcp85_trend !== undefined && point.rcp85_trend !== null) {
        min = Math.min(min, point.rcp85_trend);
        max = Math.max(max, point.rcp85_trend);
        hasValues = true;
      }
    });
  }

  if (!hasValues) return [0, 100]; // Default if no values found

  // If min and max are the same, add some range
  if (min === max) {
    if (min === 0) return [0, 10];
    return [Math.max(0, min * 0.9), min * 1.1];
  }

  // Add some padding
  const padding = (max - min) * 0.1;
  return [Math.max(0, min - padding), max + padding];
};