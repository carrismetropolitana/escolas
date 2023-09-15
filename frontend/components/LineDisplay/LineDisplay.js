'use client';

import useSWR from 'swr';
import styles from './LineDisplay.module.css';

export function LineBadge({ short_name, color, text_color }) {
  return (
    <div className={styles.badge} style={{ backgroundColor: color, color: text_color }}>
      {short_name || '• • •'}
    </div>
  );
}

export function LineName({ name }) {
  return <div className={styles.name}>{name}</div>;
}

export default function LineDisplay({ route_code }) {
  //

  //
  // A. Fetch data

  const { data: routeData } = useSWR(`https://api.carrismetropolitana.pt/routes/${route_code}`);

  //
  // B. Handle actions

  const handleClick = () => {
    const websiteURL = `https://www.carrismetropolitana.pt/horarios/?route_short_name=${routeData.short_name}&date=&route_id=${routeData.code}`;
    window.open(websiteURL, '_blank', 'noopener,noreferrer');
  };

  //
  // C. Render components

  return (
    routeData && (
      <div className={styles.container} onClick={handleClick}>
        <LineBadge short_name={routeData.short_name} color={routeData.color} text_color={routeData.text_color} />
        <LineName name={routeData.long_name} />
      </div>
    )
  );

  //
}
