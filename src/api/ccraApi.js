const API_CONFIG = {
  baseUrl: 'https://ccglobal.openearth.dev/api/v0/ccra',
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
  getCities: async (countryCode = API_CONFIG.defaultCountryCode) => {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/city/${countryCode}`);
      const cities = await handleResponse(response);
      return cities;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  },

  // Modified to use the cities endpoint and find specific city
  getCityMetadata: async (actor_id) => {
    try {
      const cities = await ccraApi.getCities();
      const cityData = cities.find(city => city.actor_id === actor_id);

      if (!cityData) {
        throw new Error('City not found');
      }

      return {
        actor_id,
        cityname: cityData.cityname,
        region: cityData.region,
        osm_id: cityData.osm_id
      };
    } catch (error) {
      console.error('Error fetching city metadata:', error);
      throw error;
    }
  },

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

  getAllCityData: async (actor_id, scenarioName = 'current') => {
    try {
      const [cityMetadata, riskAssessment, indicators] = await Promise.all([
        ccraApi.getCityMetadata(actor_id),
        ccraApi.getRiskAssessment(actor_id, scenarioName),
        ccraApi.getIndicatorDetails(actor_id, scenarioName)
      ]);

      return {
        cityMetadata,
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