import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from './SelectDuplo.module.css';
import { customStyles } from './selectStyles';
import { useRouter } from 'next/router';

const SelectDuplo = () => {
    const [municipios, setMunicipios] = useState([]);
    const [selectedMunicipio, setSelectedMunicipio] = useState(null);
    const [escolas, setEscolas] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchMunicipios = async () => {
            try {
                const response = await fetch(
                    'https://cmescola.pythonanywhere.com/municipios',
                );

                const data = await response.json();
                const formattedOptions = data.municipios.map((item) => ({
                    value: item,
                    label: item
                }));
                setMunicipios(formattedOptions);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchMunicipios();
    }, []);

    
    const handleOptionMunicipioChange = (municipio) => {
        setSelectedMunicipio(municipio);
        setEscolas([]); // Reset sub-options

        document.getElementById('escola').innerHTML = '';

        // Simulate fetching sub-options based on selected option
        const fetchEscolas = async () => {
            try {
                const response = await fetch(
                    `https://cmescola.pythonanywhere.com/escolas/${municipio.value}`
                );
                const data = await response.json();
                const formattedOptions = data.escolas.map((item) => ({
                    value: item,
                    label: item
                }));
                setEscolas(formattedOptions);
            } catch (error) {
                console.log('Error fetching sub-options:', error);
            }
        };

        fetchEscolas();
    };


    const handleOptionEscolaChange = (escola) => {
        console.log(escola);
        console.log(escola.value);
        
        router.push(`escola?municipio=${selectedMunicipio.value}&escola=${escola.value}`)  
    };


    const handleClickMunicipio = () => {
        document.getElementById('escola').innerHTML = '';
        setSelectedMunicipio(null);
    };


    return (
        <div className={styles.container}>
            {!selectedMunicipio ?
                (
                    <>
                        <p>Saiba como chegar à sua escola ou universidade com a Carris Metropolitana</p>
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
                            {selectedMunicipio.value}
                        </div>

                        <p>Selecione uma instituição de ensino:</p> 
                        <Select
                            instanceId='InstanciaSelectEscola'
                            options={escolas}
                            menuPlacement="auto" // Adjust the menu placement (top, bottom, auto)
                            menuPosition="fixed" // Adjust the menu position (fixed, absolute, relative)
                            styles={customStyles}
                            placeholder={`selecione ou digite...`}  //  selecione uma instituição em ${selectedOption.value}
                            onChange={handleOptionEscolaChange} />
                    </>
                )
            }

            <div id='escola'></div>
        </div>
    );
};

export default SelectDuplo;
