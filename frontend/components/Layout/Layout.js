import Head from 'next/head';
import Image from 'next/legacy/image';
import styles from './Layout.module.css';
import AppTopBar from '../AppTopBar/AppTopBar';

export default function Layout({ children, home }) {
  return (
    <div className={styles.layout}>
      <Head>
        <title>Escolas • Carris Metropolitana</title>
        <link rel="icon" href="/images/cm.png" />
        <meta name="description" content="Saiba as linhas que existem perto duma escola" />
        <meta name="og:title" content={'Escolas'} />
      </Head>

      <AppTopBar />

      <div className={styles.container}>
        <header className={styles.header}>
          <Image priority src="/images/logo.png" height={100} width={100} alt="Logotipo Carris Metropolitana próxima das escolas" />
          <Image priority src="/images/carris-metropolitana.svg" height={58} width={180} alt="Logotipo Carris Metropolitana" />
        </header>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
