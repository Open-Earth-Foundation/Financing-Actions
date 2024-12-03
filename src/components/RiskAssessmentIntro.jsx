import React from 'react';
import { useTranslation } from 'react-i18next';
import InfoTooltip from './InfoTooltip';

const RiskAssessmentIntro = () => {
  const { t } = useTranslation();

  const sections = [
    {
      key: 'risk_score',
      bgColor: 'bg-blue-50',
    },
    {
      key: 'projections',
      bgColor: 'bg-blue-50',
    },
    {
      key: 'adaptation',
      bgColor: 'bg-blue-50',
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <div className="mx-auto">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            {t('risk-intro:title')}
          </h2>
          <InfoTooltip
            title={t('tooltips:ccra.what_is.title')}
            content={t('tooltips:ccra.what_is.content')}
          />
        </div>

        <p className="text-gray-600 mb-8">
          {t('risk-intro:description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map(({ key, bgColor }) => (
            <div key={key} className={`${bgColor} p-6 rounded-lg`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">
                  {t(`risk-intro:sections.${key}.title`)}
                </h3>
                <InfoTooltip
                  title={t(`risk-intro:sections.${key}.tooltip.title`)}
                  content={t(`risk-intro:sections.${key}.tooltip.content`)}
                />
              </div>
              <p className="text-sm text-gray-600">
                {t(`risk-intro:sections.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentIntro;