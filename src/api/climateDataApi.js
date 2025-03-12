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
    const response = await fetch(`${API_BASE}/api/climate/cities`);
    if (!response.ok) throw new Error('Failed to fetch climate data cities');
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
    const response = await fetch(`${API_BASE}/api/climate/${city}`);
    if (!response.ok) throw new Error(`Failed to fetch climate data for ${city}`);
    return await response.json();
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
    const response = await fetch(`${API_BASE}/api/climate/${city}/${index}`);
    if (!response.ok) throw new Error(`Failed to fetch climate data for ${city}/${index}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching climate data for ${city}/${index}:`, error);
    throw error;
  }
};