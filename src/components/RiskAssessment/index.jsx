import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin, Download, HelpCircle } from "lucide-react";
import CityMap from "../CityMap";
import RiskTable from "./RiskTable";
import TopRisks from "./TopRisks";
import RiskDistributionChart from "./RiskDistributionChart";
import RadialComparison from "./RadialComparison";
import HazardProjections from "./HazardProjections";
import QualitativeAssessment from "../QualitativeAssessment";
import SectionHeader from "../SectionHeader";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../../data/DataContext";
import LearnMore from "../LearnMore";
import { exportToCSV } from '../../utils/exportUtils';
import RiskAssessmentIntro from '../RiskAssessmentIntro';

const RiskAssessment = ({ cityname, region, actor_id, osm_id, onBack }) => {
  const { t } = useTranslation();
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
  const [isExporting, setIsExporting] = useState(false);

          useEffect(() => {
            if (cityname && actor_id) {
              updateResilienceScore(null);
              setShowQuestionnaire(false);
              setShowQuestionnaireResults(false);
            }
          }, [cityname, actor_id]);

          const processedRiskData = useMemo(() => {
            if (!riskAssessment?.length) return [];
            return riskAssessment.sort((a, b) => b.risk_score - a.risk_score);
          }, [riskAssessment]);

          const handleResilienceScoreUpdate = (score) => {
            updateResilienceScore(score);
            setShowQuestionnaireResults(true);
          };

          const handleExportData = async () => {
            if (!processedRiskData.length) return;

            setIsExporting(true);
            try {
              await exportToCSV(processedRiskData, `${cityname}_risk_assessment`);
            } catch (error) {
              console.error('Export failed:', error);
            } finally {
              setIsExporting(false);
            }
          };

if (loading) {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <p className="text-lg text-gray-600">{t('loading', { cityname })}</p>
    </div>
  );
}

if (error) {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <p className="text-lg text-red-500">{t('error', { error })}</p>
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
          <span className="text-sm font-medium tracking-wider">
            {t('sections:navigation.back_to_search')}
          </span>
        </button>
      </div>
    </div>

    <div className="space-y-9">
      {/* City Info and Map Section */}
      <div className="items-center grid grid-cols-3 gap-4">
        <div className="flex flex-col w-full gap-2">
          <h2 className="text-[16px] font-normal text-gray-400 font-poppins">
            {t('sections:navigation.selected_city')}
          </h2>
          
          <div className="flex items-center gap-4">
            <MapPin className="w-8 h-8 text-[#7A7B9A]" />
            <div>
              <h2 className="text-[32px] font-semibold font-poppins">{cityname}</h2>
              <p className="text-sm text-gray-600">{t('common:region')}: {region}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col col-span-2 h-[400px] w-full bg-white rounded-lg shadow-md">
          <CityMap cityname={cityname} region={region} osm_id={osm_id} />
        </div>
      </div>
      <RiskAssessmentIntro >
      </RiskAssessmentIntro>

      {/* Top Risks Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <SectionHeader 
          title={t('sections:top_risks.title')}
          description={t('sections:top_risks.description')}
          insights={t("sections:top_risks.insights")}
        />
        <TopRisks 
          riskAssessment={processedRiskData} 
          resilienceScore={currentResilienceScore} 
        />
      </div>

      {/* Risk Comparisons Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">
          <SectionHeader 
            title={t('sections:hazard_comparison.title')}
            description={t('sections:hazard_comparison.description')}
            insights={t("sections:hazard_comparison.insights")}
          />
          <RadialComparison riskAssessment={processedRiskData} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <SectionHeader 
            title={t('sections:sector_distribution.title')}
            description={t('sections:sector_distribution.description')}
            insights={t("sections:sector_distribution.insights")}
          />
          <RiskDistributionChart riskAssessment={processedRiskData} />
        </div>
      </div>

      {/* Projections Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <SectionHeader 
          title={t('sections:projections.title')}
          description={t('sections:projections.description')}
          insights={t("sections:projections.insights")}
        />
        <HazardProjections projectionData={projectionData} />
      </div>

      {/* CCRA Table Section */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-9 my-16 w-full">
        <SectionHeader 
          title={t('sections:ccra_table.title')}
          description={
            currentResilienceScore !== null
              ? t('sections:ccra_table.description_with_assessment')
              : t('sections:ccra_table.description')
          }
          insights={t("sections:ccra_table.insights")}
        />
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
                <b>{t('sections:qualitative_assessment.title')}</b>
                <br />
                {t('sections:qualitative_assessment.subtitle')}
              </h3>
              <p className="text-base font-normal font-opensans text-white">
                {t('sections:qualitative_assessment.description')}
              </p>
            </div>
            <button
              onClick={() => {
                setShowQuestionnaire(true);
                setShowQuestionnaireResults(false);
              }}
              className="flex justify-center hover:bg-gray-100 w-64 px-4 py-6 bg-white text-[#2351DC] rounded-lg font-semibold uppercase tracking-wider"
            >
              {t('sections:qualitative_assessment.start_button')}
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
              {t('sections:export.title')}
            </h3>
            <p className="text-base font-normal font-opensans text-gray-600">
              {t('sections:export.description')}
            </p>
          </div>
          <div className="flex flex-col gap-4 min-w-[200px]">
            <button
              onClick={handleExportData}
              disabled={!processedRiskData.length || isExporting}
              className={`w-full px-4 py-4 bg-[#2351DC] text-white rounded-lg font-semibold 
                uppercase tracking-wider whitespace-nowrap flex items-center justify-center gap-2
                ${(!processedRiskData.length || isExporting) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1a3eb3]'}`}
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t('sections:export.exporting')}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  {t('sections:export.button')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Learn More Section */}
    <LearnMore />
  </div>
);
};

export default RiskAssessment;