import BlackHeader from '../BlackHeader/BlackHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faDownload } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

import styles from './DownloadStops.module.css';

export default function DownloadStops({ schoolInfo, municipality, school, stops }) {
  // spinner while loading
  const [loading, setLoading] = useState(false);
  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 6000); // volta a por o loading a false após 4s
  };

  // URL para descarregar PDF
  const urlBase = '/printer/';
  const urlParams = new URLSearchParams({
    school_code: schoolInfo?.code,
  });

  const pdfUrl = `${urlBase}?${urlParams.toString()}`;

  console.log('pdfUrl', pdfUrl);

  return (
    <>
      <BlackHeader text="Descarregue PDF" />
      <div className={styles.item}>
        <div className={styles.text}>Descarregue um PDF com a lista de paragens e linhas:</div>

        <div className={styles.button}>
          <a href={pdfUrl} onClick={handleDownload}>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faSpinner} style={{ fontSize: '1rem', height: '1rem' }} spin />
                <span style={{ marginLeft: '10px' }}>A gerar o PDF...</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faDownload} style={{ fontSize: '1rem', height: '1rem' }} />
                <span style={{ marginLeft: '10px' }}>Descarregar PDF</span>
              </div>
            )}
          </a>
        </div>
      </div>
    </>
  );

  //
}
