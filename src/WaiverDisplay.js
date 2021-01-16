import React, { useEffect, useState, useRef } from 'react';
import './waiverDisplay.css';
import ConfirmationModal from './components/ConfirmationModal';

function WaiverDisplay() {
  const [pdfService, setPdfService] = useState(null);
  const [submitReady, setSubmitReady] = useState(false);
  const pdfViewer = useRef(null);
  useEffect(() => {
    // OnLoad, PDFViewer emits a reference to its pdfService.
    // Save the reference to the pdfService so we can use it later.
    // List of functions provided by the pdfService are listed here:
    // https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/master/projects/ngx-extended-pdf-viewer/src/lib/ngx-extended-pdf-viewer.service.ts
    pdfViewer.current.addEventListener('service', (event) => { setPdfService(event.detail); });
  });
  // Download PDF (demo)
  //
  // The first line is how we fetch the pdf as a blob.
  // Instead of downloading the blob, we could send it off to a server instead.
  // This is just a demo showing that the blob is generated correctly.
  async function downloadPDF() {
    const blob = await pdfService.getCurrentDocumentAsBlob();
    return blob;
  }

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [submitReady]);

  function postPDF() {
    setSubmitReady(true);
  }

  return (
    <div className="waiver-screen-background">
      <div className="waiver-screen-title">
        <h1 className="waiver-screen-text">This is the waiver page</h1>
      </div>
      <div className="pdf-viewer">
        <pdf-viewer src="waiver.pdf" ref={pdfViewer} />
      </div>
      {submitReady ? (<ConfirmationModal pdfRef={downloadPDF} />) : (
        <button type="button" className="waiver-submit-button" onClick={postPDF}>
          <h3>I have filled out the pdf</h3>
        </button>
      )}
    </div>
  );
}

export default WaiverDisplay;
