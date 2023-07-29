import Select from 'react-select';
import useMunicipalities from './useMunicipalities';

import styles from './SelectMunicipality.module.css';
import selectStyles from './selectStyles'; // Adjust the path based on the location of your customStyles.js file.


const SelectMunicipality = ({ municipality, setMunicipality }) => {

    const municipalities = useMunicipalities();

    return (
        <div className={styles.container}>
            <p>Selecione um município:</p>
            
            {municipalities && (   // renders only with municipalities
                <Select
                    options={municipalities}
                    
                    // executes setMunicipality(value), where value is the selected municipality 
                    onChange={setMunicipality}  
                    
                    menuPlacement="bottom"
                    menuPosition="auto"
                    styles={selectStyles}
                    placeholder="escolha ou digite o município"
                    value={municipality}
                />
            )}
        </div>
    );
};

export default SelectMunicipality;
