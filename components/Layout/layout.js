import Head from 'next/head';
import Image from "next/legacy/image";
import styles from './layout.module.css';


const name = 'Carris Metropolitana';
export const siteTitle = 'Escolas';

export default function Layout({ children, home }) {
    return (
        <div>

            <Head>
                <title>CM Escolas</title>
                <link rel="icon" href="/images/cm.png" />
                <meta
                    name="description"
                    content="Saiba as linhas que existem perto duma escola"
                />
                <meta name="og:title" content={siteTitle} />
            </Head>

            <div className={styles.bar}>
                <a href="//www.tmlmobilidade.pt/">TML</a>
                <a href="//www.carrismetropolitana.pt/" className={styles.active}>Carris Metropolitana</a>
                <a href="//www.navegante.pt/">navegante</a>
            </div>

            <div className={styles.container}>
                <header className={styles.header}>

                    <Image
                        priority
                        src="/images/logo.png"
                        height={100}
                        width={100}
                        alt="Logotipo Carris Metropolitana próxima das escolas"
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

        </div>
    )
}