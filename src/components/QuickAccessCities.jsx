import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import ccraApi from '../api/ccraApi';
import { useTranslation } from 'react-i18next';
import { useData } from '../data/DataContext';

const FEATURED_CITY_NAMES = [
  { name: "Caxias do Sul", region: "RS" },
  { name: "Serra", region: "ES" },
  { name: "Rio Branco", region: "AC" },
  { name: "Maranguape", region: "CE" },
  { name: "Corumbá", region: "MS" }
];

const QuickAccessCities = ({ onCitySelect }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { 
    fetchCityData,
    setInitialLoadComplete // Add this if you expose it from DataContext
  } = useData();
  const [featuredCities, setFeaturedCities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const allCities = await ccraApi.getCities();

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
        }).filter(Boolean);

        setFeaturedCities(cities);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured cities:', err);
        setError('Unable to load quick access cities');
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleCityClick = async (city) => {
    try {
      if (onCitySelect) {
        onCitySelect(city);
      }
    } catch (error) {
      console.error('Error switching city:', error);
    }
  };

  if (loading) {
    return (
      <div className="mt-6">
        <p className="text-sm text-gray-500">Loading quick access cities...</p>
      </div>
    );
  }

  if (error || featuredCities.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <p className="w-full text-sm text-gray-500 mb-2">{t('city-dropdown:city.placeholder.quick')}</p>
      <div className="flex flex-wrap gap-2">
        {featuredCities.map(city => (
          <button
            key={city.actor_id}
            onClick={() => handleCityClick(city)}
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