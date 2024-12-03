import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { pdf } from '@react-pdf/renderer';
import { createReportDocument } from '../components/PDFReport/index';
import { formatScore, getRiskLevel } from '../constants/riskLevels';

export const exportToCSV = (riskData, cityname) => {
  if (!riskData?.length) return;

  const csvData = riskData.map(item => ({
    sector: item.keyimpact || 'Unspecified',
    hazard: item.hazard,
    risk_score: formatScore(item.risk_score),
    risk_level: getRiskLevel(item.risk_score).label,
    hazard_score: formatScore(item.hazard_score),
    exposure_score: formatScore(item.exposure_score),
    vulnerability_score: formatScore(item.vulnerability_score),
    adaptive_capacity: formatScore(item.adaptive_capacity)
  }));

  const csv = Papa.unparse(csvData, {
    columns: [
      'sector',
      'hazard',
      'risk_score',
      'risk_level',
      'hazard_score',
      'exposure_score',
      'vulnerability_score',
      'adaptive_capacity'
    ]
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${cityname}_risk_assessment_${new Date().toISOString().split('T')[0]}.csv`);
};

export const exportToPDF = async (riskData, cityname, region, projectionData) => {
  try {
    const doc = createReportDocument({
      riskData,
      cityname,
      region,
      projectionData
    });

    const blob = await pdf(doc).toBlob();
    saveAs(blob, `${cityname}_risk_assessment_report_${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};