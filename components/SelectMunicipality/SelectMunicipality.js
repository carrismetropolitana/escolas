import Select from 'react-select';
import useMunicipalities from './useMunicipalities';

import styles from './SelectMunicipality.module.css';
import selectStyles from './selectStyles'; 


const SelectMunicipality = ({ municipality, setMunicipality }) => {

    const municipalities = useMunicipalities();

    return (
        <div className={styles.container}>
            {/* <div>Selecione um município:</div> */}
            
            {municipalities && (   // renders only with municipalities
                <Select
                    key="municipalities-key"
                    options={municipalities}
                    
                    // executes function setMunicipality(value), 
                    // where value is the selected municipality 
                    onChange={setMunicipality}  
                    
                    menuPlacement="bottom"
                    menuPosition="auto"
                    styles={selectStyles}
                    placeholder="Escolha ou digite um Município"
                    value={municipality}
                />
            )}
        </div>
    );
};

export default SelectMunicipality;
