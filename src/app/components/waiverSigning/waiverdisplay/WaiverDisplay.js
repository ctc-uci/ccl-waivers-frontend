import React, { useEffect, useState } from 'react';
import './waiverDisplay.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import config from '../../../../config';
import ConfirmationModal from '../confirmationModal/ConfirmationModal';
import WaiverSuccess from '../waiversuccess/WaiverSuccess';
import Spinner from '../../loadingSpinner/spinner';

function WaiverDisplay({ match }) {
  const [pdfService, setPdfService] = useState(null);
  const [submitReady, setSubmitReady] = useState(false);
  const [isSuccess, setSuccess] = useState(localStorage.getItem('waiversuccess') || false);
  const [pdf, setPDF] = useState(null);
  const [template, setTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const pdfViewer = useRef(null);

  const getPDF = async () => {
    const res = await axios.get(`${config.apiUrl}/templates/${match.params.id}`, {
      withCredentials: true,
    });
    setTemplate(res.data[0].temporaryDownloadLink);
    setIsLoading(false);
  };

  const preparePdfService = (pdfViewer) => {
    if (pdfViewer != null) {
      // OnLoad, PDFViewer emits a reference to its pdfService.
      // Save the reference to the pdfService so we can use it later.
      // List of functions provided by the pdfService are listed here:
      // https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/master/projects/ngx-extended-pdf-viewer/src/lib/ngx-extended-pdf-viewer.service.ts
      pdfViewer.addEventListener('service', (event) => {
        setPdfService(event.detail);
      });
    }
  };

  useEffect(() => {
    getPDF();
  }, []);
  // Download PDF (demo)
  //
  // The first line is how we fetch the pdf as a blob.
  // Instead of downloading the blob, we could send it off to a server instead.
  // This is just a demo showing that the blob is generated correctly.
  async function downloadPDF() {
    console.log('calling inside download pdf');
    console.log(pdfService);
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

  async function sendPDF() {
    const temp = await downloadPDF();
    setPDF(temp);
    localStorage.setItem('waiversuccess', true);
    setSuccess(true);
  }

  return (
    <>
      {isSuccess ? (
        <WaiverSuccess pdf={pdf} />
      ) : (
        <div className="waiver-screen-background">
          {isLoading ? (
            <Spinner className="sk-center" />
          ) : (
            <>
              <div className="pdf-viewer">
                <pdf-viewer src={template} ref={preparePdfService} />
              </div>
              {submitReady ? (
                <ConfirmationModal sendPDF={sendPDF} />
              ) : (
                <button type="button" className="waiver-submit-button" onClick={postPDF}>
                  <h3>I have filled out the pdf</h3>
                </button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

WaiverDisplay.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default WaiverDisplay;
