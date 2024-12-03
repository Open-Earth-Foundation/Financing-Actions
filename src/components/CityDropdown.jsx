import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import ccraApi from '../api/ccraApi';
import { BRAZILIAN_STATES, getStateName } from '../utils/brazilianStates';

const CityDropdown = ({ onCityChange, styles }) => {
  const { t } = useTranslation();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Filter cities by selected region
  const filteredCities = React.useMemo(() => {
    if (!selectedRegion || !cities?.length) return [];

    return cities
      .filter(city => 
        city.region === selectedRegion.originalValue && 
        city.cityname
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
    // ... (rest of the styles remain unchanged)
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