'use client';

import useSWR from 'swr';
import { Combobox, Highlight, TextInput, useCombobox, Text } from '@mantine/core';
import { useMemo, useState } from 'react';
import styles from './SelectSchool.module.css';
import useSearch from '@/hooks/useSearch';

export default function SelectSchool({ selectedMunicipalityCode, selectedEducationLevels, onSelectSchool }) {
  //

  //
  // A. Setup variables

  const comboboxStore = useCombobox();
  const [searchQuery, setSearchQuery] = useState('');

  //
  // B. Fetch data

  const { data: allSchoolsData } = useSWR('https://api.carrismetropolitana.pt/facilities/schools');

  //
  // C. Transform data

  const allSchoolsSimplified = useMemo(() => {
    // Return empty array if data is not available
    if (!allSchoolsData) return [];
    // Filter out schools without stops on our municipalities
    const filteredOutSchools = allSchoolsData.filter((item) => {
      // Include the school if it is from Barreiro, Cascais or Lisbon
      // even if it does not have associated stops.
      const isFromBarreiro = item.municipality_code === '1504';
      const isFromCascais = item.municipality_code === '1105';
      const isFromLisbon = item.municipality_code === '1106';
      if (isFromBarreiro || isFromCascais || isFromLisbon) return true;
      // If it is from other municipalities, include the school only if it has associated stops
      return item.stops?.length > 0;
      //
    });
    // Keep only the required values
    return filteredOutSchools.map((item) => ({
      code: item.code,
      name: item.name,
      cicles: item.cicles,
      locality: item.locality,
      municipality_code: item.municipality_code,
      municipality_name: item.municipality_name,
    }));
    //
  }, [allSchoolsData]);

  const allSchoolsFilteredByConditions = useMemo(() => {
    // Return empty array if data is not available
    if (!allSchoolsSimplified) return [];
    // Setup a variable to hold filtered results
    let filterResult = allSchoolsSimplified;
    // If a municipality is selected, show schools only from that municipality
    if (selectedMunicipalityCode) {
      filterResult = filterResult.filter((item) => item.municipality_code === selectedMunicipalityCode);
    }
    // If an education level is selected, show schools only from that level
    if (selectedEducationLevels.length) {
      filterResult = filterResult.filter((school) => {
        return selectedEducationLevels.find((level) => {
          return school.cicles?.includes(level);
        });
      });
    }
    // Set filter results
    return filterResult;
    //
  }, [allSchoolsSimplified, selectedMunicipalityCode, selectedEducationLevels]);

  //
  // D. Search

  const allSchoolsDataFilteredBySearchQuery = useSearch(searchQuery, allSchoolsFilteredByConditions, { keys: ['code', 'name', 'locality'] });

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
