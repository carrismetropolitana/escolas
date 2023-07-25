import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import styles from './SelectMunicipio.module.css';
import { customStyles } from './selectStyles';


const SelectMunicipio = ({ selectedMunicipio, handleMunicipioChange, handleEscolasChange }) => {

    const [municipios, setMunicipios] = useState([]);

    // descarrega da API a lista de municipios 
    useEffect(() => {
        const fetchMunicipios = async () => {
            try {
                const response = await fetch(
                    'https://api.carrismetropolitana.pt/municipalities',
                );

                const data = await response.json();

                const municipalityOptions = data.map((item) => ({
                    label: item.name,
                    value: item.code,
                }));

                setMunicipios(municipalityOptions);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchMunicipios();
    }, []);


    // altera o municipio escolhido
    const handleOptionMunicipioChange = (municipio) => {
        handleMunicipioChange(municipio);

        const fetchEscolas = async () => {
            try {
                const response = await fetch(
                    `https://api.carrismetropolitana.pt/facilities`
                );
                const facilities = await response.json();
                
                const schools = facilities.filter((facility) => facility.type === 'school' && facility.municipality_name == municipio.label);
                
                console.log(schools)
                const schoolOptions = schools.map((item) => ({
                    label: item.name,
                    value: item.code
                }));

                handleEscolasChange(schoolOptions);

            } catch (error) {
                console.log('Error fetching sub-options:', error);
            }
        };

        fetchEscolas();

    };

    // apaga municipio escolhido, mostrando select municipio
    const handleClickMunicipio = () => {
        handleMunicipioChange(null);
    };

    return (
        <div className={styles.container}>

            {!selectedMunicipio ?
                (
                    <>
                        <p>Saiba mais como chegar à sua escola <br></br>ou universidade com a Carris Metropolitana</p>
                        <Select
                            instanceId='InstanciaSelectMunicipio'
                            options={municipios}
                            onChange={handleOptionMunicipioChange}
                            menuPlacement="auto" // Adjust the menu placement (top, bottom, auto)
                            menuPosition="fixed" // Adjust the menu position (fixed, absolute, relative)
                            styles={customStyles}
                            placeholder="selecione um município"
                        />
                    </>
                )
                :
                (
                    <>
                        <p>Municipio selecionado</p>

                        <div
                            className={styles.municipioSelecionado}
                            onClick={handleClickMunicipio}
                        >
                            {selectedMunicipio.label}
                        </div>
                    </>
                )
            }

        </div>
    );
};

export default SelectMunicipio;
