'use client';

import { useEffect, useMemo } from 'react';
import styles from './NoServiceMessage.module.css';
import { Divider } from '@mantine/core';

export default function NoServiceMessage({ school_name, municipality_code, municipality_name }) {
  //

  //
  // A. Setup variables

  const otherOperators = {
    1504: { operator_name: 'TCB', operator_website: 'https://www.tcbarreiro.pt', operator_phone: '+351 212 068 592' },
    1105: { operator_name: 'MobiCascais', operator_website: 'https://mobi.cascais.pt/geral/nova-rede-municipal-horarios-percursos-das-linhas-municipais', operator_phone: '+351 800 203 186' },
    1106: { operator_name: 'Carris Municipal', operator_website: 'https://www.carris.pt', operator_phone: '+351 213 613 000' },
  };

  //
  // B. Transform data

  const messages = useMemo(() => {
    return {
      title: `A Carris Metropolitana actua apenas parcialmente em ${municipality_name}.`,
      subtitle: `Sugerimos que consulte o operador local para mais detalhes.`,
      ...otherOperators[municipality_code],
    };
  }, [municipality_code, municipality_name]);

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <p className={styles.title}>{messages.title}</p>
      <p className={styles.subtitle}>{messages.subtitle}</p>
      <Divider />
      <p className={styles.operatorName}>{messages.operator_name}</p>
      <a className={styles.operatorPhone} href={`tel:${messages.operator_phone}`}>
        {messages.operator_phone}
      </a>
      <a className={styles.operatorWebsite} href={messages.operator_website} target="__blank">
        Visitar Website
      </a>
    </div>
  );
}
