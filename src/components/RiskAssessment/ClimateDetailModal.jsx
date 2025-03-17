import React from "react";
import { useTranslation } from "react-i18next";
import { X, ChevronUp, ChevronDown, AlertTriangle, HelpCircle } from "lucide-react";
import {
  getIndexLabel,
  getIndexDescription,
  getIndexUnit,
  getIndexTrend,
  getIndexHazardType,
} from "../../constants/climateIndices";
import { getHazardColor } from "../../constants/hazardColors";

// Helper function to get descriptive labels for climate indices - same as in ClimateProjections
const getDescriptiveIndexLabel = (indexCode, language) => {
  const baseLabel = getIndexLabel(indexCode, language);

  // Map of index codes to more descriptive, user-friendly names
  const descriptiveLabels = {
    'CDD': 'Consecutive Dry Days (Drought Index)',
    'R95p': 'Heavy Precipitation Days (Extreme Rainfall)',
    'RX1day': 'Maximum 1-Day Rainfall (Extreme Precipitation)',
    'RX5day': 'Maximum 5-Day Rainfall (Prolonged Heavy Rain)',
    'SPI': 'Standardized Precipitation Index (Drought/Wet Conditions)',
    'WSDI': 'Warm Spell Duration Index (Heatwave Length)',
    'TXx': 'Maximum Temperature (Hottest Day)',
    'TNn': 'Minimum Temperature (Coldest Night)',
    'TR': 'Tropical Nights (High Minimum Temperature)',
    'FD': 'Frost Days (Cold Risk)',
    'GTx': 'Growing Season Length (Agriculture)',
    'PRCPTOT': 'Total Annual Precipitation (Rainfall Amount)',
    'TN90p': 'Warm Nights (Nighttime Heat)',
    'TX90p': 'Percentage of Days Above 90th Percentile (Hot Days)',
    'SPEI': 'Precipitation-Evaporation Index (Water Balance)',
    'tasmax': 'Maximum Temperature (Daily High)',
    'tas': 'Average Temperature (Daily Mean)'
  };

  return descriptiveLabels[indexCode] || baseLabel;
};

// Helper function to get detailed explanation of climate indices
const getDetailedIndexExplanation = (indexCode) => {
  const explanations = {
    'CDD': 'Measures the maximum number of consecutive days in a year with rainfall below 1mm. Longer dry spells indicate increased drought risk and potential water stress for agriculture and water supplies.',

    'R95p': 'Counts days with rainfall exceeding the 95th percentile (calculated from 1961-1990). More days with extreme rainfall suggest increased flood risk and potential infrastructure damage.',

    'RX1day': 'Measures the maximum rainfall that occurs in a single day each year. Higher values indicate more intense rainfall events that can cause flash flooding and urban drainage problems.',

    'RX5day': 'Measures the maximum rainfall total over five consecutive days each year. Higher values indicate prolonged heavy rainfall that can cause widespread flooding and soil saturation.',

    'SPI': 'A standardized index showing rainfall anomalies. Negative values indicate drought conditions, while positive values indicate wetter than normal conditions.',

    'WSDI': 'Counts the number of days per year with at least 6 consecutive days when maximum temperature exceeds the 90th percentile. Longer warm spells increase heat stress on people, infrastructure, and ecosystems.',

    'TXx': 'Measures the maximum daytime temperature recorded each year. Higher values indicate more extreme heat that can affect human health, energy demand, and infrastructure.',

    'TNn': 'Measures the minimum nighttime temperature recorded each year. Changes in this index can signal shifting frost patterns and cold extremes.',

    'TR': 'Counts the number of days per year when minimum temperature stays above 20°C (68°F). More tropical nights increase heat stress, particularly for vulnerable populations, and can disrupt sleep patterns.',

    'FD': 'Counts the number of days per year when minimum temperature falls below 0°C (32°F). Changes in frost days affect growing seasons, agriculture, and pest survival.',

    'GTx': 'Measures the length of the growing season based on temperature thresholds. Changes affect crop planning, agricultural productivity, and natural ecosystems.',

    'PRCPTOT': 'Measures the total annual rainfall. Changes impact water availability, ecosystem function, and the frequency of both floods and droughts.',

    'TN90p': 'Percentage of days when nighttime temperatures exceed the 90th percentile. More warm nights increase heat-related health risks and prevent nighttime cooling of urban areas.',

    'TX90p': 'Percentage of days when daytime temperatures exceed the 90th percentile. More extremely hot days increase heat-related health risks, energy demand for cooling, and water stress.',

    'SPEI': 'Measures water balance by considering both precipitation and potential evapotranspiration. Negative values indicate drought conditions considering both rainfall and temperature effects.',

    'tasmax': 'The average daily maximum temperature per year. Increases can affect energy demand, human comfort, and ecosystem function.',

    'tas': 'The mean daily temperature averaged over a year. Changes in this fundamental climate parameter can have wide-ranging impacts on all aspects of human and natural systems.'
  };

  return explanations[indexCode] || 'This climate index helps track changes in weather patterns relevant to climate change impact assessment.';
};

/**
 * Modal that displays detailed information about a climate index
 */
const ClimateDetailModal = ({
  isOpen,
  onClose,
  cityName,
  indexCode,
  indexData,
}) => {
  const { t, i18n } = useTranslation();

  if (!isOpen || !indexCode || !indexData) return null;

  /**
   * Calculate the percentage change between two values
   */
  const calculatePercentageChange = (baseline, projected) => {
    if (!baseline || !projected) return null;
    return ((projected - baseline) / baseline) * 100;
  };

  // Get metadata for the climate index
  const unit = getIndexUnit(indexCode);
  const hazardType = getIndexHazardType(indexCode);
  const trend = getIndexTrend(indexCode, i18n.language);

  // Get the baseline value
  const baseline = indexData.historical?.baseline?.value;

  // Get projection values
  const rcp45_2030 = indexData.projections?.rcp45?.periods?.near?.value;
  const rcp45_2050 = indexData.projections?.rcp45?.periods?.mid?.value;
  const rcp85_2030 = indexData.projections?.rcp85?.periods?.near?.value;
  const rcp85_2050 = indexData.projections?.rcp85?.periods?.mid?.value;

  // Calculate percent changes
  const percentChanges = {
    rcp45_2030: calculatePercentageChange(baseline, rcp45_2030),
    rcp45_2050: calculatePercentageChange(baseline, rcp45_2050),
    rcp85_2030: calculatePercentageChange(baseline, rcp85_2030),
    rcp85_2050: calculatePercentageChange(baseline, rcp85_2050),
  };

  // Determine if changes are concerning
  const isConcerning = (value, percentChange) => {
    if (value === null || percentChange === null) return false;
    const isSignificant = Math.abs(percentChange) >= 10;
    return (
      isSignificant &&
      ((value > baseline && trend.negative) ||
        (value < baseline && !trend.negative))
    );
  };

  // Function to render a cell with change information
  const renderValueCell = (value, percentChange) => {
    if (value === null)
      return <td className="px-4 py-3 text-sm text-gray-400">—</td>;

    const changeIcon =
      percentChange > 0 ? (
        <ChevronUp className="w-4 h-4 text-red-500" />
      ) : (
        <ChevronDown className="w-4 h-4 text-green-500" />
      );

    const concerning = isConcerning(value, percentChange);

    return (
      <td className="px-4 py-3 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-gray-900 font-medium">
            {value.toFixed(2)} {unit}
          </span>
          {percentChange !== null && (
            <div className="flex items-center gap-1">
              {changeIcon}
              <span
                className={`text-xs ${percentChange > 0 ? "text-red-600" : "text-green-600"}`}
              >
                {Math.abs(percentChange).toFixed(1)}%
              </span>

              {concerning && (
                <AlertTriangle size={12} className="text-amber-500 ml-1" />
              )}
            </div>
          )}
        </div>
      </td>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center overflow-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden mx-4">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {getDescriptiveIndexLabel(indexCode, i18n.language)}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{cityName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-100px)]">
          {/* Detailed Index Explanation */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start gap-2">
              <HelpCircle className="text-blue-600 w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800 mb-1">What is this index?</h3>
                <p className="text-sm text-blue-700">
                  {getDetailedIndexExplanation(indexCode)}
                </p>
              </div>
            </div>
          </div>

          {/* Description and trend */}
          <div className="mb-6 space-y-4">
            <div className="flex items-start gap-3">
              <div
                className="w-3 h-3 mt-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: getHazardColor(hazardType) }}
              />
              <div>
                <p className="text-gray-700">
                  {getIndexDescription(indexCode, i18n.language)}
                </p>

                {trend && (
                  <p className="text-gray-700 mt-2">
                    <span className="font-medium">
                      {t("sections:projections.trend")}:
                    </span>{" "}
                    {trend.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Historical baseline */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              {t("sections:projections.modal.historical_data")}
            </h3>

            {baseline ? (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">
                    {t("sections:projections.modal.baseline")} (1980-2005):
                  </span>{" "}
                  {baseline.toFixed(2)} {unit}
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  This represents the typical conditions before recent climate change acceleration.
                  It serves as our reference point for measuring future changes.
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                {t("sections:projections.modal.no_historical")}
              </p>
            )}
          </div>

          {/* Projected changes */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              {t("sections:projections.modal.projected_changes")}
            </h3>

            {rcp45_2030 || rcp45_2050 || rcp85_2030 || rcp85_2050 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                        {t("sections:projections.modal.time_period")}
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                        {t("sections:projections.modal.optimistic")} (RCP 4.5)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                        {t("sections:projections.modal.pessimistic")} (RCP 8.5)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        2030 (2020-2040)
                      </td>
                      {renderValueCell(rcp45_2030, percentChanges.rcp45_2030)}
                      {renderValueCell(rcp85_2030, percentChanges.rcp85_2030)}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        2050 (2040-2060)
                      </td>
                      {renderValueCell(rcp45_2050, percentChanges.rcp45_2050)}
                      {renderValueCell(rcp85_2050, percentChanges.rcp85_2050)}
                    </tr>
                  </tbody>
                </table>

                {/* Alert icons explanation */}
                <div className="mt-3 flex items-start gap-2 text-xs text-gray-600">
                  <AlertTriangle size={12} className="text-amber-500 mt-0.5" />
                  <p>Warning icon indicates concerning changes based on expected impacts.</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                {t("sections:projections.modal.no_projections")}
              </p>
            )}
          </div>

          {/* Interpretation */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t("sections:projections.modal.interpretation")}
            </h3>

            <p className="text-sm text-gray-700">
              {t("sections:projections.modal.data_explanation")}
            </p>

            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>{t("sections:projections.modal.rcp45")}:</strong>{" "}
                  {t("sections:projections.modal.rcp45_explanation")} 
                  This scenario assumes coordinated global action to reduce emissions, 
                  resulting in about 2°C of warming by 2100.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>{t("sections:projections.modal.rcp85")}:</strong>{" "}
                  {t("sections:projections.modal.rcp85_explanation")} 
                  This scenario assumes continued high emissions and limited climate action, 
                  resulting in 4°C or more of warming by 2100.
                </span>
              </li>
            </ul>

            <div className="mt-4 text-sm text-gray-700">
              <p><strong>How to use this information:</strong></p>
              <p className="mt-1">
                Use these projections to understand potential climate risks in your city and plan adaptation 
                measures. Consider both scenarios in your planning to prepare for a range of possible futures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateDetailModal;