import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from './SelectDuplo.module.css';
import { customStyles } from './selectStyles';
import { useRouter } from 'next/router';

const SelectMunicipio = () => {

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [subOptions, setSubOptions] = useState([]);
    const router = useRouter();

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

        document.getElementById('escola').innerHTML = '';

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
                setEscola('selecione uma escola');
            } catch (error) {
                console.log('Error fetching sub-options:', error);
            }
        };

        fetchSubOptions();
    };

    return (
        <>
            <p>Saiba como chegar à sua escola ou universidade com a Carris Metropolitana</p>
            <Select
                instanceId='InstanciaSelectMunicipio'
                options={options}
                onChange={handleOptionMunicipioChange}
                menuPlacement="auto" // Adjust the menu placement (top, bottom, auto)
                menuPosition="fixed" // Adjust the menu position (fixed, absolute, relative)
                styles={customStyles}
                placeholder="clique para selecionar um município"
            />
        </>
    );
}