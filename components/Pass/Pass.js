import Image from 'next/image';
import BlackHeader from '../BlackHeader/BlackHeader';
import styles from './Pass.module.css';

const Pass = () => {
  return (
    <div>
      <BlackHeader text='Passe navegante' />

      <a href="https://www.carrismetropolitana.pt/cartoes/" target="_blank" rel="noopener noreferrer">
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/PasseNavegante_.png"
              alt="Passe navegante"
              width={100}
              height={100} 
            />
          </div>
        </div>
      </a>
    </div>
  );
};

export default Pass;
