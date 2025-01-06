import React from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { pdf } from '@react-pdf/renderer';
import ReportDocument from '../components/PDFReport/ReportDocument';
import { formatScore, getRiskLevel } from '../constants/riskLevels';
import i18next from 'i18next';

export const exportToCSV = (riskData, cityname, language = 'en') => {
  if (!riskData?.length) return;

  // Temporarily switch language for export
  const currentLang = i18next.language;
  i18next.changeLanguage(language);

  const csvData = riskData.map(item => ({
    [i18next.t('export:report.tables.headers.sector')]: item.keyimpact || '',
    [i18next.t('export:report.tables.headers.hazard')]: item.hazard,
    [i18next.t('export:report.tables.headers.risk_score')]: formatScore(item.risk_score),
    [i18next.t('export:report.tables.headers.risk_level')]: getRiskLevel(item.risk_score).label,
    [i18next.t('export:report.tables.headers.hazard_score')]: formatScore(item.hazard_score),
    [i18next.t('export:report.tables.headers.exposure_score')]: formatScore(item.exposure_score),
    [i18next.t('export:report.tables.headers.vulnerability_score')]: formatScore(item.vulnerability_score),
    [i18next.t('export:report.tables.headers.adaptive_capacity')]: formatScore(item.adaptive_capacity)
  }));

  const csv = Papa.unparse(csvData);

  // Reset language
  i18next.changeLanguage(currentLang);

  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${cityname}_${i18next.t('export:report.fileName.csv')}_${timestamp}_${language}.csv`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

export const exportToPDF = async (riskData, cityname, region, qualitativeData, language = 'en') => {
  try {
    // Temporarily switch language for export
    const currentLang = i18next.language;
    i18next.changeLanguage(language);

    const blob = await pdf(
      React.createElement(ReportDocument, {
        riskData,
        cityname,
        region,
        qualitativeData,
        language
      })
    ).toBlob();

    // Reset language
    i18next.changeLanguage(currentLang);

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${cityname}_${i18next.t('export:report.fileName.pdf')}_${timestamp}_${language}.pdf`;
    saveAs(blob, filename);
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
};