'use client';

import useSWR from 'swr';
import { useMemo } from 'react';
import styles from './SelectMunicipality.module.css';
import Select from 'react-select';
import selectStyles from './selectStyles';

export default function SelectMunicipality({ selectedMunicipality, onSelectMunicipality }) {
  //

  //
  // A. Fetch data

  const { data: allMunicipalitiesData } = useSWR('https://api.carrismetropolitana.pt/municipalities');

  //
  // B. Transform data

  const allMunicipalitiesData_asOptions = useMemo(() => {
    // Return empty array if data is not available
    if (!allMunicipalitiesData) return [];
    // Return formatted array for select
    return allMunicipalitiesData.map((item) => ({ label: item.name, value: item.code }));
    //
  }, [allMunicipalitiesData]);

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <Select
        key="municipalities-key"
        options={allMunicipalitiesData_asOptions}
        onChange={onSelectMunicipality}
        noOptionsMessage={() => 'Município inexistente'}
        menuPlacement="bottom"
        menuPosition="auto"
        styles={selectStyles}
        placeholder="Escolha ou digite um Município"
        value={selectedMunicipality}
      />
    </div>
  );

  //
}
