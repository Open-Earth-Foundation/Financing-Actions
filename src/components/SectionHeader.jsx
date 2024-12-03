// src/components/SectionHeader.jsx
import React from "react";
import { Lightbulb } from "lucide-react";
import InfoTooltip from "./InfoTooltip";

const SectionHeader = ({ title, description, insights }) => {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-2xl font-normal font-poppins">{title}</h3>
        <InfoTooltip
          icon={<Lightbulb className="w-5 h-5" />}
          content={insights}
          className="p-2 hover:bg-amber-50/50 rounded-full transition-colors"
          tooltipClass="bg-amber-50 border-amber-100"
        />
      </div>
      <p className="text-base font-normal font-opensans text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
