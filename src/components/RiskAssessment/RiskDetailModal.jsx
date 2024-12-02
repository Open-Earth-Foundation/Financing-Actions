import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ccraApi from '../../api/ccraApi';

const SCENARIOS = [
  { id: 'current', label: 'Current', description: 'Current climate conditions' },
  { id: 'optimistic', label: 'RCP 4.5', description: 'Optimistic climate scenario' },
  { id: 'pesimistic', label: 'RCP 8.5', description: 'Pessimistic climate scenario' }
];

const RiskDetailModal = ({ isOpen, onClose, rowData, actor_id }) => {
  const [activeScenario, setActiveScenario] = useState('current');
  const [indicators, setIndicators] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIndicators = async () => {
      if (!isOpen || !actor_id) return;

      try {
        setLoading(true);
        console.debug('Fetching indicators for:', {
          actor_id,
          scenario: activeScenario,
          hazard: rowData?.hazard,
          keyimpact: rowData?.keyimpact
        });

        const data = await ccraApi.getIndicatorDetails(actor_id, activeScenario);
        console.debug('Received indicators:', data);

        // Filter indicators for current hazard and keyimpact
        const relevantIndicators = data.filter(indicator => {
          const match = indicator.hazard?.toLowerCase() === rowData?.hazard?.toLowerCase() &&
                       indicator.keyimpact?.toLowerCase() === rowData?.keyimpact?.toLowerCase();

          console.debug('Indicator match check:', {
            indicator: {
              hazard: indicator.hazard,
              keyimpact: indicator.keyimpact,
              category: indicator.category
            },
            rowData: {
              hazard: rowData?.hazard,
              keyimpact: rowData?.keyimpact
            },
            isMatch: match
          });

          return match;
        });

        console.debug('Filtered indicators:', relevantIndicators);
        setIndicators(relevantIndicators);
        setError(null);
      } catch (err) {
        console.error('Error fetching indicators:', err);
        setError('Failed to load indicator details');
      } finally {
        setLoading(false);
      }
    };

    fetchIndicators();
  }, [isOpen, actor_id, activeScenario, rowData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold capitalize">
                {rowData.hazard} Impact on {rowData.keyimpact}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Detailed indicator information for different climate scenarios
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4">
              {SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => setActiveScenario(scenario.id)}
                  className={`
                    py-2 px-4 border-b-2 text-sm font-medium
                    ${activeScenario === scenario.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {scenario.label}
                  <span className="ml-2 text-xs text-gray-400">
                    {scenario.description}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading indicator data...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500">{error}</p>
              </div>
            ) : indicators?.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No indicator data available for this scenario.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Indicator</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Units</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {indicators?.map((indicator, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 capitalize">{indicator.category}</td>
                        <td className="px-4 py-2 capitalize">{indicator.indicator_name}</td>
                        <td className="px-4 py-2">
                          {indicator.indicator_normalized_score?.toFixed(2) ?? 'N/A'}
                        </td>
                        <td className="px-4 py-2">{indicator.indicator_units ?? 'N/A'}</td>
                        <td className="px-4 py-2">{indicator.indicator_year}</td>
                        <td className="px-4 py-2">{indicator.datasource}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskDetailModal;