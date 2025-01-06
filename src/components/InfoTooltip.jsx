import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

const InfoTooltip = ({ title, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);

  // Handle tooltip positioning when it would overflow the viewport
  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      if (tooltipRect.left < 0) {
        tooltipRef.current.style.right = 'auto';
        tooltipRef.current.style.left = '0';
        tooltipRef.current.style.transform = 'translateY(-50%)';
      }

      if (tooltipRect.right > viewportWidth) {
        tooltipRef.current.style.left = 'auto';
        tooltipRef.current.style.right = '0';
        tooltipRef.current.style.transform = 'translateY(-50%)';
      }
    }
  }, [isVisible]);

  return (
    <div className="relative inline-block" ref={containerRef}>
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
        <div
          ref={tooltipRef}
          className="absolute z-50 w-72 bg-white p-4 rounded-lg shadow-lg border border-gray-200 right-full top-1/2 transform -translate-y-1/2 mr-2"
          style={{ maxWidth: 'calc(100vw - 2rem)' }}
        >
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