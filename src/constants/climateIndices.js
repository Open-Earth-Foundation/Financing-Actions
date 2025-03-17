// src/constants/climateIndices.js

/**
 * Climate indices mapping with metadata
 */
export const CLIMATE_INDEX_MAP = {
  'CDD': {
    hazardType: 'droughts',
    label: {
      en: 'Consecutive Dry Days',
      'pt-BR': 'Dias Secos Consecutivos'
    },
    description: {
      en: 'Maximum number of consecutive days with daily precipitation < 1mm',
      'pt-BR': 'Número máximo de dias consecutivos com precipitação diária < 1mm'
    },
    unit: 'days',
    increasing: {
      negative: true, // Is increasing value negative for this index?
      description: {
        en: 'Longer periods without rain can lead to drought conditions',
        'pt-BR': 'Períodos mais longos sem chuva podem levar a condições de seca'
      }
    }
  },
  'RX1day': {
    hazardType: 'floods',
    label: {
      en: 'Max 1-day Precipitation',
      'pt-BR': 'Precipitação Máxima em 1 Dia'
    },
    description: {
      en: 'Annual maximum 1-day precipitation',
      'pt-BR': 'Precipitação máxima anual em 1 dia'
    },
    unit: 'mm',
    increasing: {
      negative: true, // Higher values could mean more flood risk
      description: {
        en: 'More intense rainfall events increase flood risk',
        'pt-BR': 'Eventos de chuva mais intensos aumentam o risco de inundação'
      }
    }
  },
  'RX5day': {
    hazardType: 'floods',
    label: {
      en: 'Max 5-day Precipitation',
      pt: 'Precipitação Máxima em 5 Dias'
    },
    description: {
      en: 'Annual maximum 5-day precipitation',
      'pt-BR': 'Precipitação máxima anual em 5 dias'
    },
    unit: 'mm',
    increasing: {
      negative: true,
      description: {
        en: 'Higher values indicate potential for sustained rainfall and flooding',
        'pt-BR': 'Valores mais altos indicam potencial para chuvas sustentadas e inundações'
      }
    }
  },
  'TX90p': {
    hazardType: 'heatwaves',
    label: {
      en: 'Warm Days',
      'pt-BR': 'Dias Quentes'
    },
    description: {
      en: 'Percentage of days when maximum temperature > 90th percentile',
      'pt-BR': 'Porcentagem de dias quando a temperatura máxima > percentil 90'
    },
    unit: '%',
    increasing: {
      negative: true,
      description: {
        en: 'More frequent hot days increase heat stress and health risks',
        'pt-BR': 'Dias quentes mais frequentes aumentam o estresse térmico e riscos à saúde'
      }
    }
  },
  'tasmax': {
    hazardType: 'heatwaves',
    label: {
      en: 'Maximum Temperature',
      'pt-BR': 'Temperatura Máxima'
    },
    description: {
      en: 'Annual maximum temperature',
      'pt-BR': 'Temperatura máxima anual'
    },
    unit: '°C',
    increasing: {
      negative: true,
      description: {
        en: 'Higher maximum temperatures increase heat-related health risks',
        'pt-BR': 'Temperaturas máximas mais altas aumentam os riscos à saúde relacionados ao calor'
      }
    }
  },
  'tas': {
    hazardType: 'heatwaves',
    label: {
      en: 'Average Temperature',
      'pt-BR': 'Temperatura Média'
    },
    description: {
      en: 'Annual average temperature',
      'pt-BR': 'Temperatura média anual'
    },
    unit: '°C',
    increasing: {
      negative: true,
      description: {
        en: 'Higher average temperatures affect ecosystems and human comfort',
        'pt-BR': 'Temperaturas médias mais altas afetam ecossistemas e o conforto humano'
      }
    }
  }
};

/**
 * Get the label for a climate index in the specified language
 * @param {string} index - Climate index code
 * @param {string} language - Language code (default: 'en')
 * @returns {string} Localized label
 */
export const getIndexLabel = (index, language = 'en') => {
  return CLIMATE_INDEX_MAP[index]?.label[language] || index;
};

/**
 * Get the description for a climate index in the specified language
 * @param {string} index - Climate index code
 * @param {string} language - Language code (default: 'en')
 * @returns {string} Localized description
 */
export const getIndexDescription = (index, language = 'en') => {
  return CLIMATE_INDEX_MAP[index]?.description[language] || '';
};

/**
 * Get the hazard type associated with a climate index
 * @param {string} index - Climate index code
 * @returns {string} Hazard type
 */
export const getIndexHazardType = (index) => {
  return CLIMATE_INDEX_MAP[index]?.hazardType || 'default';
};

/**
 * Get the unit for a climate index
 * @param {string} index - Climate index code
 * @returns {string} Unit
 */
export const getIndexUnit = (index) => {
  return CLIMATE_INDEX_MAP[index]?.unit || '';
};

/**
 * Get information about how to interpret increasing values
 * @param {string} index - Climate index code
 * @param {string} language - Language code (default: 'en')
 * @returns {Object} Information about increasing values
 */
export const getIndexTrend = (index, language = 'en') => {
  const trend = CLIMATE_INDEX_MAP[index]?.increasing;
  if (!trend) return { negative: false, description: '' };

  return {
    negative: trend.negative,
    description: trend.description[language] || trend.description.en
  };
};