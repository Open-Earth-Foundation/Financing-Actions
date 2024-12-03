import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = {
    en: {
      flag: (
        <svg className="w-5 h-5" viewBox="0 0 512 512">
          <path fill="#f0f0f0" d="M0 85.33h512v341.337H0z"/>
          <path fill="#d80027" d="M0 85.33h512v42.663H0zM0 170.66h512v42.663H0zM0 256h512v42.663H0zM0 341.33h512v42.663H0z"/>
          <path fill="#2e52b2" d="M0 85.33h256v183.797H0z"/>
        </svg>
      ),
      label: 'EN'
    },
    'pt-BR': {
      flag: (
        <svg className="w-5 h-5" viewBox="0 0 512 512">
          <path fill="#6DA544" d="M0 85.331h512v341.337H0z"/>
          <path fill="#FFDA44" d="M256 161.678L50.372 256l205.628 94.322L462.628 256z"/>
          <path fill="#F0F0F0" d="M256 161.678c-52.096 0-94.322 42.226-94.322 94.322s42.226 94.322 94.322 94.322 94.322-42.226 94.322-94.322-42.226-94.322-94.322-94.322z"/>
          <path fill="#0052B4" d="M256 208.44c-26.284 0-47.56 21.277-47.56 47.56s21.277 47.56 47.56 47.56 47.56-21.277 47.56-47.56-21.276-47.56-47.56-47.56z"/>
          <path fill="#FFDA44" d="M256 227.883c15.334 0 27.796 12.462 27.796 27.796 0 15.334-12.462 27.796-27.796 27.796-15.334 0-27.796-12.462-27.796-27.796 0-15.334 12.462-27.796 27.796-27.796z"/>
        </svg>
      ),
      label: 'PT'
    }
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('preferred-language', lang);
    setIsOpen(false);
  };

  const currentLanguage = languages[i18n.language] || languages['en'];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 w-28 hover:bg-blue-700 text-white rounded-md transition-colors"
      >
        <span className="flex-shrink-0">{currentLanguage.flag}</span>
        <span className="font-medium">{currentLanguage.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
            <div className="py-1">
              {Object.entries(languages).map(([code, { flag, label }]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm
                    ${i18n.language === code 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <span className="flex-shrink-0">{flag}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;