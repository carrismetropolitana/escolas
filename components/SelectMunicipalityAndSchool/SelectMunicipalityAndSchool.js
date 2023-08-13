import React from 'react';
import dynamic from 'next/dynamic';

import styles from './SelectMunicipalityAndSchool.module.css';

// Use dynamic imports with SSR disabled for both SelectMunicipality and SelectSchool
const DynamicSelectMunicipality = dynamic(
  () => import('../SelectMunicipality/SelectMunicipality'),
  { ssr: false }
);

const DynamicSelectSchool = dynamic(
  () => import('../SelectSchool/SelectSchool'),
  { ssr: false }
);

const SelectMunicipalityAndSchool = ({ municipality, setMunicipality, school, setSchool, setSchoolObj }) => {
  return (
    <>
      <p className={styles.frase}>
      Pesquise as linhas que servem a sua escola ou universidade.
      </p>

      <main className={styles.main}>
        <DynamicSelectMunicipality
          municipality={municipality}
          setMunicipality={setMunicipality}
        />

        <DynamicSelectSchool
          municipality={municipality}
          school={school}
          setSchool={setSchool}
        />
      </main>
    </>
  )
}

export default SelectMunicipalityAndSchool;
