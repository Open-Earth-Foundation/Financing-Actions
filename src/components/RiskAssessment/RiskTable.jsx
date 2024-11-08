import React from 'react';
import { Info } from 'lucide-react';

const RiskTable = ({ riskAssessment, onShowDetails }) => {
  // Debug log
  console.log('Rendering RiskTable with data:', riskAssessment);

  if (!riskAssessment || riskAssessment.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No risk assessment data available.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Year</th>
            <th className="px-4 py-2 text-left">Key Impact</th>
            <th className="px-4 py-2 text-left">Hazard</th>
            <th className="px-4 py-2 text-left">Hazard Score</th>
            <th className="px-4 py-2 text-left">Exposure Score</th>
            <th className="px-4 py-2 text-left">Vulnerability Score</th>
            <th className="px-4 py-2 text-left">Risk Score</th>
            <th className="px-4 py-2 text-left">Normalized Risk</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {riskAssessment.map((row, index) => (
            <tr
              key={`${row.keyimpact}-${row.hazard}-${index}`}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-2">{row.latest_year}</td>
              <td className="px-4 py-2 capitalize">{row.keyimpact}</td>
              <td className="px-4 py-2 capitalize">{row.hazard}</td>
              <td className="px-4 py-2">{row.hazard_score?.toFixed(3) ?? 'N/A'}</td>
              <td className="px-4 py-2">{row.exposure_score?.toFixed(3) ?? 'N/A'}</td>
              <td className="px-4 py-2">{row.vulnerability_score?.toFixed(3) ?? 'N/A'}</td>
              <td className="px-4 py-2">{row.risk_score?.toFixed(3) ?? 'N/A'}</td>
              <td className="px-4 py-2">{row.normalised_risk_score?.toFixed(3) ?? 'N/A'}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onShowDetails?.(row)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  title="View Details"
                >
                  <Info className="w-5 h-5 text-gray-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskTable;