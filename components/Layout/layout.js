import Head from 'next/head';
import Image from "next/legacy/image";
import styles from './layout.module.css';


const name = 'Carris Metropolitana';
export const siteTitle = 'Escolas';

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>

            <Head>
                <title>CM Escolas</title>
                <link rel="icon" href="/cm.png" />
                <meta
                    name="description"
                    content="Saiba as linhas que existem perto duma escola"
                />
                <meta name="og:title" content={siteTitle} />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            </Head>

            <div className={styles.bar}></div>

            <header className={styles.header}>

            <Image
                    priority
                    src="/images/logo.png"
                    height={180}
                    width={180}
                    alt="Logotipo Carris Metropolitana"
                />
                <Image
                    priority
                    src="/images/carris-metropolitana.svg"
                    height={58}
                    width={180}
                    alt="Logotipo Carris Metropolitana"
                />

            </header>

            <main className={styles.main}>

                {children}

            </main>
        </div>


    );
}