import React, { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import { getRiskLevel } from '../constants/riskLevels';

const FilterChip = ({ type, value, onRemove, t }) => (
  <div 
    className="inline-flex items-center px-3 py-1 rounded-full text-white text-sm bg-[#2351DC]"
  >
    <span className="truncate capitalize">
      {t(`common:${type === 'risk_level' ? 'risk_levels' : type === 'key_impact' ? 'sectors' : 'hazards'}.${value.toLowerCase()}`, 
        { defaultValue: value }
      )}
    </span>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemove(type, value);
      }}
      className="ml-2 hover:opacity-80 focus:outline-none"
    >
      <X className="h-3 w-3" />
    </button>
  </div>
);

const FilterDropdown = ({ 
  filters, 
  filterOptions: allFilterOptions,
  onFilterChange, 
  onClearFilters,
  t,
  riskAssessment 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate available options based on current filters
  const availableOptions = useMemo(() => {
    if (!riskAssessment) return allFilterOptions;

    return {
      key_impact: [...new Set(riskAssessment
        .filter(item => {
          const matchesHazard = filters.hazard.length === 0 || 
            filters.hazard.includes(item.hazard);
          const matchesRiskLevel = filters.risk_level.length === 0 || 
            filters.risk_level.includes(getRiskLevel(item.risk_score).label);
          return matchesHazard && matchesRiskLevel;
        })
        .map(item => item.keyimpact))].sort(),

      hazard: [...new Set(riskAssessment
        .filter(item => {
          const matchesKeyImpact = filters.key_impact.length === 0 || 
            filters.key_impact.includes(item.keyimpact);
          const matchesRiskLevel = filters.risk_level.length === 0 || 
            filters.risk_level.includes(getRiskLevel(item.risk_score).label);
          return matchesKeyImpact && matchesRiskLevel;
        })
        .map(item => item.hazard))].sort(),

      risk_level: [...new Set(riskAssessment
        .filter(item => {
          const matchesKeyImpact = filters.key_impact.length === 0 || 
            filters.key_impact.includes(item.keyimpact);
          const matchesHazard = filters.hazard.length === 0 || 
            filters.hazard.includes(item.hazard);
          return matchesKeyImpact && matchesHazard;
        })
        .map(item => getRiskLevel(item.risk_score).label))].sort()
    };
  }, [riskAssessment, filters, allFilterOptions]);

  const handleCheckboxChange = (type, value) => {
    const currentValues = filters[type] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onFilterChange(type, newValues);
  };

  const handleRemoveFilter = (type, value) => {
    onFilterChange(type, filters[type].filter(v => v !== value));
  };

  // Count active filters
  const activeFilterCount = Object.values(filters)
    .reduce((total, arr) => total + arr.length, 0);

  const filterCategories = [
    { type: 'key_impact', label: t('common:filter_types.key_impact') },
    { type: 'hazard', label: t('common:filter_types.hazard') },
    { type: 'risk_level', label: t('common:filter_types.risk_level') }
  ];

  return (
    <div className="relative inline-block">
      <div className="flex justify-end h-10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-white border-[1px] border-gray-200 
            text-gray-500 rounded-lg font-semibold tracking-wider hover:bg-blue-50 
            focus:outline-none focus:ring-2 focus:ring-[#2351DC] focus:ring-opacity-50"
        >
          <Filter className="w-4 h-4" />
          <span className="capitalize">{t('sections:ccra_table.filters.title')}</span>
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 rounded-full text-sm">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10 bg-black bg-opacity-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 capitalize">
                  {t('sections:ccra_table.filters.title')}
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => {
                      onClearFilters();
                      setIsOpen(false);
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" />
                    <span className="capitalize">{t('sections:ccra_table.filters.clear')}</span>
                  </button>
                )}
              </div>

              {/* Active Filters Section */}
              {activeFilterCount > 0 && (
                <div className="pb-3 border-b border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">
                    {t('sections:ccra_table.filters.active_filters')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(filters).map(([type, values]) =>
                      values.map(value => (
                        <FilterChip
                          key={`${type}-${value}`}
                          type={type}
                          value={value}
                          onRemove={handleRemoveFilter}
                          t={t}
                        />
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Filter Categories */}
              {filterCategories.map(({ type, label }) => {
                const options = allFilterOptions[type]
                  .filter(option => availableOptions[type].includes(option));

                if (options.length === 0) return null;

                return (
                  <div key={type} className="space-y-2">
                    <h4 className="font-medium text-gray-700 capitalize">
                      {label}
                    </h4>
                    <div className="space-y-2 pl-2">
                      {options.map((option) => (
                        <label key={option} className="flex items-center space-x-2 hover:bg-gray-50 p-1 rounded cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(filters[type] || []).includes(option)}
                            onChange={() => handleCheckboxChange(type, option)}
                            className="form-checkbox h-4 w-4 text-[#2351DC] rounded border-gray-300 
                              focus:ring-[#2351DC]"
                          />
                          <span className="text-sm text-gray-700 capitalize">
                            {t(`common:${type === 'risk_level' ? 'risk_levels' : type === 'key_impact' ? 'sectors' : 'hazards'}.${option.toLowerCase()}`, 
                              { defaultValue: option }
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterDropdown;