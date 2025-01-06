import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelect from '../components/LanguageSelect/LanguageSelect';

const MultilingualExportButtons = ({ 
  onExportCSV, 
  onExportPDF, 
  isExporting, 
  isPdfExporting,
  hasData 
}) => {
  const { t } = useTranslation(['sections', 'export']);
  const [exportLanguage, setExportLanguage] = useState('en');

  const handleExportCSV = () => {
    onExportCSV(exportLanguage);
  };

  const handleExportPDF = () => {
    onExportPDF(exportLanguage);
  };

  return (
    <div className="flex items-center gap-4">

      <button
        onClick={handleExportCSV}
        disabled={!hasData || isExporting}
        className={`px-4 py-4 bg-[#2351DC] text-white rounded-lg font-semibold 
          uppercase tracking-wider whitespace-nowrap flex items-center justify-center gap-2
          ${!hasData || isExporting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#1a3eb3]"}`}
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

      <button
        onClick={handleExportPDF}
        disabled={!hasData || isExporting || isPdfExporting}
        className={`px-4 py-4 bg-white border-2 border-[#2351DC] text-[#2351DC] rounded-lg font-semibold 
          uppercase tracking-wider whitespace-nowrap flex items-center justify-center gap-2
          ${!hasData || isExporting || isPdfExporting ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-80"}`}
      >
        {isPdfExporting ? (
          <>
            <div className="w-4 h-4 border-2 border-[#2351DC] border-t-transparent rounded-full animate-spin" />
            {t('sections:export.exporting')}
          </>
        ) : (
          <>
            <FileText className="w-4 h-4" />
            {t('sections:export.pdfButton')}
          </>
        )}
      </button>
      <div className="w-28">
        <LanguageSelect 
          value={exportLanguage}
          onChange={setExportLanguage}
          disabled={!hasData || isExporting || isPdfExporting}
        />
      </div>
      
    </div>
  );
};

export default MultilingualExportButtons;