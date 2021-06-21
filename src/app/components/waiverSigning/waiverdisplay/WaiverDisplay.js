import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './waiverDisplay.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import config from '../../../../config';
import ConfirmationModal from '../confirmationModal/ConfirmationModal';

function WaiverDisplay({ match }) {
  const history = useHistory();
  const [pdfService, setPdfService] = useState(null);
  const [submitReady, setSubmitReady] = useState(false);
  // const [isSuccess, setSuccess] = useState(sessionStorage.getItem('waiversuccess') || false);
  const [template, setTemplate] = useState('');
  // const [isLoading, setIsLoading] = useState(true);

  const pdfViewer = useRef(null);
  const getPDF = () => {
    setTemplate(`https://publicwaivers.s3-us-west-1.amazonaws.com/templates/${match.params.id}.pdf`);
    // setIsLoading(false);
  };

  useEffect(() => {
    getPDF();
    // OnLoad, PDFViewer emits a reference to its pdfService.
    // Save the reference to the pdfService so we can use it later.
    // List of functions provided by the pdfService are listed here:
    // https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/master/projects/ngx-extended-pdf-viewer/src/lib/ngx-extended-pdf-viewer.service.ts
    pdfViewer.current.addEventListener('service', (event) => {
      setPdfService(event.detail);
    });
  });
  // Download PDF (demo)
  //
  // The first line is how we fetch the pdf as a blob.
  // Instead of downloading the blob, we could send it off to a server instead.
  // This is just a demo showing that the blob is generated correctly.
  async function sendPDF(name) {
    let blob = null;
    try {
      const formData = new FormData();
      blob = await pdfService.getCurrentDocumentAsBlob();
      formData.append('file', blob);
      formData.append('name', name);
      const axiosConfig = {
        headers: {
          'content-type': 'multipart/form-data',
        },
        withCredentials: true,
      };
      await axios.post(`${config.apiUrl}/waivers`, formData, axiosConfig);
      history.push('/waiverSuccess');
    } catch (err) {
      // TODO: display an alert
      // eslint-disable-next-line no-console
      console.log(err);
    }

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
    <>
      <div className="waiver-screen-background">
        <div className="pdf-viewer">
          <pdf-viewer src={template} ref={pdfViewer} />
        </div>
        {submitReady ? (
          <ConfirmationModal sendPDF={sendPDF} />
        ) : (
          <button type="button" className="waiver-submit-button" onClick={postPDF}>
            <h3>I have filled out the pdf</h3>
          </button>
        )}
      </div>
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
