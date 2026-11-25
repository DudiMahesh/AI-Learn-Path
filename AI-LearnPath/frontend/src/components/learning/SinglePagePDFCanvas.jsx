import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';

export default function SinglePagePDFCanvas({
  pdfUrl,
  pageNum = 1,
  zoom = 1.0,
  onTotalPages
}) {
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const pdfDocRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cssDimensions, setCssDimensions] = useState({ width: 794, height: 1123 });

  // Load PDF.js library script once
  const loadPdfJs = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) {
        resolve(window.pdfjsLib);
        return;
      }
      const script = document.createElement('script');
      script.src = '/vendor/pdfjs/pdf.min.js';
      script.async = true;
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs/pdf.worker.min.js';
          resolve(window.pdfjsLib);
        } else {
          reject(new Error('PDF.js failed to initialize'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load PDF.js script'));
      document.body.appendChild(script);
    });
  }, []);

  // Load PDF Document
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    loadPdfJs()
      .then(pdfjsLib => pdfjsLib.getDocument(pdfUrl).promise)
      .then(doc => {
        if (isCancelled) return;
        pdfDocRef.current = doc;
        if (onTotalPages) {
          onTotalPages(doc.numPages);
        }
        renderPage(doc, pageNum);
      })
      .catch(err => {
        if (!isCancelled) {
          console.error("PDF load error:", err);
          setError("Failed to load PDF study guide.");
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {}
      }
    };
  }, [pdfUrl, loadPdfJs]);

  // Render Single Page on Canvas
  const renderPage = useCallback((doc, pageNumber) => {
    if (!doc || !canvasRef.current) return;
    setLoading(true);

    if (renderTaskRef.current) {
      try {
        renderTaskRef.current.cancel();
      } catch {}
    }

    const safePageNum = Math.max(1, Math.min(pageNumber, doc.numPages));

    doc.getPage(safePageNum).then(page => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      const dpr = window.devicePixelRatio || 1;
      const unscaled = page.getViewport({ scale: 1.0 });

      // Base A4 width: 794px at 100% zoom (96 DPI)
      const baseWidth = 794;
      const baseHeight = Math.round(baseWidth * (unscaled.height / unscaled.width));

      // Displayed CSS size
      const cssW = Math.round(baseWidth * zoom);
      const cssH = Math.round(baseHeight * zoom);
      setCssDimensions({ width: cssW, height: cssH });

      // High-DPI viewport scale factor
      const scale = (cssW / unscaled.width) * dpr;
      const viewport = page.getViewport({ scale });

      // Canvas pixel dimensions
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      // CSS dimensions to prevent stretching
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      const task = page.render(renderContext);
      renderTaskRef.current = task;

      task.promise
        .then(() => {
          setLoading(false);
        })
        .catch(err => {
          if (err?.name !== 'RenderingCancelledException') {
            console.error("Page render error:", err);
            setLoading(false);
          }
        });
    });
  }, [zoom]);

  // Re-render when pageNum or zoom changes
  useEffect(() => {
    if (pdfDocRef.current) {
      renderPage(pdfDocRef.current, pageNum);
    }
  }, [pageNum, zoom, renderPage]);

  return (
    <div className="relative flex flex-col items-center">
      {/* Loading Indicator */}
      {loading && (
        <div
          className="absolute top-8 z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-zinc-200 shadow-2xl backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(28, 29, 33, 0.95)',
            borderColor: '#3a3d45',
            borderWidth: '1px'
          }}
        >
          <Loader2 size={15} className="animate-spin text-[#7ee8c3]" />
          <span>Rendering Page {pageNum}…</span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="my-auto p-6 text-center text-red-400 bg-red-950/30 border border-red-800 rounded-2xl max-w-md">
          <p className="font-bold text-sm mb-1">{error}</p>
          <p className="text-xs text-zinc-400">Please check your network connection.</p>
        </div>
      )}

      {/* White A4 Sheet on Dark Background */}
      <div
        className="relative bg-white shadow-[0_12px_45px_rgba(0,0,0,0.6)] rounded-sm overflow-hidden my-4 mx-auto select-text transition-all"
        style={{
          width: `${cssDimensions.width}px`,
          height: `${cssDimensions.height}px`,
          borderColor: '#3a3d45',
          borderWidth: '1px'
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: `${cssDimensions.width}px`,
            height: `${cssDimensions.height}px`,
            display: 'block'
          }}
        />
      </div>
    </div>
  );
}
