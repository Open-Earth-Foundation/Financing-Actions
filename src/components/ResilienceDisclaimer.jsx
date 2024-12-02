import InfoTooltip from './InfoTooltip'; // Importing the InfoTooltip component
import { useData } from '../context/DataContext'; // Assuming the context is in this path
import { formatScore, getRiskLevel } from '../constants/riskLevels'; // Use your paths

const ResilienceDisclaimer = () => {
  const { currentResilienceScore } = useData();
  const level = getRiskLevel(currentResilienceScore);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="text-sm text-blue-800">
        <div className="font-semibold flex items-center gap-2">
          Qualitative Assessment Score: {formatScore(currentResilienceScore)}
          <InfoTooltip content="This score represents the city's overall capacity to respond to and recover from climate-related risks based on institutional, infrastructural, and social factors." />
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs"
            style={{
              backgroundColor: level.backgroundColor,
              color: level.textColor
            }}>
            {level.label} Resilience
          </span>
        </div>
        <div>{level.description}</div>
        <div className="mt-2 text-xs text-blue-600">
          This assessment influences the final risk calculations by adjusting vulnerability scores based on the city's resilience capacity.
        </div>
      </div>
    </div>
  );
};

export default ResilienceDisclaimer;