export const capitalize = (str) => {
  if (!str) return '';
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export const formatKeyImpact = (keyimpact) => {
  // Special handling for multi-word terms with specific capitalization
  const specialCases = {
    'geo-hydrological disasters': 'Geo-Hydrological Disasters',
    'water resources': 'Water Resources',
    'food security': 'Food Security',
  };

  return specialCases[keyimpact] || capitalize(keyimpact);
};