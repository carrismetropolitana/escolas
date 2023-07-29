import SelectMunicipality from '../SelectMunicipality/SelectMunicipality';
import SelectSchool from '../SelectSchool/SelectSchool';

import styles from './SelectMunicipalityAndSchool.module.css';


const SelectMunicipalityAndSchool = ({municipality, setMunicipality, school, setSchool, setSchoolObj}) => {

    return (
        <>
            <p className={styles.frase} > 
                Saiba mais como chegar, com a Carris Metropolitana, <br></br> à sua escola ou universidade
            </p>

            <main className={styles.main}>
                <SelectMunicipality
                    municipality={municipality}
                    setMunicipality={setMunicipality}
                />

                {/* para renderizar no HTML o nome do municipality */}
                {/* {municipality ? municipality.label : '' }  */}

                <SelectSchool
                    municipality={municipality}
                    setSchool={setSchool}
                />

            </main>
        </>

    );

}

export default SelectMunicipalityAndSchool;




