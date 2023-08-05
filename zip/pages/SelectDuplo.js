import React, { useEffect, useState } from 'react';
import SelectMunicipio from '../components/SelectMunicipio/SelectMunicipio'
import SelectEscola from '../components/SelectEscola/SelectEscola'
import styles from './SelectDuplo.module.css';

const SelectDuplo = () => {
    const [municipios, setMunicipios] = useState([]);

    const [selectedMunicipio, setSelectedMunicipio] = useState(null);
    const handleMunicipioChange = (newMunicipio) => {
        setSelectedMunicipio(newMunicipio);
    }

    const [escolas, setEscolas] = useState([]);
    const handleEscolasChange = (newEscolas) => {
        setEscolas(newEscolas);
    }
    
    return (
        <div className={styles.container}>

            <SelectMunicipio selectedMunicipio={selectedMunicipio} handleMunicipioChange={handleMunicipioChange} handleEscolasChange={handleEscolasChange} />

            <SelectEscola selectedMunicipio={selectedMunicipio} escolas={escolas} />

        </div>
    );
};

export default SelectDuplo;
