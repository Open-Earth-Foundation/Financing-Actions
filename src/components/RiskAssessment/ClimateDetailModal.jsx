import React from 'react';
import { useTranslation } from 'react-i18next';
import { getIndexUnit, getIndexHazardType, getIndexTrend, getIndexLabel } from '../../constants/climateIndices';

const ClimateDetailModal = ({
  isOpen,
  onClose,
  cityName,
  indexCode,
  indexData,
}) => {
  const { t, i18n } = useTranslation();

  // Return early, but after hooks
  if (!isOpen || !indexCode || !indexData) return null;

  const calculatePercentageChange = (baseline, projected) => {
    if (!baseline || !projected) return null;
    return ((projected - baseline) / baseline) * 100;
  };

  const unit = getIndexUnit(indexCode);
  const hazardType = getIndexHazardType(indexCode);
  const trend = getIndexTrend(indexCode, i18n.language);
  const baseline = indexData.historical?.baseline?.value;

  const rcp45_2030 = indexData.projections?.rcp45?.periods?.near?.value;
  const rcp45_2050 = indexData.projections?.rcp45?.periods?.mid?.value;
  const rcp85_2030 = indexData.projections?.rcp85?.periods?.near?.value;
  const rcp85_2050 = indexData.projections?.rcp85?.periods?.mid?.value;

  const percentChanges = {
    rcp45_2030: calculatePercentageChange(baseline, rcp45_2030),
    rcp45_2050: calculatePercentageChange(baseline, rcp45_2050),
    rcp85_2030: calculatePercentageChange(baseline, rcp85_2030),
    rcp85_2050: calculatePercentageChange(baseline, rcp85_2050),
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {getIndexLabel(indexCode, i18n.language)}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="sr-only">{t('common:actions.close')}</span>
              ×
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-700">
            <p><strong>{t('common:labels.how_to_use')}:</strong></p>
            <p className="mt-1">
              {t('components:climateDetail.usage_guide')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateDetailModal;