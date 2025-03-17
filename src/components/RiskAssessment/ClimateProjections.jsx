import React, { useState, useEffect, useMemo, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Info, AlertTriangle, TrendingUp, GitBranch } from "lucide-react";
import { getHazardColor } from "../../constants/hazardColors";
import {
  CLIMATE_INDEX_MAP,
  getIndexLabel,
  getIndexDescription,
  getIndexHazardType,
  getIndexUnit,
  getIndexTrend,
} from "../../constants/climateIndices";
import { fetchCityClimateData } from "../../api/climateDataApi";
import ClimateDetailModal from "./ClimateDetailModal";
import {
  estimateHistoricalBaseline,
  generateTimeseriesChartData,
  calculateTimeseriesDomain,
  calculateTrendLineData,
} from "../../utils/climateUtils";

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }) => {
  const { t, i18n } = useTranslation();

  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
      {payload.map((entry, index) => {
        const dataKey = entry.dataKey;
        let indexCode,
          scenario,
          isTrend = false;

        // Handle trend data (e.g., "rcp45_trend")
        if (dataKey.includes("_trend")) {
          [scenario] = dataKey.split("_");
          indexCode =
            payload[0].payload.indexCode || payload[0].name.split("_")[0];
          isTrend = true;
          scenario =
            scenario === "rcp45"
              ? t("sections:projections.scenarios.optimistic")
              : t("sections:projections.scenarios.pessimistic");
        }
        // Handle timeseries data format (e.g., "rcp45_value")
        else if (dataKey.includes("_value")) {
          [scenario] = dataKey.split("_");
          indexCode =
            payload[0].payload.indexCode || payload[0].name.split("_")[0];
          scenario =
            scenario === "rcp45"
              ? t("sections:projections.scenarios.optimistic")
              : scenario === "rcp85"
                ? t("sections:projections.scenarios.pessimistic")
                : t("sections:projections.scenarios.historical");
        } else {
          // Handle summary format (e.g., "CDD_rcp45")
          indexCode = dataKey.split("_")[0];
          scenario = dataKey.includes("rcp45")
            ? t("sections:projections.scenarios.optimistic")
            : dataKey.includes("rcp85")
              ? t("sections:projections.scenarios.pessimistic")
              : t("sections:projections.scenarios.historical");
        }

        const unit = getIndexUnit(indexCode);

        return (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600">
              {`${scenario}${isTrend ? " " + t("sections:projections.trend_line") : ""}`}
              :
            </span>
            <span className="font-medium" style={{ color: entry.color }}>
              {typeof entry.value === "number"
                ? entry.value.toFixed(2)
                : entry.value}
              {unit ? ` ${unit}` : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Helper function to explain what climate indices are
const getClimateIndicesExplanation = (t) => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
      <h3 className="font-medium text-blue-800 mb-2">
        What are Climate Indices?
      </h3>
      <p className="text-sm text-blue-700">
        Climate indices are simple measurements that help us track and
        understand complex climate patterns. They convert complicated weather
        data into numbers that show how our climate is changing over time. Each
        index tracks a specific aspect of climate, such as extreme rainfall
        events, dry periods, or temperature highs. These measurements help city
        planners prepare for climate change impacts like floods, droughts, and
        heat waves.
      </p>
    </div>
  );
};

// Helper function to get descriptive labels for climate indices
const getDescriptiveIndexLabel = (indexCode, language) => {
  const baseLabel = getIndexLabel(indexCode, language);

  // Map of index codes to more descriptive, user-friendly names
  const descriptiveLabels = {
    CDD: "Consecutive Dry Days (Drought Index)",
    R95p: "Heavy Precipitation Days (Extreme Rainfall)",
    RX1day: "Maximum 1-Day Rainfall (Extreme Precipitation)",
    RX5day: "Maximum 5-Day Rainfall (Prolonged Heavy Rain)",
    SPI: "Standardized Precipitation Index (Drought/Wet Conditions)",
    WSDI: "Warm Spell Duration Index (Heatwave Length)",
    TXx: "Maximum Temperature (Hottest Day)",
    TNn: "Minimum Temperature (Coldest Night)",
    TR: "Tropical Nights (High Minimum Temperature)",
    FD: "Frost Days (Cold Risk)",
    GTx: "Growing Season Length (Agriculture)",
    PRCPTOT: "Total Annual Precipitation (Rainfall Amount)",
    TN90p: "Warm Nights (Nighttime Heat)",
    TX90p: "Percentage of Days Above 90th Percentile (Hot Days)",
    SPEI: "Precipitation-Evaporation Index (Water Balance)",
    tasmax: "Maximum Temperature (Daily High)",
    tas: "Average Temperature (Daily Mean)",
  };

  return descriptiveLabels[indexCode] || baseLabel;
};

// Main component
const ClimateProjections = forwardRef(({ cityname }, ref) => {
  const { t, i18n } = useTranslation();

  // State
  const [cityData, setCityData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedScenarios, setSelectedScenarios] = useState({
    rcp45: true,
    rcp85: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Always use timeseries view only
  const viewMode = "timeseries";
  const [timeseriesRange, setTimeseriesRange] = useState({
    start: 2006,
    end: 2050,
  });
  const [showTrendLines, setShowTrendLines] = useState(true);

  // Effects
  useEffect(() => {
    const fetchData = async () => {
      if (!cityname) return;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchCityClimateData(cityname);
        setCityData(data);

        // Set the first available index as default selection
        const availableIndices = Object.keys(data.indices);
        if (availableIndices.length > 0) {
          setSelectedIndex(availableIndices[0]);
        }
      } catch (err) {
        console.error("Error fetching climate data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityname]);

  // Create timeseries chart data
  const timeseriesChartData = useMemo(() => {
    return generateTimeseriesChartData(
      cityData,
      selectedIndex,
      selectedScenarios,
      timeseriesRange,
    );
  }, [cityData, selectedIndex, selectedScenarios, timeseriesRange]);

  // Calculate trend lines for each scenario
  const trendLineData = useMemo(() => {
    if (!showTrendLines) return { rcp45: [], rcp85: [] };

    const rcp45TrendData = selectedScenarios.rcp45
      ? calculateTrendLineData(timeseriesChartData, "rcp45")
      : [];

    const rcp85TrendData = selectedScenarios.rcp85
      ? calculateTrendLineData(timeseriesChartData, "rcp85")
      : [];

    return { rcp45: rcp45TrendData, rcp85: rcp85TrendData };
  }, [timeseriesChartData, selectedScenarios, showTrendLines]);

  // Get the domain (min/max values) for the timeseries chart
  const timeseriesDomain = useMemo(() => {
    const allTrendData = [
      ...(trendLineData.rcp45 || []),
      ...(trendLineData.rcp85 || []),
    ];
    return calculateTimeseriesDomain(timeseriesChartData, allTrendData);
  }, [timeseriesChartData, trendLineData]);

  // Event handlers
  const toggleScenario = (scenario) => {
    setSelectedScenarios((prev) => ({
      ...prev,
      [scenario]: !prev[scenario],
    }));
  };

  const handleIndexSelect = (index) => {
    setSelectedIndex(index);
  };

  const toggleTrendLines = () => {
    setShowTrendLines((prev) => !prev);
  };

  const handleTimeRangeChange = (e) => {
    const { name, value } = e.target;
    setTimeseriesRange((prev) => ({
      ...prev,
      [name]: parseInt(value, 10),
    }));
  };

  // Get trend information for the selected index
  const trendInfo = useMemo(() => {
    if (!selectedIndex) return null;
    return getIndexTrend(selectedIndex, i18n.language);
  }, [selectedIndex, i18n.language]);

  // Determine anomaly direction and significance for 2050 RCP8.5 (worst-case)
  const anomalyInfo = useMemo(() => {
    if (!cityData || !selectedIndex) return null;

    const indexData = cityData.indices[selectedIndex];
    if (!indexData?.projections?.rcp85?.periods?.mid) return null;

    const anomaly = indexData.projections.rcp85.periods.mid.anomaly;
    const trend = getIndexTrend(selectedIndex);

    // Determine if the anomaly is significant (more than 10% change)
    const baselineValue = indexData.historical?.baseline?.value || 0;
    const percentChange =
      baselineValue !== 0 ? (anomaly / baselineValue) * 100 : 0;
    const isSignificant = Math.abs(percentChange) >= 10;

    // Determine if the trend is concerning based on direction and significance
    const isConcerning =
      isSignificant &&
      ((anomaly > 0 && trend.negative) || (anomaly < 0 && !trend.negative));

    return {
      value: anomaly,
      percentChange,
      isPositive: anomaly > 0,
      isSignificant,
      isConcerning,
    };
  }, [cityData, selectedIndex]);

  // Determine if timeseries data is available
  const hasTimeseriesData = useMemo(() => {
    if (!selectedIndex || !cityData?.indices?.[selectedIndex]) return false;

    const indexData = cityData.indices[selectedIndex];
    const rcp45Data = indexData.projections?.rcp45?.timeseries;
    const rcp85Data = indexData.projections?.rcp85?.timeseries;

    return (
      (Array.isArray(rcp45Data) && rcp45Data.length > 0) ||
      (Array.isArray(rcp85Data) && rcp85Data.length > 0)
    );
  }, [cityData, selectedIndex]);

  // Get year range for the selected index
  const timeseriesYearRange = useMemo(() => {
    if (!selectedIndex || !cityData?.indices?.[selectedIndex])
      return { start: 2006, end: 2099 };

    const indexData = cityData.indices[selectedIndex];

    // Default values
    let startYear = 2006;
    let endYear = 2099;

    // Try to get the timeseriesStart/End values
    if (indexData.projections?.rcp45?.timeseriesStart) {
      startYear = Math.min(
        startYear,
        indexData.projections.rcp45.timeseriesStart,
      );
    }

    if (indexData.projections?.rcp85?.timeseriesStart) {
      startYear = Math.min(
        startYear,
        indexData.projections.rcp85.timeseriesStart,
      );
    }

    if (indexData.projections?.rcp45?.timeseriesEnd) {
      endYear = Math.max(endYear, indexData.projections.rcp45.timeseriesEnd);
    }

    if (indexData.projections?.rcp85?.timeseriesEnd) {
      endYear = Math.max(endYear, indexData.projections.rcp85.timeseriesEnd);
    }

    return { start: startYear, end: endYear };
  }, [cityData, selectedIndex]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-gray-500">{t("common:loading")}</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-red-500">
          {t("common:error")}: {error}
        </div>
      </div>
    );
  }

  // No data state
  if (!cityData) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-gray-500">{t("sections:projections.no_data")}</div>
      </div>
    );
  }

  // Get available indices
  const availableIndices = Object.keys(cityData.indices).filter(
    (index) =>
      cityData.indices[index].historical?.baseline?.value !== undefined ||
      cityData.indices[index].projections?.rcp45?.periods?.near?.value !==
        undefined ||
      cityData.indices[index].projections?.rcp85?.periods?.near?.value !==
        undefined,
  );

  if (availableIndices.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-gray-500">
          {t("sections:projections.no_indices")}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="">
      {/* Explanation of Climate Indices */}
      {getClimateIndicesExplanation(t)}

      {/* Climate index selector with more descriptive labels */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-500">
          {t("common:labels.climate_indices")}:
        </label>
        <div className="flex flex-wrap gap-3">
          {availableIndices.map((index) => {
            const hazardType = getIndexHazardType(index);

            return (
              <button
                key={index}
                onClick={() => handleIndexSelect(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  hover:scale-105 active:scale-95
                  ${
                    index === selectedIndex
                      ? "text-white shadow-sm"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                style={{
                  backgroundColor:
                    index === selectedIndex
                      ? getHazardColor(hazardType)
                      : undefined,
                }}
              >
                {getDescriptiveIndexLabel(index, i18n.language)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scenario toggles */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-500">
          {t("common:labels.scenarios")}:
        </label>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => toggleScenario("rcp45")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              hover:scale-105 active:scale-95
              ${
                selectedScenarios.rcp45
                  ? "bg-blue-100 text-blue-800 border border-blue-300"
                  : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200"
              }`}
          >
            {t("sections:projections.scenarios.optimistic")}
          </button>
          <button
            onClick={() => toggleScenario("rcp85")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              hover:scale-105 active:scale-95
              ${
                selectedScenarios.rcp85
                  ? "bg-blue-100 text-blue-800 border border-blue-300"
                  : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200"
              }`}
          >
            {t("sections:projections.scenarios.pessimistic")}
          </button>

          {/* Trend line toggle */}
          <button
            onClick={toggleTrendLines}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
              hover:scale-105 active:scale-95
              ${
                showTrendLines
                  ? "bg-blue-100 text-blue-800 border border-blue-300"
                  : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200"
              }`}
          >
            <GitBranch size={16} />
            {t("sections:projections.trend_lines")}
          </button>
        </div>
      </div>

      {/* Time range selector */}
      {hasTimeseriesData && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">
            {t("common:labels.year")} {t("sections:projections.range")}:
          </label>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">From:</span>
              <input
                type="number"
                name="start"
                min={timeseriesYearRange.start}
                max={timeseriesRange.end}
                value={timeseriesRange.start}
                onChange={handleTimeRangeChange}
                className="px-2 py-1 border border-gray-300 rounded w-20 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">To:</span>
              <input
                type="number"
                name="end"
                min={timeseriesRange.start}
                max={timeseriesYearRange.end}
                value={timeseriesRange.end}
                onChange={handleTimeRangeChange}
                className="px-2 py-1 border border-gray-300 rounded w-20 text-sm"
              />
            </div>
            <div className="flex-1"></div>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeseriesRange({ start: 2006, end: 2050 })}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
              >
                2006-2050
              </button>
              <button
                onClick={() => setTimeseriesRange({ start: 2006, end: 2099 })}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
              >
                2006-2099
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Index description and anomaly alert */}
      {selectedIndex && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <Info size={20} className="text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                {getDescriptiveIndexLabel(selectedIndex, i18n.language)}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {getIndexDescription(selectedIndex, i18n.language)}
              </p>

              {trendInfo && (
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">
                    {t("sections:projections.trend")}:
                  </span>{" "}
                  {trendInfo.description}
                </p>
              )}

              {anomalyInfo?.isConcerning && (
                <div className="flex items-start gap-2 mt-3 p-2 bg-amber-50 border border-amber-200 rounded-md">
                  <AlertTriangle
                    size={16}
                    className="text-amber-500 flex-shrink-0 mt-0.5"
                  />
                  <p className="text-sm text-amber-800">
                    {t("sections:projections.significant_change", {
                      direction: anomalyInfo.isPositive
                        ? t("sections:projections.increase")
                        : t("sections:projections.decrease"),
                      percent: Math.abs(Math.round(anomalyInfo.percentChange)),
                      by2050: "2050",
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-900">
          {t("sections:projections.time_series_title")}
        </h4>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 
                    bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors
                    border border-blue-200 hover:border-blue-300"
        >
          {t("common:actions.view_details")}
        </button>
      </div>

      <div className="h-[400px]">
        {/* Timeseries chart (year by year) */}
        {hasTimeseriesData ? (
          timeseriesChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeseriesChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.25} />
                <XAxis
                  dataKey="year"
                  stroke="#6b7280"
                  tick={{ fill: "#6b7280" }}
                  tickCount={10}
                  domain={[timeseriesRange.start, timeseriesRange.end]}
                  type="number"
                  allowDecimals={false}
                />
                <YAxis
                  domain={timeseriesDomain}
                  stroke="#6b7280"
                  tick={{ fill: "#6b7280" }}
                  label={{
                    value: getIndexUnit(selectedIndex),
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle", fill: "#6b7280" },
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                {/* Add reference lines for 2030 and 2050 */}
                {timeseriesRange.start <= 2030 &&
                  timeseriesRange.end >= 2030 && (
                    <ReferenceLine
                      x={2030}
                      stroke="#888"
                      strokeDasharray="3 3"
                      label={{
                        value: "2030",
                        position: "top",
                        fill: "#888",
                        fontSize: 12,
                      }}
                    />
                  )}

                {timeseriesRange.start <= 2050 &&
                  timeseriesRange.end >= 2050 && (
                    <ReferenceLine
                      x={2050}
                      stroke="#888"
                      strokeDasharray="3 3"
                      label={{
                        value: "2050",
                        position: "top",
                        fill: "#888",
                        fontSize: 12,
                      }}
                    />
                  )}

                {selectedScenarios.rcp45 && (
                  <Line
                    type="monotone"
                    dataKey="rcp45_value"
                    name={t("sections:projections.scenarios.optimistic")}
                    stroke={getHazardColor(
                      getIndexHazardType(selectedIndex),
                      "optimistic",
                    )}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    connectNulls
                    isAnimationActive={false}
                  />
                )}

                {selectedScenarios.rcp85 && (
                  <Line
                    type="monotone"
                    dataKey="rcp85_value"
                    name={t("sections:projections.scenarios.pessimistic")}
                    stroke={getHazardColor(
                      getIndexHazardType(selectedIndex),
                      "pessimistic",
                    )}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    connectNulls
                    isAnimationActive={false}
                  />
                )}

                {/* Trend lines */}
                {showTrendLines &&
                  selectedScenarios.rcp45 &&
                  trendLineData.rcp45.length > 0 && (
                    <Line
                      type="linear"
                      dataKey="rcp45_trend"
                      data={trendLineData.rcp45}
                      name={`${t("sections:projections.scenarios.optimistic")} ${t("sections:projections.trend_lines")}`}
                      stroke={getHazardColor(
                        getIndexHazardType(selectedIndex),
                        "optimistic",
                      )}
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      opacity={0.7}
                      dot={false}
                      activeDot={false}
                      connectNulls
                      isAnimationActive={true}
                    />
                  )}

                {showTrendLines &&
                  selectedScenarios.rcp85 &&
                  trendLineData.rcp85.length > 0 && (
                    <Line
                      type="linear"
                      dataKey="rcp85_trend"
                      data={trendLineData.rcp85}
                      name={`${t("sections:projections.scenarios.pessimistic")} ${t("sections:projections.trend_lines")}`}
                      stroke={getHazardColor(
                        getIndexHazardType(selectedIndex),
                        "pessimistic",
                      )}
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      opacity={0.7}
                      dot={false}
                      activeDot={false}
                      connectNulls
                      isAnimationActive={true}
                    />
                  )}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              {t("sections:projections.select_scenario")}
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            {t("sections:projections.no_timeseries_data")}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedIndex && (
        <ClimateDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          cityName={cityname}
          indexCode={selectedIndex}
          indexData={cityData.indices[selectedIndex]}
        />
      )}
    </div>
  );
});

ClimateProjections.displayName = "ClimateProjections";
export default ClimateProjections;
