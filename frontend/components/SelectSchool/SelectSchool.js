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

	const allSchoolsDataFilteredBySearchQuery = useSearch(searchQuery, allSchoolsData, { keys: ['id', 'name', 'locality'] });

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
						aria-label='Selecione uma instituição'
						placeholder='Procure pelo nome da instituição'
						value={searchQuery}
						size='lg'
						rightSection={<Combobox.Chevron />}
						onChange={handleSearchQueryChange}
						onClick={() => comboboxStore.openDropdown()}
						onFocus={() => comboboxStore.openDropdown()}
						onBlur={() => comboboxStore.closeDropdown()}
					/>
				</Combobox.Target>

				<Combobox.Dropdown>
					<Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
						{allSchoolsDataFilteredBySearchQuery.length === 0 ?
							<Combobox.Empty>Nenhuma instituição encontrada</Combobox.Empty> :
							allSchoolsDataFilteredBySearchQuery.map(item => <Combobox.Option k={item.id} value={item.id}>
								<div>
									<Highlight highlight={searchQuery} fz='sm' fw={500}>
										{item.name}
									</Highlight>
									<Text fz='xs'>{item.municipality_name}</Text>
								</div>
							</Combobox.Option>)
						}
					</Combobox.Options>
				</Combobox.Dropdown>
			</Combobox>
		</div>
	);
}