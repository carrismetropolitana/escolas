import Layout, { siteTitle } from '../components/layout';
import SelectRouteOfStop from './SelectRouteOfStop'
import SelectDuplo from './SelectDuplo'
import utilStyles from '../styles/utils.module.css'; // não usado
import styles from '../styles/Home.module.css'; // não usado
import Link from 'next/link';

import Head from 'next/head';
import Script from 'next/script';

export default function Home() {

  return (
    <Layout home>

      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/cm.png" />
      </Head>

      <main >
        

        <SelectDuplo />

      </main>

    </Layout>
  )
}

