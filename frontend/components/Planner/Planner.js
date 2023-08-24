import Image from 'next/legacy/image';
import BlackHeader from '../BlackHeader/BlackHeader';
import styles from './Planner.module.css';

const Planner = () => {
  return (
    <div className={styles.caixa}>
      <BlackHeader text="Planeador de Viagem" />

      <a href="https://www.carrismetropolitana.pt/planeador/" target="_blank" rel="noopener noreferrer">
        <img src="/images/planner.png" alt="Planeador de viagem" width="100%" height="auto"></img>
      </a>
    </div>
  );
};

export default Planner;
