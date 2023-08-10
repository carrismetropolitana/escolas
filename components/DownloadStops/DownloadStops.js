import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faDownload } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

import styles from './DownloadStops.module.css'

const DownloadStops = ({ schoolInfo, municipality, school, stops }) => {

    // spinner while loading
    const [loading, setLoading] = useState(false);
    const handleDownload = () => {
        setLoading(true);
        setTimeout(() => { setLoading(false); }, 6000); // volta a por o loading a false após 4s 
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
    // console.log('urlFolheto', urlFolheto)


    return (
        <div className={styles.item}>

            <div className={styles.text}>
                Descarregue a lista de paragens e linhas aqui:
            </div>


            <div className={styles.button}>
                <a
                    href={pdfUrl}
                    onClick={handleDownload}
                    download
                >        {loading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <FontAwesomeIcon icon={faSpinner} style={{ fontSize: '1rem', height: '1rem' }} spin />
                        <span style={{ marginLeft: '10px' }}>a gerar o PDF...</span>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesomeIcon icon={faDownload} style={{ fontSize: '1rem', height: '1rem' }} />
                        <span style={{ marginLeft: '10px' }}>Download</span>
                    </div>
                )}
                </a>
            </div>

        </div>
    );
}

export default DownloadStops;

