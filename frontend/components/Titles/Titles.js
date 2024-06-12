'use client';

import { useRouter } from 'next/navigation';
import styles from './Titles.module.css';

export default function Titles({ municipality_name, school_name }) {
	//

	//
	// A. Setup variables

	const router = useRouter();

	//
	// B. Handle actions

	const handleClick = () => {
		router.push('/');
	};

	//
	// C. Render components

	return (
		<div className={styles.container} onClick={handleClick}>
			<div className={styles.schoolName}>{school_name}</div>
			<div className={styles.municipalityName}>{municipality_name}</div>
		</div>
	);

	//
}