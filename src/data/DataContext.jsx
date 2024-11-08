import React, { createContext, useContext, useState, useCallback } from 'react';
import ccraApi from '../api/ccraApi';

const DataContext = createContext(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const transformProjectionData = (currentData, optimisticData, pessimisticData) => {
  // Create a map to store hazard data
  const hazardMap = new Map();

  // Process current scenario data first
  currentData.forEach(item => {
    if (!hazardMap.has(item.hazard)) {
      hazardMap.set(item.hazard, {
        current: item.hazard_score || 0,
        '2030_optimistic': 0,
        '2030_pessimistic': 0,
        '2050_optimistic': 0,
        '2050_pessimistic': 0
      });
    } else {
      // Update current score if it exists
      const existing = hazardMap.get(item.hazard);
      existing.current = item.hazard_score || 0;
    }
  });

  // Process optimistic scenario data
  optimisticData.forEach(item => {
    if (!hazardMap.has(item.hazard)) {
      hazardMap.set(item.hazard, {
        current: 0,
        '2030_optimistic': 0,
        '2030_pessimistic': 0,
        '2050_optimistic': 0,
        '2050_pessimistic': 0
      });
    }
    const hazard = hazardMap.get(item.hazard);
    if (item.latest_year === 2030) {
      hazard['2030_optimistic'] = item.hazard_score || 0;
    } else if (item.latest_year === 2050) {
      hazard['2050_optimistic'] = item.hazard_score || 0;
    }
  });

  // Process pessimistic scenario data
  pessimisticData.forEach(item => {
    if (!hazardMap.has(item.hazard)) {
      hazardMap.set(item.hazard, {
        current: 0,
        '2030_optimistic': 0,
        '2030_pessimistic': 0,
        '2050_optimistic': 0,
        '2050_pessimistic': 0
      });
    }
    const hazard = hazardMap.get(item.hazard);
    if (item.latest_year === 2030) {
      hazard['2030_pessimistic'] = item.hazard_score || 0;
    } else if (item.latest_year === 2050) {
      hazard['2050_pessimistic'] = item.hazard_score || 0;
    }
  });

  // Convert map to object
  const hazardData = {};
  hazardMap.forEach((value, key) => {
    hazardData[key] = value;
  });

  return hazardData;
};

export const DataProvider = ({ children }) => {
  const [riskAssessment, setRiskAssessment] = useState([]);
  const [projectionData, setProjectionData] = useState(null);
  const [indicators, setIndicators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCityData = useCallback(async (actor_id) => {
    if (!actor_id) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch data for all scenarios
      const [currentData, optimisticData, pessimisticData] = await Promise.all([
        ccraApi.getRiskAssessment(actor_id, 'current'),
        ccraApi.getRiskAssessment(actor_id, 'optimistic'),
        ccraApi.getRiskAssessment(actor_id, 'pesimistic')
      ]);

      // Set current risk assessment data
      setRiskAssessment(currentData);

      // Transform and set projection data
      const transformedProjections = transformProjectionData(
        currentData,
        optimisticData,
        pessimisticData
      );
      setProjectionData(transformedProjections);

      // Fetch indicators data
      try {
        const indicatorData = await ccraApi.getIndicatorDetails(actor_id, 'current');
        setIndicators(indicatorData);
      } catch (indicatorError) {
        console.error('Error fetching indicators:', indicatorError);
      }

    } catch (err) {
      console.error('Error fetching city data:', err);
      setError(err.message);
      setRiskAssessment([]);
      setProjectionData(null);
      setIndicators([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    riskAssessment,
    projectionData,
    indicators,
    loading,
    error,
    fetchCityData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};