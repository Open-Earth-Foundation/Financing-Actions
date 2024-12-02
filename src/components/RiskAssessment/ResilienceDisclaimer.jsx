import React from 'react';
import { useData } from '../../data/DataContext';
import { formatScore } from '../../constants/riskLevels';
import { getResilienceLevel } from '../../constants/resilienceLevels';

const ResilienceDisclaimer = ({ resilienceScore }) => {
  const { currentResilienceScore } = useData();

  if (resilienceScore === null) return null;

  const level = getResilienceLevel(currentResilienceScore);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="text-sm text-blue-800">
        <div className="font-semibold flex items-center gap-2">
          Qualitative Assessment Score: {formatScore(currentResilienceScore)}
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs"
            style={{
              backgroundColor: level.backgroundColor,
              color: level.textColor
            }}
          >
            {level.label} Resilience
          </span>
        </div>
        <div>{level.description}</div>
      </div>
    </div>
  );
};

export default ResilienceDisclaimer;