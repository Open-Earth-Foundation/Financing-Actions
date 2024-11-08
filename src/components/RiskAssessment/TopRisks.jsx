import React from 'react';
import { capitalize } from '../../utils/textUtils';

const TopRisks = ({ riskAssessment }) => {
  // Get top 3 risks
  const topRisks = [...riskAssessment]
    .sort((a, b) => b.risk_score - a.risk_score)
    .slice(0, 3);

  return (
    <div className="flex gap-4">
      {topRisks.map((risk, index) => (
        <div 
          key={`${risk.hazard}-${risk.keyimpact}-${index}`}
          className="flex-1 p-6 bg-white rounded-lg border border-[#D7D8FA]"
        >
          {/* Key Impact / Sector */}
          <div className="uppercase text-[#575757] text-[10px] font-semibold tracking-[1.5px] py-2">
            {capitalize(risk.keyimpact)}
          </div>

          {/* Hazard Name */}
          <div className="mb-4">
            <h4 className="text-2xl font-semibold">
              {capitalize(risk.hazard)}
            </h4>
            <span className="text-[#575757] text-xs font-medium leading-4 tracking-[0.5px]">
              Hazard
            </span>
          </div>

          {/* Risk Score */}
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2">
              <span className="text-[#575757] text-sm font-medium leading-5 tracking-[0.5px]">
                Risk Score
              </span>
              <span className="text-4xl font-semibold font-inter">
                {risk.risk_score?.toFixed(2)}
              </span>
            </div>

            {/* Progress bars */}
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-[5px] flex-1 rounded-full ${
                    i < Math.ceil(risk.risk_score * 4)
                      ? 'bg-[#2351DC]'
                      : 'bg-[#E2E2E2]'
                  }`}
                />
              ))}
            </div>

            {/* Scores */}
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-[#575757] text-xs font-medium leading-4 tracking-[0.5px]">
                  Hazard Score
                </span>
                <span className="text-[#575757] text-base font-semibold">
                  {risk.hazard_score?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#575757] text-xs font-medium leading-4 tracking-[0.5px]">
                  Exposure Score
                </span>
                <span className="text-[#575757] text-base font-semibold">
                  {risk.exposure_score?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#575757] text-xs font-medium leading-4 tracking-[0.5px]">
                  Vulnerability Score
                </span>
                <span className="text-[#575757] text-base font-semibold">
                  {risk.vulnerability_score?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopRisks;