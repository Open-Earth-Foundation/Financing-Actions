import React from 'react';
import { useTranslation } from 'react-i18next';

function ClimateProjectionsChart() {
  const { t } = useTranslation('components'); 
  const [selectedYear, setSelectedYear] = React.useState(null);
  const [range, setRange] = React.useState(null);
  const [value, setValue] = React.useState(null);


  return (
    <div>
      <h3>{t('climateProjections.climateIndices')}</h3>
      <p>{t('climateProjections.chart.tooltip.year')}: {selectedYear}</p>
      <div>
        <span>{t('climateProjections.chart.tooltip.range')}: {range}</span>
        <span>{t('climateProjections.chart.tooltip.value')}: {value}</span>
      </div>
    </div>
  );
}

export default ClimateProjectionsChart;