import Select from 'react-select';
import useMunicipalities from './useMunicipalities';

import styles from './SelectMunicipality.module.css';
import selectStyles from './selectStyles';

const SelectMunicipality = ({ municipality, setMunicipality }) => {
  const municipalities = useMunicipalities();

  const customNoOptionsMessage = () => `Município inexistente`;

  return (
    <div className={styles.container}>
      {/* <div>Selecione um município:</div> */}

      {municipalities && (
        <Select
          key="municipalities-key"
          options={municipalities}
          onChange={setMunicipality}
          noOptionsMessage={customNoOptionsMessage}
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
