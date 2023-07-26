import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import styles from './SelectSchool.module.css';
import { customStyles } from './selectStyles';
import { useRouter } from 'next/router';
import useSchools from './useSchools';


const SelectSchool = ({ municipality, setSchool }) => {

    const schools = useSchools(municipality);

    const router = useRouter();

    const handleOptionSchoolChange = (school) => {
        router.push(
            `school?municipality=${municipality}&school=${school.value}`
        );
    };


    const municipalityPlaceholder = municipality
        ? `em ${municipality.label}`
        : ''

    return (
        <div className={styles.container}>
            <p>Selecione uma instituição de ensino:</p>

            <Select
                options={schools}
                menuPlacement="auto"
                menuPosition="fixed" 
                styles={customStyles}
                placeholder={`selecione uma instituição ${municipalityPlaceholder}`} 
                onChange={handleOptionSchoolChange}
            />

        </div >
    );
};

export default SelectSchool;
