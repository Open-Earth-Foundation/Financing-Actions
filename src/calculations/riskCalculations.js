import { getRiskLevel } from '../constants/riskLevels';

const calculateRisk = (hazard, exposure, vulnerability) => {
  if (!hazard || !exposure || !vulnerability) return 0;
  return Number(hazard) * Number(exposure) * Number(vulnerability);
};

const normalizeScore = (score, lowerLimit, upperLimit) => {
  if (!lowerLimit || !upperLimit || lowerLimit === upperLimit) return score;
  const normalized = (score - lowerLimit) / (upperLimit - lowerLimit);
  return Math.max(0.01, Math.min(0.99, normalized));
};

const calculateAdjustedVulnerability = (vulnerability, resilienceScore, indicatorCount) => {
  if (!vulnerability || resilienceScore === null || resilienceScore === undefined) {
    return Number(vulnerability);
  }

  // Calculate raw vulnerability using the new formula: v2 = v1 + v1(0.5-RS)
  const rawVulnerability = Number(vulnerability) * (1 + (0.5 - resilienceScore));

  // Ensure the result stays within bounds (0.01 to 0.99)
  return Math.max(0.01, Math.min(0.99, rawVulnerability));
};

const calculateAdjustedRiskAssessment = (data, resilienceScore, indicatorCounts, bounds) => {
  if (!data) return null;

  try {
    // Calculate raw risk score using components
    const rawRiskScore = calculateRisk(
      data.hazard_score,
      data.exposure_score,
      data.vulnerability_score
    );

    // Normalize the raw score using group bounds
    const normalizedScore = normalizeScore(
      rawRiskScore,
      bounds.lower,
      bounds.upper
    );

    // If no resilience adjustment needed, return normalized scores
    if (resilienceScore === null) {
      return {
        ...data,
        calculated_raw_score: rawRiskScore,
        risk_score: normalizedScore,
        original_risk_score: normalizedScore
      };
    }

    // Get indicator count for this specific hazard/keyimpact combination
    const key = `${data.hazard}_${data.keyimpact}`.toLowerCase();
    const indicatorCount = data.indicator_count || indicatorCounts[key] || 0;

    // Calculate adjusted vulnerability using resilience and specific indicator count
    const adjustedVulnerability = calculateAdjustedVulnerability(
      data.vulnerability_score,
      resilienceScore,
      indicatorCount
    );

    // Calculate new risk score with adjusted vulnerability
    const adjustedRawScore = calculateRisk(
      data.hazard_score,
      data.exposure_score,
      adjustedVulnerability
    );

    // Normalize adjusted score
    const adjustedNormalizedScore = normalizeScore(
      adjustedRawScore,
      bounds.lower,
      bounds.upper
    );

    return {
      ...data,
      calculated_raw_score: rawRiskScore,
      risk_score: adjustedNormalizedScore,
      original_risk_score: normalizedScore,
      vulnerability_score: adjustedVulnerability,
      original_vulnerability_score: data.vulnerability_score,
      resilience_score: resilienceScore,
      indicator_count: indicatorCount
    };
  } catch (error) {
    console.error('Error in risk calculation:', error);
    return data;
  }
};

export {
  calculateRisk,
  calculateAdjustedRiskAssessment,
  calculateAdjustedVulnerability,
  normalizeScore
};