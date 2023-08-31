import Image from 'next/image';
import BlackHeader from '../BlackHeader/BlackHeader';
import styles from './Pass.module.css';

const Pass = () => {
  return (
    <div className={styles.caixa}>
      <BlackHeader text="Passe navegante" />

      <a href="https://www.carrismetropolitana.pt/cartoes/" target="_blank" rel="noopener noreferrer">
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image priority src="/images/PasseNavegante.png" width={852} height={602} style={{ width: '100%', height: '100%' }} alt="Passe navegante" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default Pass;
