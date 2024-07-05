'use client';

import { useRouter } from 'next/navigation';
import styles from './Titles.module.css';

export default function Titles({ municipality_name, school_name, goHome }: { municipality_name: string, school_name: string, goHome?: boolean }) {
	//

	//
	// A. Setup variables

	const router = useRouter();

	//
	// B. Handle actions

	const handleClick = () => {
		if (goHome) router.push('/');
	};

	//
	// C. Render components

	return (
		<div className={styles.container} onClick={handleClick} data-clickable={!!goHome}>
			<div className={styles.schoolName}>{school_name}</div>
			<div className={styles.municipalityName}>{municipality_name}</div>
		</div>
	);

	//
}