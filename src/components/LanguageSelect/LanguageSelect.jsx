import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const FlagIcon = ({ code }) => {
  const flags = {
    en: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" width="20" height="15" className="rounded">
        <rect width="20" height="15" fill="#FFF"/>
        <rect width="20" height="2" y="0" fill="#B22234"/>
        <rect width="20" height="2" y="3" fill="#B22234"/>
        <rect width="20" height="2" y="6" fill="#B22234"/>
        <rect width="20" height="2" y="9" fill="#B22234"/>
        <rect width="20" height="2" y="12" fill="#B22234"/>
        <rect width="8" height="8" fill="#3C3B6E"/>
      </svg>
    ),
    'pt-BR': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" width="20" height="15" className="rounded">
        <rect width="20" height="15" fill="#009B3A"/>
        <path d="M10 2l8 5.5L10 13 2 7.5z" fill="#FED800"/>
        <circle cx="10" cy="7.5" r="3.5" fill="#002776"/>
      </svg>
    )
  };

  return flags[code] || null;
};

const LanguageSelect = ({ value, onChange, disabled }) => {
  const { t } = useTranslation('export');

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'pt-BR', label: 'PT' }
  ];

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="appearance-none w-full px-4 py-4 bg-white border-2 border-[#2351DC] text-white rounded-lg font-semibold 
          tracking-wider cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 
          focus:ring-[#2351DC] focus:ring-opacity-50"
      >
        
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
        
      </select>
      <div className="absolute inset-y-0 left-1 pl-4 flex items-center pointer-events-none">
        <FlagIcon code={value} />
      </div>
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <ChevronDown className="h-4 w-4 text-[#2351DC]" />
      </div>
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <span className="pl-12 font-semibold text-[#2351DC]">
          {languages.find(lang => lang.code === value)?.label}
        </span>
      </div>
    </div>
  );
};

export default LanguageSelect;