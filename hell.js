/* import React, { useRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import * as pdfjsLib from 'pdfjs-dist';
import './App.css';

function HTMLBook({ bookRef }) {
  const [dimensions, setDimensions] = useState({ width: 400, height: 600 });
  const [pages, setPages] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState(null);

  // Set PDF.js worker source
  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
    console.log('PDF.js worker set to /pdf.worker.min.js');
  }, []);

  // Handle PDF file loading
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setError(null);
      console.log('PDF file selected:', file.name);
    } else {
      setError('Please select a valid PDF file.');
      console.error('Invalid file type selected');
    }
  };

  // Load and render PDF
 // Load and render PDF
useEffect(() => {
  const loadPDF = async () => {
    if (!pdfFile) return;

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      console.log('File loaded, processing PDF...');
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      console.log('PDF loaded, number of pages:', pdf.numPages);

      const pageCanvases = [];
      // Loop through all pages
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 4.0 });
        const pixelRatio = window.devicePixelRatio || 1;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width * pixelRatio;
        canvas.height = viewport.height * pixelRatio;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        context.scale(pixelRatio, pixelRatio);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        await page.render({ canvasContext: context, viewport }).promise;
        const imgSrc = canvas.toDataURL('image/png');
        console.log(`Rendered PDF page ${pageNum} as image`);
        pageCanvases.push({ imgSrc, width: viewport.width, height: viewport.height });
      }

      // Set pages: cover, all PDF pages, back cover
      const newPages = [
        <div className="page" data-density="hard" key="cover">
          <h2 className="text-2xl font-bold">Book Cover</h2>
          <p>Welcome to my book!</p>
        </div>,
        ...pageCanvases.map((item, index) => (
          <div className="page" key={`pdf-page-${index + 1}`}>
            <img
              src={item.imgSrc}
              alt={`PDF page ${index + 1}`}
              className="page-content"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        )),
        <div className="page" data-density="hard" key="back-cover">
          <h2 className="text-2xl font-bold">Back Cover</h2>
          <p>Thank you for reading!</p>
        </div>,
      ];
      setPages(newPages);
      console.log('Pages set, total pages:', newPages.length);
    } catch (err) {
      console.error('Error processing PDF:', err);
      setError(`Failed to process PDF: ${err.message}`);
    }
  };

  loadPDF();
}, [pdfFile]);

  // Log pages state after update
  useEffect(() => {
    console.log('Pages state updated, total pages:', pages.length);
  }, [pages]);

  // Handle responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const maxWidth = Math.min(window.innerWidth * 0.9, 800); // Increased to 90%
      const maxHeight = Math.min(window.innerHeight * 0.9, 1200);
      const aspectRatio = 2 / 3; // Width:Height = 2:3

      let newWidth = maxWidth;
      let newHeight = maxWidth / aspectRatio;
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = maxHeight * aspectRatio;
      }

      const roundedDimensions = { width: Math.round(newWidth), height: Math.round(newHeight) };
      setDimensions(roundedDimensions);
      console.log('Dimensions updated:', roundedDimensions);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const nextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
      console.log('Flipped to next page');
    }
  };

  const prevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
      console.log('Flipped to previous page');
    }
  };

  return (
    <div className="book-container">
      <input
        type="file"
        accept="application/pdf"
        className="file-input"
        onChange={handleFileChange}
      />
      {error && <p className="text-center text-red-600">{error}</p>}
      {pages.length > 0 ? (
        <>
          <button className="nav-button prev-button" onClick={prevPage}>
            Previous
          </button>
          <HTMLFlipBook
            width={dimensions.width}
            height={dimensions.height}
            size="fixed"
            minWidth={300}
            maxWidth={800}
            minHeight={400}
            maxHeight={1200}
            showCover={true}
            flippingTime={1000}
            style={{ margin: '20px auto' }}
            ref={bookRef}
          >
            {pages}
          </HTMLFlipBook>
          <button className="nav-button next-button" onClick={nextPage}>
            Next
          </button>
        </>
      ) : (
        <p className="text-center text-gray-600">Please upload a PDF file to view the book.</p>
      )}
    </div>
  );
}

function App() {
  const htmlBookRef = useRef();

  return (
    <div className="App">
      <HTMLBook bookRef={htmlBookRef} />
    </div>
  );
}

export default App; */  