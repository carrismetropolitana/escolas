import Select from 'react-select';
import Titles from '../Titles/Titles'
import BackHome from '../BackHome/BackHome'
import getStops from './getStops'
import getSchoolInfo from './getSchoolInfo'
import ParagensVizinhas from '../ParagensVizinhas/ParagensVizinhas';
// import Mapa from '../Mapa/Mapa';

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

        <>
            if (school) {

                <main >

                    <Titles
                        municipality={municipality}
                        school={school}
                    />

                    {/* <Mapa
                        latitude={schoolInfo.lat}
                        longitude={schoolInfo.lon}
                        escolaNome={schoolInfo.name}
                        paragens={stops}
                    /> */}

                    <ParagensVizinhas
                        paragens={stops}
                        escola={schoolInfo}
                    />

                    <BackHome
                        setSchool={setSchool}
                    />
                </main>

            }
        </>


    );
};

export default ShowSchool;
