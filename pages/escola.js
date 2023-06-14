import Layout, { siteTitle } from '../components/layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import Script from 'next/script';

export default function Escola() {

  const router = useRouter();
  const { escola } = router.query;
  const [escolaInfo, setEscolaInfo] = useState({});

  // descarrega da API a info da escola 
  useEffect(() => {

    fetch(`https://cmescola.pythonanywhere.com/escola/${escola}`)
      .then(response => response.json())
      .then(data => {
        setEscolaInfo(data.escola);
        console.log(escolaInfo);
      });

  }, []);


  return (
    <Layout>

      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/cm.png" />
      </Head>

      <main >

        <div><b> {escolaInfo.nome} </b></div>
        <div>morada: {escolaInfo.morada} </div>

      </main>

    </Layout>
  )
}

