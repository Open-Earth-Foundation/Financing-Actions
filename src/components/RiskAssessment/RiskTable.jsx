import React, { useState } from 'react';
import { Info } from 'lucide-react';
import ResilienceDisclaimer from './ResilienceDisclaimer';
import RiskDetailModal from './RiskDetailModal';
import { getRiskLevel, getRiskChangeDescription, formatScore } from '../../constants/riskLevels';

const RiskTable = ({ riskAssessment, actor_id, resilienceScore }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowDetails = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  if (!riskAssessment || riskAssessment.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No risk assessment data available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ResilienceDisclaimer resilienceScore={resilienceScore} />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key Impact
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hazard
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Components
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Score
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Level
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {riskAssessment.map((row, index) => {
              const riskLevel = getRiskLevel(row.risk_score);
              const changeDescription = resilienceScore !== null ? 
                getRiskChangeDescription(row.original_risk_score, row.risk_score) : null;

              return (
                <tr key={`${row.keyimpact}-${row.hazard}-${index}`} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.latest_year}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {row.keyimpact}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {row.hazard}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="space-y-1 text-sm">
                      <div className="text-gray-600">
                        Hazard: <span className="font-medium text-gray-900">{formatScore(row.hazard_score)}</span>
                      </div>
                      <div className="text-gray-600">
                        Exposure: <span className="font-medium text-gray-900">{formatScore(row.exposure_score)}</span>
                      </div>
                      <div className="text-gray-600">
                        Vulnerability: {" "}
                        <span className="font-medium">
                          {resilienceScore !== null && (
                            <span className="text-gray-500 text-xs mr-1">
                              {formatScore(row.original_vulnerability_score)} →
                            </span>
                          )}
                          <span className={resilienceScore !== null ? "text-blue-600" : "text-gray-900"}>
                            {formatScore(row.vulnerability_score)}
                          </span>
                          {row.indicator_count > 0 && (
                            <span className="text-gray-500 text-xs ml-1">
                              ({row.indicator_count} indicators)
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {resilienceScore !== null && (
                        <div className="text-sm text-gray-500">
                          {formatScore(row.original_risk_score)}
                        </div>
                      )}
                      <div className="text-sm font-medium" style={{ color: changeDescription?.color }}>
                        {formatScore(row.risk_score)}
                        {changeDescription && (
                          <span className="text-xs ml-1">({changeDescription.text})</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: riskLevel.backgroundColor,
                        color: riskLevel.textColor
                      }}
                    >
                      {riskLevel.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleShowDetails(row)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                      title="View Details"
                    >
                      <Info className="w-5 h-5 text-gray-500" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <RiskDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rowData={selectedRow}
        actor_id={actor_id}
      />
    </div>
  );
};

export default RiskTable;