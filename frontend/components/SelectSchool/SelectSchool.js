'use client';

import useSWR from 'swr';
import { useMemo } from 'react';
import styles from './SelectSchool.module.css';
import Select from 'react-select';
import selectStyles from './selectStyles';

export default function SelectSchool({ selectedMunicipality, selectedSchool, onSelectSchool }) {
  //

  //
  // A. Fetch data

  const { data: allSchoolsData } = useSWR('https://api.carrismetropolitana.pt/facilities/schools');

  //
  // B. Transform data

  const allSchoolsData_asOptions = useMemo(() => {
    // Return empty array if data is not available
    if (!allSchoolsData) return [];
    // If a municipality is selected, show schools only from that municipality
    let schoolsFilteredByMunicipality = allSchoolsData;
    if (selectedMunicipality) schoolsFilteredByMunicipality = allSchoolsData.filter((item) => item.municipality_code === selectedMunicipality.value);
    // Return formatted array for select
    return schoolsFilteredByMunicipality.map((item) => ({ label: item.name, value: item.code }));
    //
  }, [allSchoolsData, selectedMunicipality]);

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <Select
        key="schools-key"
        placeholder={`Escolha ou digite a instituição`}
        noOptionsMessage={() => (selectedMunicipality ? `${selectedMunicipality.label} não tem escolas` : `Escola inexistente`)}
        options={allSchoolsData_asOptions}
        onChange={onSelectSchool}
        menuPlacement="bottom"
        menuPosition="auto"
        styles={selectStyles}
        value={selectedSchool}
      />
    </div>
  );
}
