'use client';

import styles from './SelectMunicipalityAndSchool.module.css';
import SelectMunicipality from '@/components/SelectMunicipality/SelectMunicipality';
import SelectSchool from '@/components/SelectSchool/SelectSchool';
import SelectEducationLevel from '../SelectEducationLevel/SelectEducationLevel';

export default function SelectMunicipalityAndSchool({ selectedMunicipalityCode, onSelectMunicipalityCode, selectedEducationLevels, onSelectEducationLevels, selectedSchool, onSelectSchool }) {
  //

  return (
    <div className={styles.container}>
      <p className={styles.title}>Pesquise as linhas que servem a sua escola ou universidade.</p>
      <div className={styles.filters}>
        <SelectMunicipality selectedMunicipalityCode={selectedMunicipalityCode} onSelectMunicipalityCode={onSelectMunicipalityCode} />
        <SelectEducationLevel selectedEducationLevels={selectedEducationLevels} onSelectEducationLevels={onSelectEducationLevels} />
      </div>
      <SelectSchool selectedMunicipalityCode={selectedMunicipalityCode} selectedEducationLevels={selectedEducationLevels} onSelectSchool={onSelectSchool} />
    </div>
  );
}
