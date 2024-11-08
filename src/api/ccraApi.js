const API_CONFIG = {
  baseUrl: 'https://ccglobal.openearth.dev/api/v0/ccra',
  // For this version we'll focus on Brazilian cities
  defaultCountryCode: 'BR'
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An unknown error occurred'
    }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const ccraApi = {
  /**
   * Fetches list of cities for a specific country
   * @param {string} countryCode - Country code (default: 'BR')
   */
  getCities: async (countryCode = API_CONFIG.defaultCountryCode) => {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/city/${countryCode}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  },

  /**
   * Fetches risk assessment data for a specific city and scenario
   * @param {string} actor_id - City identifier (LOCODE)
   * @param {string} scenarioName - Scenario name (e.g., 'current')
   */
  getRiskAssessment: async (actor_id, scenarioName = 'current') => {
    try {
      const response = await fetch(
        `${API_CONFIG.baseUrl}/risk_assessment/city/${encodeURIComponent(actor_id)}/${scenarioName}`
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching risk assessment:', error);
      throw error;
    }
  },

  /**
   * Fetches detailed indicator data for a specific city and scenario
   * @param {string} actor_id - City identifier (LOCODE)
   * @param {string} scenarioName - Scenario name (e.g., 'current')
   */
  getIndicatorDetails: async (actor_id, scenarioName = 'current') => {
    try {
      const response = await fetch(
        `${API_CONFIG.baseUrl}/impactchain_indicators/city/${encodeURIComponent(actor_id)}/${scenarioName}`
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching indicator details:', error);
      throw error;
    }
  },

  /**
   * Fetches all data for a city (risk assessment and indicators)
   * @param {string} actor_id - City identifier (LOCODE)
   * @param {string} scenarioName - Scenario name (e.g., 'current')
   */
  getAllCityData: async (actor_id, scenarioName = 'current') => {
    try {
      const [riskAssessment, indicators] = await Promise.all([
        ccraApi.getRiskAssessment(actor_id, scenarioName),
        ccraApi.getIndicatorDetails(actor_id, scenarioName)
      ]);

      return {
        riskAssessment,
        indicators
      };
    } catch (error) {
      console.error('Error fetching all city data:', error);
      throw error;
    }
  }
};

export default ccraApi;