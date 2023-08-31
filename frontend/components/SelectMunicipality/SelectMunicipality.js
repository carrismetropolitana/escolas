'use client';

import useSWR from 'swr';
import { useMemo } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { CloseButton, Select } from '@mantine/core';
import styles from './SelectMunicipality.module.css';

export default function SelectMunicipality({ selectedMunicipalityCode, onSelectMunicipalityCode }) {
  //

  //
  // A. Fetch data

  const { data: allMunicipalitiesData } = useSWR('https://api.carrismetropolitana.pt/municipalities');

  //
  // B. Transform data

  const allMunicipalitiesDataAsSelectOptions = useMemo(() => {
    // Return empty array if data is not available
    if (!allMunicipalitiesData) return [];
    // Return formatted array for select
    return allMunicipalitiesData.map((item) => ({ value: item.code, label: item.name }));
    //
  }, [allMunicipalitiesData]);

  //
  // C. Handle actions

  const handleClearSelectedMunicipalityCode = () => {
    onSelectMunicipalityCode(null);
  };

  //
  // D. Render components

  return (
    <div className={styles.container}>
      <Select
        aria-label="Filtrar por Município"
        placeholder="Escolha ou digite um Município"
        rightSection={selectedMunicipalityCode ? <CloseButton onClick={handleClearSelectedMunicipalityCode} /> : <IconChevronDown size={18} />}
        nothingFoundMessage={'Município inexistente'}
        data={allMunicipalitiesDataAsSelectOptions}
        value={selectedMunicipalityCode}
        onChange={onSelectMunicipalityCode}
        searchable
      />
    </div>
  );

  //
}
