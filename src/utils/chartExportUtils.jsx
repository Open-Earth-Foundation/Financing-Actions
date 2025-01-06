// src/utils/chartExportUtils.jsx
import { Download } from 'lucide-react';
import React from 'react';

export const downloadAsPNG = async (element, filename) => {
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
      useCORS: true
    });

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error generating PNG:', error);
  }
};

export const DownloadButton = React.memo(({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      title="Download chart"
    >
      <Download className="w-4 h-4 text-gray-500" />
    </button>
  );
});

DownloadButton.displayName = 'DownloadButton';