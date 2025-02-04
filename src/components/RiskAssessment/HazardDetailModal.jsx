import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { formatScore } from '../../constants/riskLevels';

const HazardDetailModal = ({ isOpen, onClose, hazardData }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const calculatePercentageChange = (current, projected) => {
    if (!current || !projected) return 0;
    return ((projected - current) / current) * 100;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {t('sections:projections.modal.title')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(90vh-100px)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                  {t('sections:projections.modal.hazard_impact')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                  {t('sections:projections.modal.current')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                  2030 (RCP 4.5)
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                  2030 (RCP 8.5)
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                  2050 (RCP 4.5)
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                  2050 (RCP 8.5)
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(hazardData).map(([key, data]) => (
                <tr key={key} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {t(`common:hazards.${key.split('/')[0].toLowerCase()}`)}
                    {key.includes('/') && (
                      <span className="text-gray-500">
                        {' / '}
                        {t(`common:sectors.${key.split('/')[1].toLowerCase()}`)}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {formatScore(data.current)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-900">
                        {formatScore(data['2030_optimistic'])}
                      </span>
                      <span className={`text-xs ${
                        calculatePercentageChange(data.current, data['2030_optimistic']) > 0 
                          ? 'text-red-500' 
                          : 'text-green-500'
                      }`}>
                        {calculatePercentageChange(data.current, data['2030_optimistic']).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-900">
                        {formatScore(data['2030_pessimistic'])}
                      </span>
                      <span className={`text-xs ${
                        calculatePercentageChange(data.current, data['2030_pessimistic']) > 0 
                          ? 'text-red-500' 
                          : 'text-green-500'
                      }`}>
                        {calculatePercentageChange(data.current, data['2030_pessimistic']).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-900">
                        {formatScore(data['2050_optimistic'])}
                      </span>
                      <span className={`text-xs ${
                        calculatePercentageChange(data.current, data['2050_optimistic']) > 0 
                          ? 'text-red-500' 
                          : 'text-green-500'
                      }`}>
                        {calculatePercentageChange(data.current, data['2050_optimistic']).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-900">
                        {formatScore(data['2050_pessimistic'])}
                      </span>
                      <span className={`text-xs ${
                        calculatePercentageChange(data.current, data['2050_pessimistic']) > 0 
                          ? 'text-red-500' 
                          : 'text-green-500'
                      }`}>
                        {calculatePercentageChange(data.current, data['2050_pessimistic']).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HazardDetailModal;