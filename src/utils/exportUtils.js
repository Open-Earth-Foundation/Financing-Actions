import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';

const convertToCSV = (data) => {
  if (!data || !data.length) return '';

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        let cell = row[header] ?? '';
        if (cell.toString().includes(',')) {
          cell = `"${cell}"`;
        }
        return cell;
      }).join(',')
    )
  ];

  return csvRows.join('\n');
};

export const exportToCSV = (data, filename) => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

const generatePdfReport = (cityname, ccraData, qualitativeScore, customRiskLevels) => {
  const doc = new jsPDF();
  let currentY = 20;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const pageHeight = doc.internal.pageSize.height;

  // Helper functions remain the same...

  // Title Section
  doc.setFontSize(24);
  doc.text('Climate Change Risk Assessment Report', margin, currentY);
  currentY += 15;

  // City and Date
  doc.setFontSize(16);
  doc.text(`City: ${cityname}`, margin, currentY);
  currentY += 10;
  doc.setFontSize(12);
  doc.text(`Report generated on: ${new Date().toLocaleDateString()}`, margin, currentY);
  currentY += 15;

  // Executive Summary
  doc.setFontSize(14);
  doc.text('Executive Summary', margin, currentY);
  currentY += 10;
  doc.setFontSize(10);
  const summaryText = `This report presents a comprehensive Climate Change Risk Assessment for ${cityname}. ` +
    `The assessment evaluates various climate hazards and their potential impacts across different sectors.`;

  // Rest of the function remains the same...
  return doc;
};

export const exportToPDF = (cityname, ccraData, qualitativeScore, customRiskLevels) => {
  const doc = generatePdfReport(cityname, ccraData, qualitativeScore, customRiskLevels);
  doc.save(`${cityname.replace(/\s+/g, '_')}_CCRA_Report.pdf`);
};

export const exportUtils = {
  exportToCSV,
  exportToPDF
};

export default exportUtils;