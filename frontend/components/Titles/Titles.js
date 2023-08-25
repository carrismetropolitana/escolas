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
    <header className={styles.header}>
      <div className={styles.municipality} onClick={handleClick}>
        {municipality_name}
      </div>

      <div className={styles.school} onClick={handleClick}>
        {school_name}
      </div>
    </header>
  );

  //
}
