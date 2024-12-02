// src/constants/resilienceLevels.js
const resilienceLevels = {
  VERY_LOW: {
    label: 'Very Low',
    color: '#F40000',
    backgroundColor: '#FFE4E6',
    textColor: '#9F1239',
    description: 'Limited capacity to respond to climate risks'
  },
  LOW: {
    label: 'Low',
    color: '#FF8300',
    backgroundColor: '#FEE2E2',
    textColor: '#991B1B',
    description: 'Basic awareness and minimal preparedness'
  },
  MEDIUM: {
    label: 'Medium',
    color: '#FFCD00',
    backgroundColor: '#FEF9C3',
    textColor: '#854D0E',
    description: 'Established measures but room for improvement'
  },
  HIGH: {
    label: 'High',
    color: '#A9DE00',
    backgroundColor: '#ECFCCB',
    textColor: '#3F6212',
    description: 'Strong preparedness and adaptation capacity'
  },
  VERY_HIGH: {
    label: 'Very High',
    color: '#02C650',
    backgroundColor: '#DCFCE7',
    textColor: '#166534',
    description: 'Comprehensive climate resilience measures'
  }
};

// Thresholds for resilience scores (0-1)
export const getResilienceLevel = (score) => {
  if (score === null || score === undefined) return resilienceLevels.VERY_LOW;

  const numScore = Number(score);

  if (numScore < 0.2) return resilienceLevels.VERY_LOW;
  if (numScore < 0.4) return resilienceLevels.LOW;
  if (numScore < 0.6) return resilienceLevels.MEDIUM;
  if (numScore < 0.8) return resilienceLevels.HIGH;
  return resilienceLevels.VERY_HIGH;
};

export { resilienceLevels };