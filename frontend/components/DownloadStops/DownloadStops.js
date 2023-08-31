'use client';

import BlackHeader from '../BlackHeader/BlackHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faDownload } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

import styles from './DownloadStops.module.css';

export default function DownloadStops({ school_code }) {
  //

  //
  // A. Setup variables

  const [isLoading, setIsLoading] = useState(false);

  //
  // A. Handle actions

  const handleDownloadPdf = async () => {
    if (!window) return;
    try {
      setIsLoading(true);
      const pdfResponse = await fetch('https://escolas.carrismetropolitana.pt/printer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ render_path: `${school_code}/render` }),
      });
      console.log(pdfResponse);
      const pdfData = await pdfResponse.blob();
      const blobUrl = window.URL.createObjectURL(pdfData);
      const anchor = window.document.createElement('a');
      anchor.download = `CarrisMetropolitana-Horarios-Escolas-${school_code}.pdf`;
      anchor.href = blobUrl;
      anchor.click();
      window.URL.revokeObjectURL(blobUrl);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <BlackHeader text="Descarregue PDF" />
      <div className={styles.item}>
        <div className={styles.text}>Descarregue um PDF com a lista de paragens e linhas:</div>

        <div className={styles.button}>
          <a onClick={handleDownloadPdf}>
            {isLoading ? (
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
