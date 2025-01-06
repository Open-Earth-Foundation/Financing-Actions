import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const LearnMoreSection = ({ title, content, isOpen, onToggle }) => (
  <div className="border rounded-lg mb-4">
    <button
      onClick={onToggle}
      className="w-full p-4 flex justify-between items-center text-left hover:bg-gray-50"
    >
      <h3 className="text-lg font-medium">{title}</h3>
      <ChevronDown 
        className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
      />
    </button>
    {isOpen && (
      <div className="p-4 border-t bg-gray-50">
        <p className="whitespace-pre-line">{content}</p>
      </div>
    )}
  </div>
);

const LearnMore = () => {
  const { t } = useTranslation();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = {
    methodology: {
      title: t('learn-more:sections.methodology.title'),
      content: t('learn-more:sections.methodology.content')
    },
    calculations: {
      title: t('learn-more:sections.calculations.title'),
      content: t('learn-more:sections.calculations.content')
    },
    resilience: {
      title: t('learn-more:sections.resilience.title'),
      content: t('learn-more:sections.resilience.content')
    },
    quality: {
      title: t('learn-more:sections.quality.title'),
      content: t('learn-more:sections.quality.content')
    },
    features: {
      title: t('learn-more:sections.features.title'),
      content: t('learn-more:sections.features.content')
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md min-h-[360px] p-6">
      <h2 className="text-2xl font-normal font-poppins mb-6">
        {t('learn-more:title')}
      </h2>
      {Object.entries(sections).map(([key, { title, content }]) => (
        <LearnMoreSection
          key={key}
          title={title}
          content={content}
          isOpen={openSection === key}
          onToggle={() => toggleSection(key)}
        />
      ))}
    </div>
  );
};

export default LearnMore;