import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import CityMap from "../CityMap";
import RiskTable from "./RiskTable";
import TopRisks from "./TopRisks";
import RiskDistributionChart from "./RiskDistributionChart";
import RadialComparison from "./RadialComparison";
import HazardProjections from "./HazardProjections";
import QualitativeAssessment from "../QualitativeAssessment";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../../data/DataContext";

const RiskAssessment = ({ cityname, region, actor_id, osm_id, onBack }) => {
  const { 
    riskAssessment, 
    projectionData, 
    loading, 
    error, 
    updateResilienceScore,
    currentResilienceScore 
  } = useData();

  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showQuestionnaireResults, setShowQuestionnaireResults] = useState(false);

  // Reset resilience when city changes
  useEffect(() => {
      // Only reset if city changes
      if (cityname && actor_id) {
          updateResilienceScore(null);
          setShowQuestionnaire(false);
          setShowQuestionnaireResults(false);
      }
  }, [cityname, actor_id]); // Remove updateResilienceScore from dependencies
  // Memoize processed risk data
  const processedRiskData = useMemo(() => {
    if (!riskAssessment?.length) return [];
    return riskAssessment.sort((a, b) => b.risk_score - a.risk_score);
  }, [riskAssessment]);

  const handleResilienceScoreUpdate = (score) => {
      updateResilienceScore(score); // Score is already normalized
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-gray-600">Loading data for {cityname}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-red-500">Error loading data: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-16 space-y-9">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#7A7B9A] hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="text-sm font-medium tracking-wider">Back to search</span>
          </button>
        </div>
      </div>

      <div className="space-y-9">
        {/* Map Section */}
        <div className="items-center grid grid-cols-3 gap-4">
          <div className="flex flex-col w-full gap-2">
            <h2 className="text-[16px] font-normal text-gray-400 font-poppins">Selected city</h2>
            <div className="flex items-center gap-4">
              <MapPin className="w-8 h-8 text-[#7A7B9A]" />
              <div>
                <h2 className="text-[32px] font-semibold font-poppins">{cityname}</h2>
                <p className="text-sm text-gray-600">Region: {region}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col col-span-2 h-[400px] w-full bg-white rounded-lg shadow-md space-y-9">
            <CityMap cityname={cityname} region={region} osm_id={osm_id} />
          </div>
        </div>

        {/* Top Risks Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="mb-9">
            <h3 className="text-2xl font-normal font-poppins mb-4">Top risks for your city</h3>
            <p className="text-base font-normal font-opensans text-gray-600">
              Risks that you should prioritize or pay attention to when planning actions. 
              {currentResilienceScore !== null && " Values have been adjusted based on your Qualitative Assessment results."}
            </p>
          </div>
          <TopRisks 
            riskAssessment={processedRiskData}
            resilienceScore={currentResilienceScore}
          />
        </div>

        {/* Risk Comparisons Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-normal font-poppins mb-4">Hazard Comparison</h3>
              <p className="text-base font-normal font-opensans">
                Compare risk factors across your city's top hazards.
              </p>
            </div>
            <RadialComparison riskAssessment={processedRiskData} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-normal font-poppins mb-4">Sector Distribution</h3>
              <p className="text-base font-normal font-opensans">
                Distribution of risks across different sectors.
              </p>
            </div>
            <div className="h-[412px]">
              <RiskDistributionChart riskAssessment={processedRiskData} />
            </div>
          </div>
        </div>

        {/* Hazards Projection Section */}
        <HazardProjections projectionData={projectionData} />

        {/* CCRA Table Section */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-9 my-16 w-full">
          <div className="space-y-4">
            <h3 className="text-2xl font-normal font-poppins">
              Climate Change Risk Assessment | Table
            </h3>
            <p className="text-base font-normal font-opensans text-gray-600">
              Risk assessment data for {cityname}
              {currentResilienceScore !== null &&
                " (adjusted based on Qualitative Assessment results)"}
            </p>
          </div>

          <RiskTable 
            riskAssessment={processedRiskData}
            actor_id={actor_id}
            resilienceScore={currentResilienceScore}
          />
        </div>

        {/* Qualitative Assessment Section */}
        <AnimatePresence mode="wait">
          {!showQuestionnaire ? (
            <motion.div
              key="banner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#2351DC] rounded-lg shadow-md p-12 flex justify-between items-center"
            >
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-[32px] leading-12 font-normal font-poppins text-white">
                  <b>Get better insights.</b>
                  <br />
                  Answer a few questions.
                </h3>
                <p className="text-base font-normal font-opensans text-white">
                  Take the Qualitative Assessment Questionnaire to weigh-in
                  other non-numerical factors in our calculations and get more
                  tailored scorings after just 5 questions.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowQuestionnaire(true);
                  setShowQuestionnaireResults(false);
                }}
                className="flex justify-center hover:bg-gray-100 w-64 px-4 py-6 bg-white text-[#2351DC] rounded-lg font-semibold uppercase tracking-wider"
              >
                answer the quiz
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="questionnaire"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-lg shadow-md"
            >
              <QualitativeAssessment
                showQuestionnaire={showQuestionnaire}
                setShowQuestionnaire={setShowQuestionnaire}
                showResults={showQuestionnaireResults}
                setShowResults={setShowQuestionnaireResults}
                onScoreUpdate={handleResilienceScoreUpdate}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Export Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-4">
              <h3 className="text-[32px] font-normal font-poppins">
                Access your data in one click
              </h3>
              <p className="text-base font-normal font-opensans text-gray-600">
                Export this visualization in the format that best suits your needs
              </p>
            </div>
            <div className="flex flex-col gap-4 min-w-[200px]">
              <button
                onClick={() => {
                  console.log('Export data for:', cityname);
                }}
                className="w-full px-4 py-4 bg-[#2351DC] text-white rounded-lg font-semibold uppercase tracking-wider whitespace-nowrap"
                disabled={!processedRiskData.length}
              >
                Export as CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;