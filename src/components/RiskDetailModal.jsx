import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import ccraApi from '../../api/ccraApi';

const RiskDetailModal = ({ isOpen, onClose, rowData, actor_id }) => {
  const { t } = useTranslation();
  console.log(i18n.options.ns);
  const [activeScenario, setActiveScenario] = useState('current');
  const [indicators, setIndicators] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchIndicators = async () => {
      if (!isOpen || !actor_id) return;

      try {
        setLoading(true);
        const data = await ccraApi.getIndicatorDetails(actor_id, activeScenario);

        const relevantIndicators = data.filter(indicator => 
          indicator.hazard?.toLowerCase() === rowData?.hazard?.toLowerCase() &&
          indicator.keyimpact?.toLowerCase() === rowData?.keyimpact?.toLowerCase()
        );

        setIndicators(relevantIndicators);
        setError(null);
      } catch (err) {
        console.error('Error fetching indicators:', err);
        setError(t('error'));
      } finally {
        setLoading(false);
      }
    };

    fetchIndicators();
  }, [isOpen, actor_id, activeScenario, rowData, t]);

  if (!isOpen) return null;
  
  const SCENARIOS = [
    { 
      id: 'current', 
      label: t('scenarios.current.label'), 
      description: t('scenarios.current.description') 
    },
    { 
      id: 'optimistic', 
      label: t('scenarios.optimistic.label'), 
      description: t('scenarios.optimistic.description') 
    },
    { 
      id: 'pessimistic', 
      label: t('scenarios.pessimistic.label'), 
      description: t('scenarios.pessimistic.description') 
    }
  ];

  console.log(t('scenarios.current.label')); // Should log "Current"
  console.log(t('loading')); // Should log "Loading indicator data..."

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold capitalize">
                {rowData.hazard} {t('title.impact')} algo {rowData.keyimpact}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {t('title.subtitle')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

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

          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">{t('loading')}</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500">{error}</p>
              </div>
            ) : indicators?.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">{t('no_data')}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        'category',
                        'indicator',
                        'score',
                        'units',
                        'year',
                        'source'
                      ].map((header) => (
                        <th key={header} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          {t(`table.headers.${header}`)}
                        </th>
                      ))}
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