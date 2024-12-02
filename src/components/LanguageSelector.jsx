// src/components/LanguageSelector.jsx
import React, { useState } from 'react';

const LanguageSelector = () => {
  const [currentLang, setCurrentLang] = useState('en');

  const languages = {
    en: {
      flag: (
        <svg className="w-4 h-4" viewBox="0 0 512 512">
          <path fill="#f0f0f0" d="M0 85.33h512v341.337H0z"/>
          <path fill="#d80027" d="M0 85.33h512v42.663H0zM0 170.66h512v42.663H0zM0 256h512v42.663H0zM0 341.33h512v42.663H0z"/>
          <path fill="#2e52b2" d="M0 85.33h256v183.797H0z"/>
          {/* Add stars here if needed */}
        </svg>
      ),
      label: 'EN'
    },
    pt: {
      flag: (
        <svg className="w-4 h-4" viewBox="0 0 512 512">
          <path fill="#6da544" d="M0 85.337h512v341.326H0z"/>
          <path fill="#ffda44" d="M256 161.67L0 426.663V85.337z"/>
          <path fill="#f0f0f0" d="M256 161.67L512 85.337v341.326z"/>
          <circle fill="#0052b4" cx="256" cy="255.994" r="47.49"/>
          {/* Add more details to Brazilian flag if needed */}
        </svg>
      ),
      label: 'PT'
    }
  };

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'en' ? 'pt' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
    >
      {languages[currentLang].flag}
      <span className="text-sm font-medium">
        {languages[currentLang].label}
      </span>
    </button>
  );
};

export default LanguageSelector;