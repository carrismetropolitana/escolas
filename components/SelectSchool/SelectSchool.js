import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import styles from './SelectSchool.module.css';
import selectStyles from './selectStyles'; 

import useSchools from './useSchools';


const SelectSchool = ({ municipality, setSchool }) => {

    const schools = useSchools(municipality);
    
    if(schools == [] || schools.length == 0) 
        return null;

    const customNoOptionsMessage = () => `${municipality.label} não tem escolas`;

    return (
        <div className={styles.container}>
            {/* <div>Selecione uma instituição de ensino:</div> */}

            <Select
                key="schools-key"
                options={schools}
                noOptionsMessage={customNoOptionsMessage}
                menuPlacement="bottom"
                menuPosition="auto" 
                styles={selectStyles} 
                placeholder={`Escolha ou digite a instituição`} 
                onChange={setSchool}
            />

        </div >
    );
};

export default SelectSchool;
