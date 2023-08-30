'use client';

import { IconChevronDown } from '@tabler/icons-react';
import { CloseButton, Select, MultiSelect } from '@mantine/core';
import styles from './SelectEducationLevel.module.css';

export default function SelectEducationLevel({ selectedEducationLevels, onSelectEducationLevels }) {
  //

  //
  // A. Setup variables

  const allEducationLevels = [
    { value: 'pre_school', label: 'Pré-escolar' },
    { value: 'basic_1', label: '1º Ciclo' },
    { value: 'basic_2', label: '2º Ciclo' },
    { value: 'basic_3', label: '3º Ciclo' },
    { value: 'high_school', label: 'Secundário' },
    { value: 'professional', label: 'Ensino Profissional' },
    { value: 'special', label: 'Ensino Especial' },
    { value: 'artistic', label: 'Ensino Artístico' },
    { value: 'university', label: 'Universidade' },
    { value: 'other', label: 'Outros' },
  ];

  //
  // C. Handle actions

  const handleClearselectedEducationLevel = () => {
    onSelectEducationLevels([]);
  };

  //
  // D. Render components

  return (
    <div className={styles.container}>
      <MultiSelect
        label="Filtrar por nível de escolaridade"
        placeholder="Escolha um nível de educação"
        rightSection={selectedEducationLevels?.length > 0 ? <CloseButton onClick={handleClearselectedEducationLevel} /> : <IconChevronDown size={18} />}
        data={allEducationLevels}
        value={selectedEducationLevels}
        onChange={onSelectEducationLevels}
        searchable
      />
    </div>
  );

  //
}
