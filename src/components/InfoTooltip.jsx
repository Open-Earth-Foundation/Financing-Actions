import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const InfoTooltip = ({ title, content, placement = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPlacementClasses = () => {
    const baseClasses = "absolute z-50 w-72 bg-white p-4 rounded-lg shadow-lg border border-gray-200";
    switch (placement) {
      case "top":
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
      case "bottom":
        return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 mt-2`;
      case "left":
        return `${baseClasses} right-full top-1/2 transform -translate-y-1/2 mr-2`;
      case "right":
        return `${baseClasses} left-full top-1/2 transform -translate-y-1/2 ml-2`;
      default:
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
    }
  };

  return (
    <div className="relative inline-block">
      <button
        className="text-gray-400 hover:text-gray-600 transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        aria-label={`Info about ${title}`}
      >
        <HelpCircle className="w-5 h-5" />
      </button>

      {isVisible && (
        <div className={getPlacementClasses()}>
          <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
          <div className="text-sm text-gray-600">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;