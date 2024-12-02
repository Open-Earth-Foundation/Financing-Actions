import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ccraApi from '../api/ccraApi';
import { BRAZILIAN_STATES, getStateName } from '../utils/brazilianStates';

const CityDropdown = ({ onCityChange, styles }) => {
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

    return uniqueRegions.map(region => {
      const stateName = getStateName(region);
      
      return {
        value: region,
        label: stateName,
        originalValue: region
      };
    });
  }, [cities]);

  // Filter cities by selected region
  const filteredCities = React.useMemo(() => {
    if (!selectedRegion || !cities?.length) return [];

    return cities
      .filter(city => 
        city.region === selectedRegion.originalValue && 
        city.cityname // Ensure cityname exists
      )
      .map(city => ({
        value: city.actor_id,
        label: `${city.cityname}`,
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
      if (!city.cityname) return acc; // Skip if no cityname

      const firstLetter = city.cityname.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
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
          console.log('Total cities received:', data.length);

          // Group cities by region to check distribution
          const citiesByRegion = data.reduce((acc, city) => {
            const region = city.region || 'undefined';
            acc[region] = (acc[region] || 0) + 1;
            return acc;
          }, {});
          console.log('Cities per region:', citiesByRegion);

          // Check for cities with missing data
          const invalidCities = data.filter(city => 
            !city || !city.cityname || !city.region || !city.actor_id
          );
          if (invalidCities.length) {
            console.log('Found invalid cities:', invalidCities);
            console.log('Invalid cities count:', invalidCities.length);
          }

          const validCities = data.filter(city => 
            city && city.cityname && city.region && city.actor_id
          );
          setCities(validCities);
          setError(null);

          console.log('Valid cities count:', validCities.length);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        if (isSubscribed) {
          if (!navigator.onLine) {
            setError('No internet connection. Please check your connection and try again.');
          } else {
            setError(`Unable to load cities. Please try again later. (${error.message})`);
          }
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
  }, []);

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
    indicatorsContainer: (provided) => ({
      ...provided,
      position: 'static',
      '& .region-select__indicator, & .city-select__indicator': {
        position: 'static',
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      position: 'relative',
    }),
    input: (provided) => ({
      ...provided,
      margin: '0px',
    }),
    group: (provided) => ({
      ...provided,
      paddingTop: 8,
      paddingBottom: 8,
    }),
    groupHeading: (provided) => ({
      ...provided,
      color: '#6B7280',
      fontSize: '0.875rem',
      fontWeight: 600,
      marginBottom: 8,
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
            onChange={handleCityChange}
            options={[]}
            placeholder="Failed to load cities..."
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
            Region:
          </label>
          <Select
            value={selectedRegion}
            onChange={handleRegionChange}
            options={regions}
            placeholder={isLoading ? "Loading regions..." : "Select a region..."}
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
            City:
          </label>
          <Select
            value={selectedCity}
            onChange={handleCityChange}
            options={groupedOptions}
            placeholder={
              !selectedRegion 
                ? "Select a region first" 
                : isLoading 
                  ? "Loading cities..." 
                  : "Search for a city..."
            }
            isClearable
            isDisabled={!selectedRegion}
            isLoading={isLoading}
            styles={customStyles}
            className="city-dropdown"
            classNamePrefix="city-select"
            noOptionsMessage={() => 
              !selectedRegion 
                ? "Select a region first" 
                : "No cities found"
            }
          />
        </div>
      </div>
    );
  };

export default CityDropdown;