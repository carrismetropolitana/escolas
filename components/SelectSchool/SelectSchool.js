import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import styles from './SelectSchool.module.css';
import selectStyles from './selectStyles'; 

import useSchools from './useSchools';


const SelectSchool = ({ municipality, school, setSchool }) => {

    const schools = useSchools(municipality);

    const customNoOptionsMessage = () => municipality ? `${municipality.label} não tem escolas` :  `Escola inexistente`;

    // const [error, setError] = useState(false);

    // const handleInputChange = (inputValue) => {
    //     const exists = schools.some(option => option.value === inputValue);
    //     setError(!exists);
    //   };
    
    return (
        <div className={styles.container}>
            {/* <div>Selecione uma instituição de ensino:</div> */}

            <Select
                key="schools-key"
                placeholder={`Escolha ou digite a instituição`}
                noOptionsMessage={customNoOptionsMessage}
                options={schools}
                // onInputChange={handleInputChange} 
                onChange={setSchool}
                menuPlacement="bottom"
                menuPosition="auto" 
                styles={selectStyles} 
                value={school}
            />
        </div >
    );
};

export default SelectSchool;
