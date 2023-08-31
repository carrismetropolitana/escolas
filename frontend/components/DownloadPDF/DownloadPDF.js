'use client';

import BlackHeader from '../BlackHeader/BlackHeader';
import React, { useState } from 'react';
import styles from './DownloadPDF.module.css';
import { IconDownload } from '@tabler/icons-react';
import Loader from '../Loader/Loader';

export default function DownloadPDF({ school_code }) {
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
    <div className={styles.container}>
      <BlackHeader text="Descarregue PDF" />
      <div className={styles.wrapper}>
        <div className={styles.text}>Descarregue um PDF com a lista de paragens e linhas</div>
        {isLoading ? (
          <div className={styles.buttonLoading}>
            <Loader size={18} visible />
            <p>A gerar PDF...</p>
          </div>
        ) : (
          <a className={styles.buttonReady} onClick={handleDownloadPdf}>
            <IconDownload size={20} />
            <p>Descarregar PDF</p>
          </a>
        )}
      </div>
    </div>
  );

  //
}
