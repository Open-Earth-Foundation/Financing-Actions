import { useTranslation } from 'react-i18next';
import InfoTooltip from './InfoTooltip';
import { useData } from '../context/DataContext';
import { formatScore, getRiskLevel } from '../constants/riskLevels';

const ResilienceDisclaimer = () => {
  const { t } = useTranslation();
  const { currentResilienceScore } = useData();
  const level = getRiskLevel(currentResilienceScore);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="text-sm text-blue-800">
        <div className="font-semibold flex items-center gap-2">
          {t('resilience:disclaimer.title')}: {formatScore(currentResilienceScore)}
          <InfoTooltip content={t('resilience:disclaimer.tooltip')} />
          <span 
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs"
            style={{
              backgroundColor: level.backgroundColor,
              color: level.textColor
            }}
          >
            {t(`common:resilience_levels.${level.label.toLowerCase()}`)} {t('resilience:disclaimer.resilience_suffix')}
          </span>
        </div>
        <div>{t(`common:resilience_descriptions.${level.label.toLowerCase()}`, { defaultValue: level.description })}</div>
        <div className="mt-2 text-xs text-blue-600">
          {t('resilience:disclaimer.influence_note')}
        </div>
      </div>
    </div>
  );
};

export default ResilienceDisclaimer;