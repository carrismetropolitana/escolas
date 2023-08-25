'use client';

import styles from './SelectMunicipalityAndSchool.module.css';
import SelectMunicipality from '@/components/SelectMunicipality/SelectMunicipality';
import SelectSchool from '@/components/SelectSchool/SelectSchool';

export default function SelectMunicipalityAndSchool({ selectedMunicipality, onSelectMunicipality, selectedSchool, onSelectSchool }) {
  //

  return (
    <>
      <p className={styles.frase}>Pesquise as linhas que servem a sua escola ou universidade.</p>
      <main className={styles.main}>
        <SelectMunicipality selectedMunicipality={selectedMunicipality} onSelectMunicipality={onSelectMunicipality} />
        <SelectSchool selectedMunicipality={selectedMunicipality} selectedSchool={selectedSchool} onSelectSchool={onSelectSchool} />
      </main>
    </>
  );
}
