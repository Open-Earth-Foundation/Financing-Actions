import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Info, ChevronUp, ChevronDown } from 'lucide-react';
import ResilienceDisclaimer from './ResilienceDisclaimer';
import RiskDetailModal from './RiskDetailModal';
import FilterDropdown from '../FilterDropdown';
import { getRiskLevel, getRiskChangeDescription, formatScore } from '../../constants/riskLevels';

const RiskTable = ({ riskAssessment, actor_id, resilienceScore }) => {
  const { t } = useTranslation();
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({
    key_impact: [],
    hazard: [],
    risk_level: []
  });

  // Get unique values for filters
  const filterOptions = useMemo(() => ({
    key_impact: [...new Set(riskAssessment?.map(item => item.keyimpact) || [])],
    hazard: [...new Set(riskAssessment?.map(item => item.hazard) || [])],
    risk_level: [...new Set(riskAssessment?.map(item => getRiskLevel(item.risk_score).label) || [])]
  }), [riskAssessment]);

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle filtering
  const handleFilter = (type, values) => {
    setFilters(prev => ({
      ...prev,
      [type]: values
    }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      key_impact: [],
      hazard: [],
      risk_level: []
    });
  };

  // Get sort value based on column type
  const getSortValue = (item, key) => {
    switch (key) {
      case 'latest_year':
        return parseInt(item[key]);
      case 'risk_score':
        return parseFloat(item[key]);
      case 'keyimpact':
        return item[key].toLowerCase();
      case 'hazard':
        return item[key].toLowerCase();
      case 'risk_level':
        return getRiskLevel(item.risk_score).label.toLowerCase();
      default:
        return item[key];
    }
  };

  // Apply sorting and filtering
  const sortedAndFilteredData = useMemo(() => {
    if (!riskAssessment) return [];

    let filteredData = riskAssessment.filter(item => {
      const matchesKeyImpact = filters.key_impact.length === 0 || 
        filters.key_impact.includes(item.keyimpact);
      const matchesHazard = filters.hazard.length === 0 || 
        filters.hazard.includes(item.hazard);
      const matchesRiskLevel = filters.risk_level.length === 0 || 
        filters.risk_level.includes(getRiskLevel(item.risk_score).label);

      return matchesKeyImpact && matchesHazard && matchesRiskLevel;
    });

    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        const aValue = getSortValue(a, sortConfig.key);
        const bValue = getSortValue(b, sortConfig.key);

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filteredData;
  }, [riskAssessment, sortConfig, filters]);

  const handleShowDetails = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  if (!riskAssessment || riskAssessment.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t('sections:ccra_table.no_data')}
      </div>
    );
  }

  const columns = [
    { key: 'latest_year', label: 'year', sortable: true },
    { key: 'keyimpact', label: 'key_impact', sortable: true },
    { key: 'hazard', label: 'hazard', sortable: true },
    { key: 'components', label: 'components', sortable: false },
    { key: 'risk_score', label: 'risk_score', sortable: true },
    { key: 'risk_level', label: 'risk_level', sortable: true },
    { key: 'details', label: 'details', sortable: false }
  ];

  const SortIndicator = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return (
        <ChevronUp className="w-4 h-4 inline-block ml-1 text-gray-300" />
      );
    }
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4 inline-block ml-1" /> : 
      <ChevronDown className="w-4 h-4 inline-block ml-1" />;
  };

  return (
    <div className="space-y-4">
      <ResilienceDisclaimer resilienceScore={resilienceScore} />

      <div className="flex justify-end">
        <FilterDropdown
          filters={filters}
          filterOptions={filterOptions}
          onFilterChange={handleFilter}
          onClearFilters={handleClearFilters}
          riskAssessment={riskAssessment}
          t={t}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(({ key, label, sortable }) => (
                <th 
                  key={key} 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <button
                    className={`flex items-center ${sortable ? 'cursor-pointer hover:text-gray-700' : 'cursor-default'}`}
                    onClick={() => sortable && handleSort(key)}
                    disabled={!sortable}
                  >
                    {t(`sections:ccra_table.columns.${label}`)}
                    {sortable && <SortIndicator columnKey={key} />}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedAndFilteredData.map((row, index) => {
              const riskLevel = getRiskLevel(row.risk_score);
              const changeDescription = resilienceScore !== null ? 
                getRiskChangeDescription(row.original_risk_score, row.risk_score) : null;

              return (
                <tr key={`${row.keyimpact}-${row.hazard}-${index}`} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.latest_year}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {t(`common:sectors.${row.keyimpact.toLowerCase().replace(/ /g, '_')}`, { defaultValue: row.keyimpact })}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {t(`common:hazards.${row.hazard.toLowerCase()}`, { defaultValue: row.hazard })}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="space-y-1 text-sm">
                      <div className="text-gray-600">
                        {t('sections:ccra_table.columns.hazard')}: 
                        <span className="font-medium text-gray-900">
                          {formatScore(row.hazard_score)}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        {t('sections:ccra_table.columns.exposure')}: 
                        <span className="font-medium text-gray-900">
                          {formatScore(row.exposure_score)}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        {t('sections:ccra_table.columns.vulnerability')}: {" "}
                        <span className="font-medium">
                          {resilienceScore !== null && (
                            <span className="text-gray-500 text-xs mr-1">
                              {formatScore(row.original_vulnerability_score)} →
                            </span>
                          )}
                          <span className={resilienceScore !== null ? "text-blue-600" : "text-gray-900"}>
                            {formatScore(row.vulnerability_score)}
                          </span>
                          {row.indicator_count > 0 && (
                            <span className="text-gray-500 text-xs ml-1">
                              ({row.indicator_count} {t('common:indicators')})
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {resilienceScore !== null && (
                        <div className="text-sm text-gray-500">
                          {formatScore(row.original_risk_score)}
                        </div>
                      )}
                      <div className="text-sm font-medium" style={{ color: changeDescription?.color }}>
                        {formatScore(row.risk_score)}
                        {changeDescription && (
                          <span className="text-xs ml-1">({changeDescription.text})</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: riskLevel.backgroundColor,
                        color: riskLevel.textColor
                      }}
                    >
                      {t(`common:risk_levels.${riskLevel.label.toLowerCase()}`)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleShowDetails(row)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                      title={t('sections:ccra_table.columns.details')}
                    >
                      <Info className="w-5 h-5 text-gray-500" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <RiskDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rowData={selectedRow}
        actor_id={actor_id}
      />
    </div>
  );
};

export default RiskTable;