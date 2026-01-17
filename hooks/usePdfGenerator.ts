import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const usePdfGenerator = (fileName: string) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // This internal function will handle the common logic of creating the PDF
  const createPdf = async (): Promise<jsPDF | null> => {
    if (!contentRef.current) return null;

    // Add capturing class
    document.body.classList.add('is-capturing');

    // UI update before canvas generation
    await new Promise(resolve => setTimeout(resolve, 500)); // Increased wait time for stability

    try {
      const element = contentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
        // ignoreElements: (element) => element.tagName === 'BUTTON', // Optional: ignore if needed
      });

      // Remove capturing class
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

  // Function to download the PDF
  const generatePdf = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const pdf = await createPdf();
      if (pdf) {
        pdf.save(`${fileName.replace(/ /g, '_')}.pdf`);
      } else {
        throw new Error("PDF instance creation failed.");
      }
    } catch (error) {
      console.error("Error generating PDF for download:", error);
      alert("Đã có lỗi xảy ra khi tạo file PDF. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to share the PDF
  const sharePdf = async () => {
    if (isGenerating) return;
    if (!navigator.share || !navigator.canShare) {
      alert("Tính năng chia sẻ không được hỗ trợ trên trình duyệt này.");
      return;
    }

    setIsGenerating(true);

    try {
      const pdf = await createPdf();
      if (!pdf) {
        throw new Error("PDF instance creation failed.");
      }

      const pdfBlob = pdf.output('blob');
      const pdfFile = new File([pdfBlob], `${fileName.replace(/ /g, '_')}.pdf`, { type: 'application/pdf' });

      const shareData = {
        files: [pdfFile],
        title: `Kết quả PathAI của ${fileName}`,
        text: `Đây là báo cáo kết quả trắc nghiệm của tôi từ PathAI.`,
      };

      if (navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback for cases where files might not be shareable (e.g., some desktop browsers)
        alert("Trình duyệt không hỗ trợ chia sẻ file PDF. Vui lòng thử tải về.");
      }

    } catch (error) {
      // Don't show an alert if the user cancels the share dialog
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log('Share was cancelled by the user.');
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
