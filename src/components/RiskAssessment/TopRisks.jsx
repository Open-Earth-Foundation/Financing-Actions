import React, { useMemo } from 'react';
import { capitalize } from '../../utils/textUtils';
import { getRiskLevel, formatScore, getRiskChangeDescription } from '../../constants/riskLevels';

const TopRisks = ({ riskAssessment, resilienceScore }) => {
  // Get top 3 risks using memoized sorting
  const topRisks = useMemo(() => {
    if (!riskAssessment || riskAssessment.length === 0) return [];

    return [...riskAssessment]
      .sort((a, b) => {
        const scoreA = a.risk_score ?? 0;
        const scoreB = b.risk_score ?? 0;
        return scoreB - scoreA;
      })
      .slice(0, 3);
  }, [riskAssessment]);

  if (topRisks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No risk data available.
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {topRisks.map((risk, index) => {
        const riskLevel = getRiskLevel(risk.risk_score);
        const changeDescription = resilienceScore !== null ?
          getRiskChangeDescription(risk.original_risk_score, risk.risk_score) : null;

        return (
          <div 
            key={`${risk.hazard}-${risk.keyimpact}-${index}`}
            className="flex-1 p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            {/* Key Impact / Sector */}
            <div className="flex items-center justify-between mb-4">
              <div className="uppercase text-gray-600 text-xs font-semibold tracking-wider">
                {capitalize(risk.keyimpact)}
              </div>
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: riskLevel.backgroundColor,
                  color: riskLevel.textColor
                }}
              >
                {riskLevel.label}
              </span>
            </div>

            {/* Hazard Name */}
            <div className="mb-6">
              <h4 className="text-2xl font-semibold text-gray-900">
                {capitalize(risk.hazard)}
              </h4>
              <span className="text-gray-500 text-sm">
                Climate Hazard
              </span>
            </div>

            {/* Risk Score */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-600 text-sm font-medium">
                  Risk Score
                </span>
                <div className="flex items-baseline gap-2">
                  {resilienceScore !== null && (
                    <span className="text-gray-500 text-sm">
                      {formatScore(risk.original_risk_score)}
                    </span>
                  )}
                  <span className="text-3xl font-bold" style={{ color: riskLevel.color }}>
                    {formatScore(risk.risk_score)}
                  </span>
                </div>
              </div>

              {/* Change Description */}
              {changeDescription && (
                <div className="text-sm text-right" style={{ color: changeDescription.color }}>
                  {changeDescription.text}
                </div>
              )}

              {/* Progress bars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => {
                  const thresholds = [0.01, 0.078, 0.165, 0.289, 0.508];
                  const isActive = risk.risk_score >= thresholds[i];

                  return (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        isActive ? 'bg-current' : 'bg-gray-200'
                      }`}
                      style={{ color: isActive ? riskLevel.color : undefined }}
                    />
                  );
                })}
              </div>

              {/* Component Scores */}
              <div className="space-y-3 pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Hazard Score</span>
                  <span className="font-medium text-gray-900">
                    {formatScore(risk.hazard_score)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Exposure Score</span>
                  <span className="font-medium text-gray-900">
                    {formatScore(risk.exposure_score)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Vulnerability Score</span>
                  <div className="flex items-baseline gap-2">
                    {resilienceScore !== null && (
                      <span className="text-gray-500 text-xs">
                        {formatScore(risk.original_vulnerability_score)}
                      </span>
                    )}
                    <span className={`font-medium ${
                      resilienceScore !== null ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {formatScore(risk.vulnerability_score)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopRisks;