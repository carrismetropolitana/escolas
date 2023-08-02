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

    // console.log('schoolInfo', schoolInfo)
    // console.log('stops', stops)
    // console.log('municipality', municipality)
    // console.log('school', school)

    return (
        <div className={styles.main}>

            <div className={styles.titles}>
                <Titles
                    municipality={schoolInfo ? schoolInfo.municipality_name : schoolInfo}
                    school={school}
                    setSchool={setSchool}
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

                <DownloadStops
                    schoolInfo={schoolInfo}
                    municipality={schoolInfo ? schoolInfo.municipality_name : schoolInfo}
                    school={school}
                    stops={stops}
                />

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
