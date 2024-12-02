import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import ccraApi from '../api/ccraApi';

const FEATURED_CITY_NAMES = [
  { name: "Caxias do Sul", region: "RS" },
  { name: "Serra", region: "ES" },
  { name: "Rio Branco", region: "AC" },
  { name: "Camaçari", region: "BA" },
  { name: "Corumbá", region: "MS" }
];

const QuickAccessCities = ({ onCitySelect }) => {
  const [featuredCities, setFeaturedCities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setLoading(true);
        const allCities = await ccraApi.getCities();

        // Filter and map the cities we want
        const cities = FEATURED_CITY_NAMES.map(featured => {
          const cityData = allCities.find(
            city => 
              city.cityname?.toLowerCase() === featured.name.toLowerCase() && 
              city.region === featured.region
          );

          if (!cityData) {
            console.warn(`City not found: ${featured.name}, ${featured.region}`);
            return null;
          }

          return {
            cityname: cityData.cityname,
            region: cityData.region,
            actor_id: cityData.actor_id,
            osm_id: cityData.osm_id
          };
        }).filter(Boolean); // Remove any null values

        setFeaturedCities(cities);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured cities:', err);
        setError('Unable to load quick access cities');
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, []);

  if (loading) {
    return (
      <div className="mt-6">
        <p className="text-sm text-gray-500">Loading quick access cities...</p>
      </div>
    );
  }

  if (error) {
    return null; // Don't show the section if there's an error
  }

  if (featuredCities.length === 0) {
    return null; // Don't show the section if no cities were found
  }

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <p className="w-full text-sm text-gray-500 mb-2">Quick access to city data:</p>
      <div className="flex flex-wrap gap-2">
        {featuredCities.map(city => (
          <button
            key={city.actor_id}
            onClick={() => onCitySelect(city)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span>{city.cityname}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessCities;