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
                    'https://api.carrismetropolitana.pt/facilities',
                );

                const data = await response.json();

                const municipalityNamesSet = new Set();

                // Loop through the data and add each municipality_name to the Set
                data.forEach(item => {
                  if (item.municipality_name) {
                    municipalityNamesSet.add(item.municipality_name);
                  }
                });
                
                // Convert the Set to an array to get the list of unique municipality_names
                const municipalityNamesArray = Array.from(municipalityNamesSet);
                
                const formattedOptions = municipalityNamesArray.map((item) => ({
                    label: item,
                    value: item,
                }));

                setMunicipios(formattedOptions);
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
                const data = await response.json();
                
                const schools = data.filter((item) => item.type === 'school' && item.municipality_name === municipio.value);
                
                const formattedOptions = schools.map((item) => ({
                    label: item.name,
                    value: item.name
                }));

                handleEscolasChange(formattedOptions);

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
