// src/api/climateDataApi.js

/**
 * Client for the Climate Data API
 */

const API_BASE = '';  // Empty for relative URLs

/**
 * Fetch a list of available cities and their climate indices
 * @returns {Promise<Array>} Array of city objects with name and indices
 */
export const fetchClimateDataCities = async () => {
  try {
    console.log('Fetching climate data cities from:', `${API_BASE}/api/climate/cities`);
    const response = await fetch(`${API_BASE}/api/climate/cities`);

    if (!response.ok) {
      console.error('Non-OK response:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error response from server:', errorText);
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching climate data cities:', error);
    throw error;
  }
};

/**
 * Fetch all climate data for a specific city
 * @param {string} city - The city name
 * @returns {Promise<Object>} City data with all climate indices
 */
export const fetchCityClimateData = async (city) => {
  try {
    // Ensure city is in the correct format (replace spaces with underscores)
    const formattedCity = city.replace(/\s+/g, '_');
    const url = `${API_BASE}/api/climate/${encodeURIComponent(formattedCity)}`;

    console.log('Fetching climate data from:', url);
    const response = await fetch(url);

    // Log detailed info about the response
    console.log('Response status:', response.status, response.statusText);
    console.log('Response headers:', Object.fromEntries([...response.headers.entries()]));

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City not found: ${city}`);
      }

      // For any non-404 errors, try to get more information about the error
      const errorText = await response.text();
      console.error('Error response from server:', errorText);
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Successfully fetched climate data for:', city);
    return data;
  } catch (error) {
    console.error(`Error fetching climate data for ${city}:`, error);
    throw error;
  }
};

/**
 * Fetch climate data for a specific index in a city
 * @param {string} city - The city name
 * @param {string} index - The climate index code (e.g., 'CDD', 'RX1day')
 * @returns {Promise<Object>} Data for the specific climate index
 */
export const fetchClimateIndexData = async (city, index) => {
  try {
    // Ensure city is in the correct format (replace spaces with underscores)
    const formattedCity = city.replace(/\s+/g, '_');
    const url = `${API_BASE}/api/climate/${encodeURIComponent(formattedCity)}/${encodeURIComponent(index)}`;

    console.log('Fetching climate index data from:', url);
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        if (response.statusText.includes('City not found')) {
          throw new Error(`City not found: ${city}`);
        } else {
          throw new Error(`Index not found: ${index}`);
        }
      }

      const errorText = await response.text();
      console.error('Error response from server:', errorText);
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching climate data for ${city}/${index}:`, error);
    throw error;
  }
};