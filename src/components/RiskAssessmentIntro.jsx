import React from 'react';
import { useTranslation } from 'react-i18next';

const RiskAssessmentIntro = () => {
  const { t } = useTranslation();

  const sections = [
    {
      key: 'risk_score',
      bgColor: 'bg-blue-50',
      content: {
        title: "Understanding Risk Scores",
        mainText: "Risk scores are calculated by combining hazard likelihood, exposure levels, and vulnerability factors. These scores help identify areas requiring immediate attention and long-term planning.",
        details: [
          "Hazard assessment considers both current climate data and future projections",
          "Exposure analysis evaluates population and infrastructure at risk",
          "Vulnerability factors include social, economic, and environmental conditions"
        ]
      }
    },
    {
      key: 'projections',
      bgColor: 'bg-blue-50',
      content: {
        title: "Climate Projections",
        mainText: "Future climate scenarios are modeled using the latest IPCC projections and local climate data to understand potential impacts and inform adaptation strategies.",
        details: [
          "Short-term projections (2030) for immediate planning",
          "Mid-term scenarios (2050) for infrastructure development",
          "Long-term outlook (2100) for strategic planning"
        ]
      }
    },
    {
      key: 'adaptation',
      bgColor: 'bg-blue-50',
      content: {
        title: "Adaptation Measures",
        mainText: "Based on risk assessments, cities can develop targeted adaptation strategies to build resilience against climate impacts.",
        details: [
          "Infrastructure improvements and urban planning",
          "Community engagement and capacity building",
          "Policy development and implementation"
        ]
      }
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <div className="mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          {t('risk-intro:title')}
        </h2>

        <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-medium mb-3">
            {t('tooltips:ccra.what_is.title')}
          </h3>
          <p className="text-gray-600 mb-4">
            {t('tooltips:ccra.what_is.content')}
          </p>
        </div>

        <h2 className="text-gray-600 mb-8">
          {t('risk-intro:description')}:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map(({ key, bgColor }) => (
            <div key={key} className="bg-blue-50 rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">
                {t(`risk-intro:sections.${key}.cards.title`)}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                {t(`risk-intro:sections.${key}.cards.content`)}
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                {Array.from({ length: parseInt(t(`risk-intro:sections.${key}.cards.detailsCount`)) }).map((_, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mt-1.5 mr-2" />
                    {t(`risk-intro:sections.${key}.cards.details.${index}`)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentIntro;