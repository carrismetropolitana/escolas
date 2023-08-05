import Head from 'next/head';
import Image from "next/legacy/image";
import styles from './layout.module.css';
import Link from 'next/link';

const name = 'Carris Metropolitana';
export const siteTitle = 'Portal das Escolas';

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
            </Head>

            <header className={styles.header}>
                {home ? (
                    <>
                        <Image
                            priority
                            src="/images/carris-metropolitana-fundo-amarelo.svg"
                            height={78}
                            width={220}
                            alt="Logotipo Carris Metropolitana"
                        />
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <Image
                                priority
                                src="/images/carris-metropolitana-fundo-amarelo.svg"
                                height={78}
                                width={220}
                                alt="Logotipo Carris Metropolitana"
                            />
                        </Link>
                        
                    </>
                )}
            </header>

            <main className={styles.main}>
                {children}
            

            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">← Voltar ao início</Link>
                </div>
            )}
            </main>

            <footer  className={styles.footer}>
                <p>Carris Metropolitana</p> 
            </footer>

        </div>


    );
}