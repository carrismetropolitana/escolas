import Select from 'react-select';
import useMunicipalities from './useMunicipalities';
import styles from './SelectMunicipality.module.css';


const SelectMunicipality = ({ municipality, setMunicipality }) => {

    const municipalities = useMunicipalities();

    return (
        <div className={styles.container}>
            <p>Saiba mais como chegar, com a Carris Metropolitana, <br></br> à sua escola ou universidade</p>
            
            {municipalities && (   // renders only with municipalities
                <Select
                    options={municipalities}
                    onChange={setMunicipality}  // will use as argument the value of the selected municipality: setMunicipality(value)
                    menuPlacement="auto"
                    menuPosition="auto"
                    className={styles.select}
                    placeholder="selecione um município"
                    value={municipality}
                />
            )}
        </div>
    );
};

export default SelectMunicipality;
