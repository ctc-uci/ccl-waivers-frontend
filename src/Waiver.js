import React, { useEffect, useState, useRef } from 'react';
import './waiver.css';

function Waiver() {
  const [pdfService, setPdfService] = useState(null);
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
    if (blob) {
      // Create a link to download the PDF,
      // then programmatically click the link to trigger the download.
      // Immediately removes the link after the click.
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'test.pdf';
      document.body.append(link);
      link.click();
      link.remove();
    } else {
      console.error('Error downloading');
      alert('download failed');
    }
  }

  return (
    <div>
      <h1>This is the waiver page</h1>
      <div id="pdf-viewer">
        <pdf-viewer src="waiver.pdf" ref={pdfViewer} />
      </div>
      <button type="button" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
}

export default Waiver;
