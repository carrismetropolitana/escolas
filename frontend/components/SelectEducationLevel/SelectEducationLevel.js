'use client';

import { IconChevronDown } from '@tabler/icons-react';
import { CloseButton, Select } from '@mantine/core';
import styles from './SelectEducationLevel.module.css';

export default function SelectEducationLevel({ selectedEducationLevel, onSelectEducationLevel }) {
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
    onSelectEducationLevel(null);
  };

  //
  // D. Render components

  return (
    <div className={styles.container}>
      <Select
        aria-label="Filtrar por nível de escolaridade"
        placeholder="Escolha um nível de educação"
        rightSection={selectedEducationLevel ? <CloseButton onClick={handleClearselectedEducationLevel} /> : <IconChevronDown size={18} />}
        data={allEducationLevels}
        value={selectedEducationLevel}
        onChange={onSelectEducationLevel}
        searchable
      />
    </div>
  );

  //
}
