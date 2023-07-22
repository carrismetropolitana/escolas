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
                    'https://cmescola.pythonanywhere.com/municipios',
                );

                const data = await response.json();
                const formattedOptions = data.municipios.map((item) => ({
                    label: item.nome,
                    value: item.id
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
                console.log('municipio', municipio)
                const response = await fetch(
                    `https://cmescola.pythonanywhere.com/escolas/${municipio.value}`
                );
                const data = await response.json();
                const formattedOptions = data.escolas.map((item) => ({
                    label: item.nome,
                    value: item.id
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
