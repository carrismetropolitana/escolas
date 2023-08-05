import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faDownload } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

import styles from './DownloadStops.module.css'

const DownloadStops = ({ schoolInfo, municipality, school, stops }) => {


    // spinner while loading
    const [loading, setLoading] = useState(false);
    const handleDownload = () => {
        setLoading(true);
        setTimeout(() => { setLoading(false); }, 2000); // volta a por o loading a false após 1s 
    };


    // URL para descarregar PDF
    const urlBase = 'http://localhost:5052/generate-pdf';
    const urlFolheto = `http://localhost:3000/folheto?schoolCode=${schoolInfo?.code}`;
    const urlParams = new URLSearchParams({
        url: urlFolheto,
        schoolName: schoolInfo?.name
    });

    const pdfUrl = `${urlBase}?${urlParams.toString()}`;

    // console.log('pdfUrl', pdfUrl)

    return (
        <div className={styles.item}>

            <div className={styles.text}>
                Descarregue a lista de paragens e linhas aqui:
            </div>

            <a
                href={pdfUrl}
                onClick={handleDownload}
                download
            >
                <div className={styles.button}>
                    {loading ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                            <FontAwesomeIcon icon={faSpinner} style={{ fontSize: '1rem', height: '1rem' }} spin />
                            <span style={{ marginLeft: '10px' }}>a gerar o PDF...</span>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faDownload} /> 
                            <span style={{ marginLeft: '10px' }}>Download</span>
                        </div>
                    )}
                </div>
            </a>
        </div>
    );
}

export default DownloadStops;

