'use client';

import useSWR from 'swr';
import { useMemo } from 'react';
import styles from './SelectMunicipalityAndSchool.module.css';
import SelectMunicipality from '@/components/SelectMunicipality/SelectMunicipality';
import SelectSchool from '@/components/SelectSchool/SelectSchool';
import SelectEducationLevel from '../SelectEducationLevel/SelectEducationLevel';
import SelectSchoolMap from '../SelectSchoolMap/SelectSchoolMap';

export default function SelectMunicipalityAndSchool({ selectedMunicipalityId, onSelectMunicipalityId, selectedEducationLevel, onSelectEducationLevel, onSelectSchool, title }) {
	//

	//
	// B. Fetch data

	const { data: allSchoolsData } = useSWR('https://api.carrismetropolitana.pt/datasets/facilities/schools');

	//
	// C. Transform data

	const allSchoolsSimplified = useMemo(() => {
		// Return empty array if data is not available
		if (!allSchoolsData) return [];
		// Filter out schools without stops on our municipalities
		const filteredOutSchools = allSchoolsData.filter(item => {
			// Include the school if it is from Barreiro, Cascais or Lisbon
			// even if it does not have associated stops.
			const isFromBarreiro = item.municipality_id === '1504';
			const isFromCascais = item.municipality_id === '1105';
			const isFromLisbon = item.municipality_id === '1106';
			if (isFromBarreiro || isFromCascais || isFromLisbon) return true;
			// If it is from other municipalities, include the school only if it has associated stops
			return item.stops?.length > 0;
			//
		});
		// Sort schools by name
		const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
		const sortedSchools = filteredOutSchools.sort((a, b) => collator.compare(a.name, b.name));
		// Keep only the required values
		return sortedSchools.map(item => ({
			id: item.id,
			name: item.name,
			lat: item.lat,
			lon: item.lon,
			cicles: item.cicles,
			locality: item.locality,
			municipality_id: item.municipality_id,
			municipality_name: item.municipality_name,
		}));
		//
	}, [allSchoolsData]);

	const allSchoolsFiltered = useMemo(() => {
		// Return empty array if data is not available
		if (!allSchoolsSimplified) return [];
		// Setup a variable to hold filtered results
		let filterResult = allSchoolsSimplified;
		// If a municipality is selected, show schools only from that municipality
		if (selectedMunicipalityId) {
			filterResult = filterResult.filter(item => item.municipality_id === selectedMunicipalityId);
		}
		// If an education level is selected, show schools only from that level
		if (selectedEducationLevel) {
			filterResult = filterResult.filter(item => item.cicles?.includes(selectedEducationLevel));
			//   filterResult = filterResult.filter((school) => {
			//     return selectedEducationLevel.find((level) => {
			//       return school.cicles?.includes(level);
			//     });
			//   });
		}
		// Set filter results
		return filterResult;
		//
	}, [allSchoolsSimplified, selectedMunicipalityId, selectedEducationLevel]);

	//
	// F. Render components

	return (
		<div className={styles.container}>
			<p className={styles.title}>{title}</p>
			<div className={styles.filters}>
				<SelectMunicipality selectedMunicipalityId={selectedMunicipalityId} onSelectMunicipalityId={onSelectMunicipalityId} />
				<SelectEducationLevel selectedEducationLevel={selectedEducationLevel} onSelectEducationLevel={onSelectEducationLevel} />
			</div>
			<SelectSchool allSchoolsData={allSchoolsFiltered} onSelectSchool={onSelectSchool} />
			<SelectSchoolMap allSchoolsData={allSchoolsFiltered} onSelectSchool={onSelectSchool} />
		</div>
	);
}