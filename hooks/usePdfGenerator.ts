import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const usePdfGenerator = (fileName: string) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // This internal function handles rendering and capturing the PDF
  const createPdf = async (): Promise<jsPDF | null> => {
    if (!contentRef.current) return null;

    document.body.classList.add('is-capturing');
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const element = contentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff', // Always white for clean print-ready PDF
      });

      document.body.classList.remove('is-capturing');

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.width, canvas.height],
        hotfixes: ['px_scaling'],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      return pdf;
    } catch (error) {
      document.body.classList.remove('is-capturing');
      console.error("Error creating PDF instance:", error);
      return null;
    }
  };

  const generatePdf = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const pdf = await createPdf();
      if (pdf) {
        pdf.save(`${fileName.replace(/[\s/\\?%*:|"<>]/g, '_')}.pdf`);
      } else {
        throw new Error("PDF generation failed.");
      }
    } catch (error) {
      console.error("Error generating PDF for download:", error);
      alert("Đã có lỗi xảy ra khi tạo file PDF. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  const sharePdf = async () => {
    if (isGenerating) return;
    if (!navigator.share || !navigator.canShare) {
      alert("Tính năng chia sẻ không được hỗ trợ trên trình duyệt này. Hãy chọn Tải báo cáo PDF.");
      return;
    }

    setIsGenerating(true);

    try {
      const pdf = await createPdf();
      if (!pdf) {
        throw new Error("PDF instance creation failed.");
      }

      const pdfBlob = pdf.output('blob');
      const pdfFile = new File([pdfBlob], `${fileName.replace(/[\s/\\?%*:|"<>]/g, '_')}.pdf`, { type: 'application/pdf' });

      const shareData = {
        files: [pdfFile],
        title: `Báo cáo PathAI: ${fileName}`,
        text: `Báo cáo định hướng nghề nghiệp và học tập từ PathAI.`,
      };

      if (navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        alert("Trình duyệt không hỗ trợ chia sẻ trực tiếp file PDF. Vui lòng thử tải về máy.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        // User closed share dialog
      } else {
        console.error("Error sharing PDF:", error);
        alert("Đã có lỗi xảy ra khi chia sẻ file PDF. Vui lòng thử lại.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return { contentRef, isGenerating, generatePdf, sharePdf };
};
