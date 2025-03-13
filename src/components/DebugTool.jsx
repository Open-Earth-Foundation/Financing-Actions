// src/components/DebugTool.jsx
import React, { useState, useEffect } from 'react';

const DebugTool = () => {
  const [debugData, setDebugData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [city, setCity] = useState('Caxias_do_Sul');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch server debug info
  const fetchDebugInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/debug');
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setDebugData(data);
    } catch (err) {
      console.error('Debug fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch city debug info
  const fetchCityDebug = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/debug/city/${city}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server responded with ${response.status}`);
      }

      setCityData(data);
    } catch (err) {
      console.error('City debug fetch error:', err);
      setError(err.message);
      setCityData(null);
    } finally {
      setLoading(false);
    }
  };

  // Test API endpoints directly
  const testClimateApi = async () => {
    setLoading(true);
    setError(null);

    try {
      // Test cities endpoint
      const citiesResponse = await fetch('/api/climate/cities');
      const citiesText = await citiesResponse.text();

      // Try to parse as JSON
      let citiesData;
      try {
        citiesData = JSON.parse(citiesText);
      } catch (e) {
        citiesData = { error: 'Failed to parse JSON', text: citiesText };
      }

      // Test city endpoint
      const cityResponse = await fetch(`/api/climate/${city}`);
      const cityText = await cityResponse.text();

      // Try to parse as JSON
      let cityApiData;
      try {
        cityApiData = JSON.parse(cityText);
      } catch (e) {
        cityApiData = { error: 'Failed to parse JSON', text: cityText };
      }

      setCityData({
        citiesEndpoint: {
          status: citiesResponse.status,
          statusText: citiesResponse.statusText,
          data: citiesData
        },
        cityEndpoint: {
          status: cityResponse.status,
          statusText: cityResponse.statusText,
          data: cityApiData
        }
      });
    } catch (err) {
      console.error('API test error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">API Debug Tool</h2>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={fetchDebugInfo}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          Fetch Server Debug Info
        </button>

        <div className="flex gap-2">
          <input 
            type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)}
            className="px-3 py-2 border rounded"
            placeholder="City name"
          />
          <button 
            onClick={fetchCityDebug}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={loading}
          >
            Check City
          </button>
        </div>

        <button 
          onClick={testClimateApi}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          disabled={loading}
        >
          Test Climate API
        </button>
      </div>

      {loading && <p className="text-blue-600 mb-4">Loading...</p>}

      {error && (
        <div className="p-4 mb-4 bg-red-100 border border-red-300 rounded">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {debugData && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Server Debug Info</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(debugData, null, 2)}
          </pre>
        </div>
      )}

      {cityData && (
        <div>
          <h3 className="text-xl font-semibold mb-2">City Data</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(cityData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DebugTool;