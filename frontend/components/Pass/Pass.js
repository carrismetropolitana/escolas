import Image from 'next/legacy/image';
import BlackHeader from '../BlackHeader/BlackHeader';
import styles from './Pass.module.css';

const Pass = () => {
  return (
    <div className={styles.caixa}>
      <BlackHeader text="Passe navegante" />

      <a href="https://www.carrismetropolitana.pt/cartoes/" target="_blank" rel="noopener noreferrer">
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img src="/images/PasseNavegante_.png" alt="Passe navegante" width="100%" height="auto" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default Pass;
