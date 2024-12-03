// src/components/TabContent/index.jsx
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { ChevronDown } from 'lucide-react';
import TopRisks from '../RiskAssessment/TopRisks';
import RadialComparison from '../RiskAssessment/RadialComparison';
import RiskTable from '../RiskAssessment/RiskTable';
import QualitativeAssessment from '../QualitativeAssessment';
import CityMap from '../CityMap';

const LearnMoreSection = ({ title, content, isOpen, onToggle }) => (
  <div className="border rounded-lg mb-4">
    <button
      onClick={onToggle}
      className="w-full p-4 flex justify-between items-center text-left hover:bg-gray-50"
    >
      <h3 className="text-lg font-medium">{title}</h3>
      <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <div className="p-4 border-t bg-gray-50">
        <p className="whitespace-pre-line">{content}</p>
      </div>
    )}
  </div>
);

const TabContent = ({ cityData, riskAssessment, resilienceScore }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const learnMoreContent = {
    methodology: {
      title: "Assessment Methodology",
      content: "Our CCRA methodology combines climate hazard data, exposure levels, and vulnerability indicators to calculate risk scores. We use data from AdaptaBrasil and apply the C40 risk assessment framework."
    },
    calculations: {
      title: "Risk Score Calculations",
      content: "Risk scores are calculated using the formula: Risk = Hazard × Exposure × Vulnerability. Each component is normalized on a 0-1 scale, with higher scores indicating greater risk."
    },
    features: {
      title: "Key Features",
      content: `• Data-driven risk assessment
• Future climate projections
• Qualitative assessment integration
• Sector-specific analysis
• Customizable reporting`
    }
  };

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full justify-start border-b bg-transparent p-0 mb-6">
        <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">
          Overview
        </TabsTrigger>
        <TabsTrigger value="analysis" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">
          Risk Analysis
        </TabsTrigger>
        <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">
          Assessment Details
        </TabsTrigger>
        <TabsTrigger value="learn" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">
          Learn More
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-6">City Overview</h2>
          <div className="bg-white rounded-lg shadow-sm p-6 h-[400px]">
            <CityMap 
              cityname={cityData.cityname} 
              region={cityData.region} 
              osm_id={cityData.osm_id} 
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="analysis">
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Top Risks</h3>
            <TopRisks riskAssessment={riskAssessment} resilienceScore={resilienceScore} />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Risk Comparison</h3>
            <RadialComparison riskAssessment={riskAssessment} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="details">
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Complete Assessment</h3>
            <RiskTable 
              riskAssessment={riskAssessment} 
              resilienceScore={resilienceScore}
            />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Qualitative Assessment</h3>
            <QualitativeAssessment />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="learn">
        <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Learn More About CCRA</h2>
          {Object.entries(learnMoreContent).map(([key, { title, content }]) => (
            <LearnMoreSection
              key={key}
              title={title}
              content={content}
              isOpen={openSection === key}
              onToggle={() => toggleSection(key)}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TabContent;