import React, { createContext, useContext, useState, useCallback } from 'react';
import ccraApi from '../api/ccraApi';
import { calculateAdjustedRiskAssessment, normalizeScore } from '../calculations/riskCalculations';

const DataContext = createContext(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const countVulnerabilityIndicators = (indicators) => {
  const counts = {};
  if (!indicators || !Array.isArray(indicators)) {
    console.error('Invalid or missing indicators array');
    return counts;
  }

  indicators.forEach(indicator => {
    if (!indicator.hazard || !indicator.keyimpact) return;

    const key = `${indicator.hazard}_${indicator.keyimpact}`.toLowerCase();
    if (indicator.category?.toLowerCase() === 'vulnerability') {
      counts[key] = (counts[key] || 0) + 1;
    }
  });

  return counts;
};

export const DataProvider = ({ children }) => {
  const [riskAssessment, setRiskAssessment] = useState([]);
  const [projectionData, setProjectionData] = useState(null);
  const [indicators, setIndicators] = useState([]);
  const [indicatorCounts, setIndicatorCounts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentResilienceScore, setCurrentResilienceScore] = useState(null);

  const processRiskAssessmentData = useCallback((rawData, vulnIndicatorCounts, resilience = null) => {
    if (!rawData || !Array.isArray(rawData)) return [];

    console.log('Processing raw data with resilience:', resilience);

    const groupedRisks = rawData.reduce((acc, risk) => {
      const key = `${risk.hazard}_${risk.keyimpact}`.toLowerCase();
      if (!acc[key]) acc[key] = [];
      acc[key].push({ ...risk, indicator_count: vulnIndicatorCounts[key] || 0 });
      return acc;
    }, {});

    const processedRisks = Object.values(groupedRisks).flatMap(group => {
      const bounds = {
        lower: group[0].risk_lower_limit,
        upper: group[0].risk_upper_limit
      };

      return group.map(risk => {
        const processed = calculateAdjustedRiskAssessment(
          risk,
          resilience,
          vulnIndicatorCounts,
          bounds
        );
        return processed;
      });
    });

    return processedRisks.sort((a, b) => b.risk_score - a.risk_score);
  }, []);

  const updateRiskAssessment = useCallback((rawRiskData, vulnIndicatorCounts, resilience = null) => {
    if (!rawRiskData?.length) return;

    console.log('Updating risk assessment:', {
      riskCount: rawRiskData.length,
      hasResilience: resilience !== null,
      resilienceScore: resilience
    });

    const processedData = processRiskAssessmentData(rawRiskData, vulnIndicatorCounts, resilience);
    setRiskAssessment(processedData);
  }, [processRiskAssessmentData]);

  const updateResilienceScore = useCallback((resilience) => {
    console.log('Resilience score update requested:', resilience);

    if (resilience === currentResilienceScore) {
      console.log('Skipping identical resilience score update');
      return;
    }

    setCurrentResilienceScore(resilience);

    if (riskAssessment.length > 0) {
      const originalData = riskAssessment.map(risk => ({
        ...risk,
        original_risk_score: risk.normalised_risk_score,
        original_vulnerability_score: risk.vulnerability_score
      }));

      updateRiskAssessment(originalData, indicatorCounts, resilience);
    }
  }, [riskAssessment, indicatorCounts, updateRiskAssessment, currentResilienceScore]);

  const fetchCityData = useCallback(async (actor_id) => {
    if (!actor_id) return;

    try {
      setLoading(true);
      setError(null);
      setCurrentResilienceScore(null);

      const indicatorData = await ccraApi.getIndicatorDetails(actor_id, 'current');
      const vulnCounts = countVulnerabilityIndicators(indicatorData);
      setIndicatorCounts(vulnCounts);
      setIndicators(indicatorData);

      const [currentData, optimisticData, pessimisticData] = await Promise.all([
        ccraApi.getRiskAssessment(actor_id, 'current'),
        ccraApi.getRiskAssessment(actor_id, 'optimistic'),
        ccraApi.getRiskAssessment(actor_id, 'pesimistic')
      ]);

      updateRiskAssessment(currentData, vulnCounts, null);

      const hazardMap = new Map();
      currentData.forEach(item => {
        if (!hazardMap.has(item.hazard)) {
          hazardMap.set(item.hazard, {
            current: item.hazard_score || 0,
            '2030_optimistic': 0,
            '2030_pessimistic': 0,
            '2050_optimistic': 0,
            '2050_pessimistic': 0
          });
        }
      });

      [optimisticData, pessimisticData].forEach((data, index) => {
        const scenario = index === 0 ? 'optimistic' : 'pessimistic';
        data.forEach(item => {
          if (!hazardMap.has(item.hazard)) return;
          const hazard = hazardMap.get(item.hazard);
          if (item.latest_year) {
            hazard[`${item.latest_year}_${scenario}`] = item.hazard_score || 0;
          }
        });
      });

      setProjectionData(Object.fromEntries(hazardMap));

    } catch (err) {
      console.error('Error fetching city data:', err);
      setError(err.message);
      setRiskAssessment([]);
      setProjectionData(null);
      setIndicators([]);
      setIndicatorCounts({});
    } finally {
      setLoading(false);
    }
  }, [updateRiskAssessment]);

  const value = {
    riskAssessment,
    projectionData,
    indicators,
    loading,
    error,
    fetchCityData,
    updateResilienceScore,
    currentResilienceScore,
    normalizeScore
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};