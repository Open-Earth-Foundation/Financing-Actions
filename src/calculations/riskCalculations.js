/**
 * Calculate vulnerability based on sensitivity and adaptive capacity
 * @param {number} sensitivity - Sensitivity score
 * @param {number} adaptiveCapacity - Adaptive capacity score
 * @returns {number} Vulnerability score
 */
export const calculateVulnerability = (sensitivity, adaptiveCapacity) => {
  if (sensitivity == null || adaptiveCapacity == null) return null;
  return sensitivity * (1 - adaptiveCapacity);
};

/**
 * Calculate risk based on hazard, exposure and vulnerability
 * @param {number} hazard - Climate threat score
 * @param {number} exposure - Exposure score
 * @param {number} vulnerability - Vulnerability score
 * @param {number} [resilienceFactor=1] - Optional resilience modification factor
 * @returns {number} Risk score
 */
export const calculateRisk = (hazard, exposure, vulnerability, resilienceFactor = 1) => {
  if (hazard == null || exposure == null || vulnerability == null) return null;
  // Calculate base risk and apply resilience factor
  return hazard * exposure * vulnerability * resilienceFactor;
};

/**
 * Calculate resilience modification factor
 * Higher resilience (closer to 1) reduces risk
 * Lower resilience (closer to 0) increases risk
 * @param {number} resilienceScore - Resilience score from assessment (0-1)
 * @returns {number} Modification factor
 */
export const calculateResilienceFactor = (resilienceScore) => {
  if (resilienceScore == null) return 1;
  // Center around 0.5 for neutral impact
  // Score of 1.0 = 50% reduction (factor of 0.5)
  // Score of 0.0 = 50% increase (factor of 1.5)
  return 1 - (resilienceScore - 0.5);
};

/**
 * Calculate risk scores for a sector
 * @param {Object[]} allData - Complete dataset (kept for API compatibility)
 * @param {Object} data - Current data row
 * @param {number} resilienceScore - Optional resilience score from assessment
 * @returns {Object} Calculated risk scores and levels
 */
export const calculateSectorRisk = (allData, data, resilienceScore = null) => {
  // Extract base scores
  const climateThreatScore = data["Climate Threat Score"];
  const exposureScore = data["Exposure Score"];
  const sensitivityScore = data["Sensitivity Score"];

  // Use resilience score as adaptive capacity if provided
  const adaptiveCapacity = resilienceScore ?? data["Adaptive Capacity Score"];

  // Calculate vulnerability
  const vulnerability = calculateVulnerability(sensitivityScore, adaptiveCapacity);

  // Calculate resilience factor if score provided
  const resilienceFactor = calculateResilienceFactor(resilienceScore);

  // Calculate risk using the core formula with resilience factor
  const riskScore = calculateRisk(climateThreatScore, exposureScore, vulnerability, resilienceFactor);

  // Return calculated values
  return {
    ...data,
    vulnerabilityScore: vulnerability,
    riskScore: riskScore,
    riskLevel: getRiskLevel(riskScore),
    resilienceFactor: resilienceFactor
  };
};

/**
 * Calculate adjusted risk for existing risk score
 * @param {number} originalRisk - Original risk score
 * @param {number} resilienceScore - Resilience score from assessment
 * @returns {number} Adjusted risk score
 */
export const calculateAdjustedRisk = (originalRisk, resilienceScore) => {
  if (originalRisk == null || resilienceScore == null) return originalRisk;
  const resilienceFactor = calculateResilienceFactor(resilienceScore);
  return originalRisk * resilienceFactor;
};

/**
 * Determine risk level based on risk score
 * Thresholds adjusted for observed range of 0.00-0.60
 * @param {number} score - Risk score
 * @returns {string} Risk level category
 */
export const getRiskLevel = (score) => {
  if (score == null) return "Unknown";
  if (score >= 0.45) return "Very High";    // Top range: 0.45-0.60
  if (score >= 0.30) return "High";         // Upper-middle range: 0.30-0.44
  if (score >= 0.15) return "Medium";       // Lower-middle range: 0.15-0.29
  return "Low";                             // Bottom range: 0.00-0.14
};

/**
 * Get color for risk visualization
 * Colors aligned with new risk level thresholds
 * @param {number} score - Risk score
 * @returns {string} Color code
 */
export const getRiskColor = (score) => {
  if (score == null) return "#CCCCCC";     // Unknown - Gray
  if (score >= 0.45) return "#8B0000";     // Very High - Dark Red
  if (score >= 0.30) return "#E80A0A";     // High - Red
  if (score >= 0.15) return "#E06835";     // Medium - Orange
  return "#3B82F6";                        // Low - Blue
};

/**
 * Format risk score for display
 * @param {number} score - Risk score to format
 * @param {number} [decimals=2] - Number of decimal places
 * @returns {string} Formatted score
 */
export const formatRiskScore = (score, decimals = 2) => {
  if (score == null) return 'N/A';
  return Number(score).toFixed(decimals);
};

// Export constants for thresholds
export const RISK_THRESHOLDS = {
  VERY_HIGH: 0.45,
  HIGH: 0.30,
  MEDIUM: 0.15,
  LOW: 0
};