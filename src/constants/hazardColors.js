// Color system with base colors and variations for scenarios

export const HAZARD_COLORS = {
  // Water Scarcity - Red family
  droughts: {
    base: '#DC2626', // Red-600
    light: '#F87171', // Red-400
    dark: '#991B1B', // Red-800
  },
  // Temperature - Orange family
  heatwaves: {
    base: '#EA580C', // Orange-600
    light: '#FB923C', // Orange-400
    dark: '#9A3412', // Orange-800
  },
  // Health - Purple family
  diseases: {
    base: '#7C3AED', // Purple-600
    light: '#A78BFA', // Purple-400
    dark: '#5B21B6', // Purple-800
  },
  // Ground Movement - Brown family
  landslides: {
    base: '#854D0E', // Amber-800
    light: '#D97706', // Amber-600
    dark: '#78350F', // Amber-900
  },
  // General floods - Blue family
  floods: {
    base: '#2563EB', // Blue-600
    light: '#60A5FA', // Blue-400
    dark: '#1E40AF', // Blue-800
  },
  // Rapid floods - Indigo family
  'flash floods': {
    base: '#4F46E5', // Indigo-600
    light: '#818CF8', // Indigo-400
    dark: '#3730A3', // Indigo-800
  },
  // Coastal/Urban floods - Cyan family
  inundations: {
    base: '#0891B2', // Cyan-600
    light: '#22D3EE', // Cyan-400
    dark: '#155E75', // Cyan-800
  },
  // Fire - Pink/Red family
  wildfires: {
    base: '#E11D48', // Rose-600
    light: '#FB7185', // Rose-400
    dark: '#9F1239', // Rose-800
  },
  // Coastal - Teal family
  'sea-level-rise': {
    base: '#0D9488', // Teal-600
    light: '#2DD4BF', // Teal-400
    dark: '#115E59', // Teal-800
  },
  // Default fallback - Gray family
  default: {
    base: '#4B5563', // Gray-600
    light: '#9CA3AF', // Gray-400
    dark: '#1F2937', // Gray-800
  }
};

// Helper function to normalize hazard names
const normalizeHazardName = (hazard) => {
  if (!hazard) return 'default';

  // Convert to lowercase and handle common variations
  const normalized = hazard.toLowerCase().trim();

  // Handle specific mappings
  const mappings = {
    'flash flood': 'flash floods',
    'flash-flood': 'flash floods',
    'flashflood': 'flash floods',
    'inundation': 'inundations',
    'wildfire': 'wildfires',
    'fire': 'wildfires',
    'forest fire': 'wildfires',
    'disease': 'diseases',
    'flood': 'floods',
    'floods': 'floods',
    'sea-level-rise': 'sea-level-rise',
    'sea-level rise': 'sea-level-rise',
    'slr': 'sea-level-rise'
  };

  return mappings[normalized] || normalized;
};

// Get color for a hazard and scenario
export const getHazardColor = (hazard, scenario = 'current') => {
  const normalizedHazard = normalizeHazardName(hazard);
  const colors = HAZARD_COLORS[normalizedHazard] || HAZARD_COLORS.default;

  switch (scenario) {
    case 'optimistic':
      return colors.light;
    case 'pessimistic':
      return colors.dark;
    default:
      return colors.base;
  }
};

// Get color scale for a hazard (useful for gradients or multi-step scales)
export const getHazardColorScale = (hazard) => {
  const normalizedHazard = normalizeHazardName(hazard);
  return HAZARD_COLORS[normalizedHazard] || HAZARD_COLORS.default;
};