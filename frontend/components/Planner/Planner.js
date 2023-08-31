import Image from 'next/image';
import BlackHeader from '../BlackHeader/BlackHeader';
import styles from './Planner.module.css';

const Planner = () => {
  return (
    <div className={styles.container}>
      <BlackHeader text="Planeador de Viagem" />
      <a href="https://www.carrismetropolitana.pt/planeador/" target="_blank" rel="noopener noreferrer">
        <Image priority src="/images/planner.png" height={900} width={670} style={{ width: '100%', height: '100%' }} alt="Logotipo Carris Metropolitana próxima das escolas" />
      </a>
    </div>
  );
};

export default Planner;
