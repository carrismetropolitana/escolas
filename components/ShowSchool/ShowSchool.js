import Select from 'react-select';
import Titles from '../Titles/Titles'
import Planner from '../Planner/Planner'
import BackHome from '../BackHome/BackHome'
import getStops from './getStops'
import getSchoolInfo from './getSchoolInfo'
import Stops from '../Stops/Stops';
import DownloadStops from '../DownloadStops/DownloadStops'
import Pass from '../Pass/Pass'

// import Mapa from '../Mapa/Mapa';
import styles from './ShowSchool.module.css'

import React, { useEffect, useState, useRef } from 'react';

const ShowSchool = ({ municipality, school, setSchool }) => {

    const schoolInfo = getSchoolInfo(school);
    const stops = getStops(schoolInfo);

    console.log('schoolInfo', schoolInfo)
    console.log('stops', stops)
    
    // const [loading, setLoading] = useState(false);
    // // activate spinner while generating PDF
    // const handleDownload = () => {
    //     setLoading(true);
    //     setTimeout(() => { setLoading(false); }, 2000); // after 2s, sets loading to false  
    // }

    // // Constroi pdfUrl, URL para descarregar PDF
    // const baseUrl = 'http://localhost:5051/generate-pdf';
    // const urlParams = new URLSearchParams({
    //     // url: `http://localhost:3000/folheto?escola=${escola}&paragens=${paragensInfo}`,
    //     url: `http://localhost:3000/folheto?municipio=${municipality.value}&escola=${school.value}`,
    //     school: school,
    // });
    // const pdfUrl = `${baseUrl}?${urlParams.toString()}`;

    return (
        <div className={styles.main}>

            <div className={styles.titles}>
                <Titles
                    municipality={ schoolInfo? schoolInfo.municipality_name : schoolInfo }
                    school={school}
                />
            </div>
            
            <div className={styles.map}>
                Mapa 
            
                    {/* <Mapa
                        latitude={schoolInfo.lat}
                        longitude={schoolInfo.lon}
                        escolaNome={schoolInfo.name}
                        paragens={stops}
                    /> */}
            </div>

            <div className={styles.stops}>
                <Stops
                    stops={stops}
                    school={schoolInfo}
                />
            </div>

            <div className={styles.info}>
                <Planner />

                <DownloadStops />

                <Pass />
            </div>

            <div className={styles.back}>
                <BackHome className={styles.back}
                    setSchool={setSchool}
                />
            </div>
        </div>

    );
};

export default ShowSchool;
