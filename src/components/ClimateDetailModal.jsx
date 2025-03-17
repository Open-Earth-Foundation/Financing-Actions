import React from 'react';
import { useTranslation } from 'react-i18next';

function ClimateDetailComponent({ baseline }) {
  const { t } = useTranslation('components');
  const periodLabels = {
    near: t('climateDetail.periods.near'),
    mid: t('climateDetail.periods.mid'),
    far: t('climateDetail.periods.far')
  };

  return (
    <div>
      <div className="modal-content">
        <h2>{t('climateDetail.modelData')}</h2>
        <div className="data-section">
          <h3>{t('climateDetail.baseline')}</h3>
          <p>{t('climateDetail.historicalPeriod')}: {baseline.period}</p>
        </div>
      </div>
    </div>
  );
}

export default ClimateDetailComponent;