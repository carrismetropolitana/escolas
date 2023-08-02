import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import styles from './SelectSchool.module.css';
import selectStyles from './selectStyles'; 

import useSchools from './useSchools';


const SelectSchool = ({ municipality, setSchool }) => {

    const schools = useSchools(municipality);
    
    const customNoOptionsMessage = () => `${municipality.label} não tem escolas`;

    return (
        <div className={styles.container}>
            <p>Selecione uma instituição de ensino:</p>

            <Select
                key="schools-key"
                options={schools}
                noOptionsMessage={customNoOptionsMessage}
                menuPlacement="bottom"
                menuPosition="auto" 
                styles={selectStyles} 
                placeholder={`escolha ou digite a instituição`} 
                onChange={setSchool}
            />

        </div >
    );
};

export default SelectSchool;
