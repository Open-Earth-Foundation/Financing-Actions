// src/api/climateDataApi.js

/**
 * Client for the Climate Data (direct from public folder)
 */

/**
 * Fetch a list of available cities and their climate indices
 * @returns {Promise<Array>} Array of city objects with name and indices
 */
export const fetchClimateDataCities = async () => {
  try {
    console.log('Fetching climate data cities from public folder');
    const response = await fetch('/data/cities.json');

    if (!response.ok) {
      console.error('Non-OK response:', response.status, response.statusText);
      throw new Error(`Failed to fetch cities list: ${response.status}`);
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
    const url = `/data/${encodeURIComponent(formattedCity)}.json`;

    console.log('Fetching climate data from:', url);
    const response = await fetch(url);

    // Log detailed info about the response
    console.log('Response status:', response.status, response.statusText);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City not found: ${city}`);
      }
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Successfully fetched climate data for:', city);
    return data;
  } catch (error) {
    console.error(`Error fetching climate data for ${city}:`, error);

    // For testing/demonstration with mock data if file is not found
    // Uncomment this to use mock data instead of real files
    /*
    console.log('Using mock data for demonstration');
    return mockClimateData(city);
    */

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
    // Get the full city data and extract just the requested index
    const cityData = await fetchCityClimateData(city);

    if (!cityData.indices || !cityData.indices[index]) {
      throw new Error(`Index not found: ${index}`);
    }

    return {
      city: cityData.name || city,
      index: index,
      data: cityData.indices[index]
    };
  } catch (error) {
    console.error(`Error fetching climate data for ${city}/${index}:`, error);
    throw error;
  }
};

/**
 * Generate mock climate data for testing
 * @param {string} city - The city name
 * @returns {Object} Mock climate data
 */
export const mockClimateData = (city) => {
  console.log(`Generating mock climate data for: ${city}`);

  return {
    name: city,
    indices: {
      'CDD': {
        historical: {
          baseline: { value: 32.5 }
        },
        projections: {
          rcp45: {
            periods: {
              near: { value: 38.2, anomaly: 5.7 },
              mid: { value: 42.1, anomaly: 9.6 }
            },
            timeseries: Array.from({length: 94}, (_, i) => ({
              year: 2006 + i,
              value: 32.5 + (Math.random() * 15) + (i * 0.15)
            }))
          },
          rcp85: {
            periods: {
              near: { value: 39.8, anomaly: 7.3 },
              mid: { value: 48.7, anomaly: 16.2 }
            },
            timeseries: Array.from({length: 94}, (_, i) => ({
              year: 2006 + i,
              value: 32.5 + (Math.random() * 20) + (i * 0.25)
            }))
          }
        }
      },
      'WSDI': {
        historical: {
          baseline: { value: 12.3 }
        },
        projections: {
          rcp45: {
            periods: {
              near: { value: 18.7, anomaly: 6.4 },
              mid: { value: 25.2, anomaly: 12.9 }
            },
            timeseries: Array.from({length: 94}, (_, i) => ({
              year: 2006 + i,
              value: 12.3 + (Math.random() * 10) + (i * 0.2)
            }))
          },
          rcp85: {
            periods: {
              near: { value: 22.1, anomaly: 9.8 },
              mid: { value: 35.6, anomaly: 23.3 }
            },
            timeseries: Array.from({length: 94}, (_, i) => ({
              year: 2006 + i,
              value: 12.3 + (Math.random() * 15) + (i * 0.3)
            }))
          }
        }
      }
    }
  };
};