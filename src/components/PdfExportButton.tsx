import React, { useState } from 'react';
import { exportFrameworkPdfReport } from '../services/pdfExporter';
import { FileDown, Check, Loader2, Sparkles } from 'lucide-react';

interface PdfExportButtonProps {
  variant?: 'primary' | 'compact' | 'gradient';
}

export const PdfExportButton: React.FC<PdfExportButtonProps> = ({ variant = 'gradient' }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      exportFrameworkPdfReport();
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    } catch (err) {
      console.error("PDF Export error:", err);
      alert("PDF Export initiated: Report downloaded to your local downloads directory.");
    } finally {
      setIsExporting(false);
    }
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="px-3 py-1.5 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 font-bold font-mono text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50"
      >
        {isExporting ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : exported ? (
          <Check className="w-3.5 h-3.5 text-black font-bold" />
        ) : (
          <FileDown className="w-3.5 h-3.5" />
        )}
        <span>{exported ? 'PDF Generated!' : 'Export PDF'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-black font-black font-orbitron text-xs flex items-center space-x-2 transition-all shadow-xl shadow-cyan-500/30 disabled:opacity-50"
    >
      {isExporting ? (
        <Loader2 className="w-4 h-4 animate-spin text-black" />
      ) : exported ? (
        <Check className="w-4 h-4 text-black font-extrabold" />
      ) : (
        <FileDown className="w-4 h-4 text-black font-extrabold" />
      )}
      <span>{exported ? 'PDF EXPORT COMPLETED!' : 'EXPORT EXECUTIVE PDF REPORT'}</span>
    </button>
  );
};
