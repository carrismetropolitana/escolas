import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from './SelectDuplo.module.css';
import { customStyles } from './selectStyles';

const SelectMunicipio = () => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [subOptions, setSubOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://cmescola.pythonanywhere.com/municipios',
                );

                const data = await response.json();
                const formattedOptions = data.municipios.map((item) => ({
                    value: item,
                    label: item
                }));
                setOptions(formattedOptions);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const handleOptionMunicipioChange = (option) => {
        setSelectedOption(option);
        setSubOptions([]); // Reset sub-options

        // Simulate fetching sub-options based on selected option
        const fetchSubOptions = async () => {
            try {
                const response = await fetch(
                    `https://cmescola.pythonanywhere.com/escolas/${option.value}`
                );
                const data = await response.json();
                const formattedSubOptions = data.escolas.map((item) => ({
                    value: item,
                    label: item
                }));
                setSubOptions(formattedSubOptions);
            } catch (error) {
                console.log('Error fetching sub-options:', error);
            }
        };

        fetchSubOptions();
    };


    const handleOptionEscolaChange = (option) => {
        document.getElementById('escola').innerHTML = option.label;
    };


    return (
        <div className={styles.container}>
            {!selectedOption ?
                (<Select
                    instanceId='InstanciaSelectMunicipio'
                    options={options}
                    onChange={handleOptionMunicipioChange}
                    styles={customStyles}
                    placeholder="selecione um município"
                />
                )
                :
                (
                <>
                <p>Municipio selecionado</p>
                <div className={styles.municipioSelecionado}>{selectedOption.value}</div>
                <Select
                        instanceId='InstanciaSelectEscola'
                        value={fraseMunicipio}
                        options={subOptions}
                        styles={customStyles}
                        placeholder={`selecione uma instituição em ${selectedOption.value}`}
                        onChange={handleOptionEscolaChange} /></>
                )
            }

            <div id='escola'></div>
        </div>
    );
};

export default SelectDuplo;
