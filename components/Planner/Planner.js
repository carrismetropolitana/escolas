import Image from 'next/image';
import BlackHeader from '../BlackHeader/BlackHeader';
import styles from './Planner.module.css';

const Planner = () => {
  return (
    <div>
      <BlackHeader text='Planeador de Viagem' />

      <a href="https://www.carrismetropolitana.pt/planeador/" target="_blank" rel="noopener noreferrer">
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/planner.png"
              alt="Planeador de viagem"
              width={100}
              height={100} 
            />
          </div>
        </div>
      </a>
    </div>
  );
};

export default Planner;
