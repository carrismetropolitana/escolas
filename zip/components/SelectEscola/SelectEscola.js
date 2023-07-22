import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import styles from './SelectEscola.module.css';
import { customStyles } from './selectStyles';
import { useRouter } from 'next/router';

const SelectEscola = ({ selectedMunicipio, escolas }) => {

    const router = useRouter();

    const handleOptionEscolaChange = (escola) => {

        console.log('escola',escola);
        console.log('escola value: ',escola.value);


        router.push(`escola?escola=${escola.value}`)
    };

    return (
        <div className={styles.container}>
            {selectedMunicipio && (
                <>

                    <p>Selecione uma instituição de ensino:</p>
                    <Select
                        instanceId='InstanciaSelectEscola'
                        options={escolas}
                        menuPlacement="auto" // Adjust the menu placement (top, bottom, auto)
                        menuPosition="fixed" // Adjust the menu position (fixed, absolute, relative)
                        styles={customStyles}
                        placeholder={`selecione ou digite...`}  //  selecione uma instituição em ${selectedOption.value}
                        onChange={handleOptionEscolaChange} />
                    <div id='escola'></div>
                </>
            )
            }
        </div >
    );
};

export default SelectEscola;
