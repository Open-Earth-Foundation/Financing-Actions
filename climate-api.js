// src/api/climateDataApi.js

/**
 * Fetches climate data for a specific city
 * @param {string} cityName - Name of the city
 * @returns {Promise<Object>} - City climate data
 */
export const fetchCityClimateData = async (cityName) => {
  if (!cityName) {
    throw new Error('City name is required');
  }

  try {
    // In development, data is served by the Vite development server
    // In production, data would be served by a static file server or CDN
    const sanitizedCityName = cityName.toLowerCase().trim();

    // During development, use the path that aligns with our Vite config middleware
    // In production, we'd fetch from the static files directly
    const response = await fetch(`/api/climate/city-data/${sanitizedCityName}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch climate data for ${cityName}: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching climate data:', error);
    throw error;
  }
};