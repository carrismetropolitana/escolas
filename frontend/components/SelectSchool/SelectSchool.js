'use client';

import { Combobox, Highlight, TextInput, useCombobox, Text } from '@mantine/core';
import { useState } from 'react';
import styles from './SelectSchool.module.css';
import useSearch from '@/hooks/useSearch';

export default function SelectSchool({ allSchoolsData, onSelectSchool }) {
  //

  //
  // A. Setup variables

  const comboboxStore = useCombobox();
  const [searchQuery, setSearchQuery] = useState('');

  //
  // D. Search

  const allSchoolsDataFilteredBySearchQuery = useSearch(searchQuery, allSchoolsData, { keys: ['code', 'name', 'locality'] });

  //
  // E. Handle actions

  const handleSearchQueryChange = ({ currentTarget }) => {
    setSearchQuery(currentTarget.value);
    comboboxStore.updateSelectedOptionIndex();
    comboboxStore.openDropdown();
  };

  //
  // F. Render components

  return (
    <div className={styles.container}>
      <Combobox onOptionSubmit={onSelectSchool} store={comboboxStore}>
        <Combobox.Target>
          <TextInput
            aria-label="Pick value or type anything"
            placeholder="Procure pelo nome da escola"
            value={searchQuery}
            size="lg"
            rightSection={<Combobox.Chevron />}
            onChange={handleSearchQueryChange}
            onClick={() => comboboxStore.openDropdown()}
            onFocus={() => comboboxStore.openDropdown()}
            onBlur={() => comboboxStore.closeDropdown()}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
            {allSchoolsDataFilteredBySearchQuery.length === 0 ? (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            ) : (
              allSchoolsDataFilteredBySearchQuery.map((item) => (
                <Combobox.Option key={item.code} value={item.code}>
                  <div>
                    <Highlight highlight={searchQuery} fz="sm" fw={500}>
                      {item.name}
                    </Highlight>
                    <Text fz="xs">{item.municipality_name}</Text>
                  </div>
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}
