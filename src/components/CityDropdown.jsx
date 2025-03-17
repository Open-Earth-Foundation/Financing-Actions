import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import ccraApi from '../api/ccraApi';
import { BRAZILIAN_STATES, getStateName } from '../utils/brazilianStates';
import { useData } from '../data/DataContext';

const CityDropdown = ({ onCityChange, styles, initialCity }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { cityData } = useData();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reset selections when location changes to root
  useEffect(() => {
    if (location.pathname === '/') {
      setSelectedCity(null);
      setSelectedRegion(null);
    }
  }, [location]);


  // Get unique regions from cities with full state names
  const regions = React.useMemo(() => {
    if (!cities?.length) return [];

    const allRegions = [...new Set(cities.map(city => city.region))];
    const uniqueRegions = allRegions.filter(Boolean).sort();

    return uniqueRegions.map(region => ({
      value: region,
      label: getStateName(region),
      originalValue: region
    }));
  }, [cities]);

  // Import allowed cities list
  import { ALLOWED_CITIES } from '../constants/allowedCities';

  // Filter cities by selected region and allowed list
  const filteredCities = React.useMemo(() => {
    if (!selectedRegion || !cities?.length) return [];

    return cities
      .filter(city => 
        city.region === selectedRegion.originalValue && 
        city.cityname &&
        ALLOWED_CITIES.includes(city.cityname)
      )
      .map(city => ({
        value: city.actor_id,
        label: city.cityname,
        cityname: city.cityname,
        region: city.region,
        actor_id: city.actor_id,
        osm_id: city.osm_id
      }))
      .sort((a, b) => a.cityname.localeCompare(b.cityname));
  }, [cities, selectedRegion]);

  // Group cities by first letter
  const groupedOptions = React.useMemo(() => {
    if (!selectedRegion || !filteredCities?.length) return [];

    const groups = filteredCities.reduce((acc, city) => {
      if (!city.cityname) return acc;
      const firstLetter = city.cityname.charAt(0).toUpperCase();
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(city);
      return acc;
    }, {});

    return Object.keys(groups).sort().map(letter => ({
      label: letter,
      options: groups[letter]
    }));
  }, [filteredCities]);

  // Effect to fetch cities
  useEffect(() => {
    let isSubscribed = true;

    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const data = await ccraApi.getCities('BR');

        if (!Array.isArray(data)) {
          throw new Error('Invalid city data format');
        }

        if (isSubscribed) {
          const validCities = data.filter(city => 
            city && city.cityname && city.region && city.actor_id
          );
          setCities(validCities);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        if (isSubscribed) {
          setError(!navigator.onLine 
            ? t('error.no_connection')
            : t('error.load_failed', { error: error.message })
          );
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    fetchCities();
    return () => {
      isSubscribed = false;
    };
  }, [t]);

  // Effect to handle initial city data and URL-based selection
  useEffect(() => {
    if (cityData && cities.length > 0) {
      const city = cities.find(c => c.actor_id === cityData.actor_id);
      if (city) {
        const region = regions.find(r => r.originalValue === city.region);
        if (region) {
          setSelectedRegion(region);
          const cityOption = {
            value: city.actor_id,
            label: city.cityname,
            cityname: city.cityname,
            region: city.region,
            actor_id: city.actor_id,
            osm_id: city.osm_id
          };
          setSelectedCity(cityOption);
        }
      }
    }
  }, [cityData, cities, regions]);

  const handleRegionChange = (selectedOption) => {
    setSelectedRegion(selectedOption);
    setSelectedCity(null);
    if (onCityChange) {
      onCityChange(null);
    }
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    if (selectedOption) {
      onCityChange({
        cityname: selectedOption.cityname,
        region: selectedOption.region,
        actor_id: selectedOption.actor_id,
        osm_id: selectedOption.osm_id
      });
    }
  };

  const customStyles = {
    ...styles,
    control: (provided, state) => ({
      ...provided,
      ...(styles?.control?.(provided, state) ?? {}),
      borderColor: error ? '#ef4444' : provided.borderColor,
    }),
    container: (provided) => ({
      ...provided,
      '& .region-select__indicators, & .city-select__indicators': {
        position: 'static',
      },
    }),
  };

  if (error) {
    return (
      <div className="space-y-2">
        <div className="p-4 text-sm text-red-500 bg-red-100 rounded-md border border-red-200">
          {error}
        </div>
        <Select
          value={selectedCity}
          options={[]}
          placeholder={t('error.placeholder')}
          isDisabled
          styles={customStyles}
          className="city-dropdown"
          classNamePrefix="city-select"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Region Select with Label */}
      <div className="flex flex-col gap-2 relative">
        <label className="text-sm font-medium text-gray-700">
          {t('city-dropdown:region.label')}
        </label>
        <Select
          value={selectedRegion}
          onChange={handleRegionChange}
          options={regions}
          placeholder={isLoading 
            ? t('city-dropdown:region.placeholder.loading')
            : t('city-dropdown:region.placeholder.default')
          }
          isClearable
          isLoading={isLoading}
          styles={customStyles}
          className="region-dropdown"
          classNamePrefix="region-select"
        />
      </div>

      {/* City Select with Label */}
      <div className="flex flex-col gap-2 relative">
        <label className="text-sm font-medium text-gray-700">
          {t('city-dropdown:city.label')}
        </label>
        <Select
          value={selectedCity}
          onChange={handleCityChange}
          options={groupedOptions}
          placeholder={
            !selectedRegion 
              ? t('city-dropdown:city.placeholder.select_region')
              : isLoading 
                ? t('city-dropdown:city.placeholder.loading')
                : t('city-dropdown:city.placeholder.default')
          }
          isClearable
          isDisabled={!selectedRegion}
          isLoading={isLoading}
          styles={customStyles}
          className="city-dropdown"
          classNamePrefix="city-select"
          noOptionsMessage={() => 
            !selectedRegion 
              ? t('city.no_options.select_region')
              : t('city.no_options.no_cities')
          }
        />
      </div>
    </div>
  );
};

export default CityDropdown;