// climate-api.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a router for the climate API endpoints
const router = express.Router();

// Path to the optimized data directory
const DATA_DIR = path.join(__dirname, 'optimized-data');

// Cache to improve performance
const cache = {
  index: null,
  cities: {},
  // Cache expiration (1 hour)
  timeToLive: 60 * 60 * 1000
};

// Check if the optimized data directory exists
if (!fs.existsSync(DATA_DIR)) {
  console.warn(`Climate data directory not found: ${DATA_DIR}`);
}

// Helper function to read JSON with caching
const readJsonFile = (filePath, cacheKey = null) => {
  // Return cached data if available and not expired
  if (cacheKey && cache[cacheKey] && cache[cacheKey].timestamp > Date.now() - cache.timeToLive) {
    return cache[cacheKey].data;
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Cache the data if a cache key is provided
    if (cacheKey) {
      cache[cacheKey] = {
        data,
        timestamp: Date.now()
      };
    }

    return data;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    throw error;
  }
};

// GET /api/climate/cities - Get list of available cities
router.get('/cities', (req, res) => {
  try {
    // Path to the index file
    const indexPath = path.join(DATA_DIR, 'index.json');

    if (!fs.existsSync(indexPath)) {
      return res.json([]);
    }

    // Read the index file
    const cityIndex = readJsonFile(indexPath, 'index');

    // Return the list of cities
    res.json(cityIndex);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

// GET /api/climate/:city - Get all climate data for a specific city
router.get('/:city', (req, res) => {
  try {
    const { city } = req.params;
    const cityPath = path.join(DATA_DIR, `${city}.json`);

    if (!fs.existsSync(cityPath)) {
      return res.status(404).json({ error: `City not found: ${city}` });
    }

    // Read the city data file
    const cityData = readJsonFile(cityPath, `city_${city}`);

    res.json(cityData);
  } catch (error) {
    console.error(`Error fetching data for ${req.params.city}:`, error);
    res.status(500).json({ error: 'Failed to fetch city data' });
  }
});

// GET /api/climate/:city/:index - Get climate data for a specific index in a city
router.get('/:city/:index', (req, res) => {
  try {
    const { city, index } = req.params;
    const cityPath = path.join(DATA_DIR, `${city}.json`);

    if (!fs.existsSync(cityPath)) {
      return res.status(404).json({ error: `City not found: ${city}` });
    }

    // Read the city data file
    const cityData = readJsonFile(cityPath, `city_${city}`);

    // Get the data for the requested index
    const indexData = cityData.indices[index];

    if (!indexData) {
      return res.status(404).json({ error: `Index not found: ${index}` });
    }

    res.json(indexData);
  } catch (error) {
    console.error(`Error fetching data for ${req.params.city}/${req.params.index}:`, error);
    res.status(500).json({ error: 'Failed to fetch index data' });
  }
});

export default router;