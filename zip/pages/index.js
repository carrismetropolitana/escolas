import Layout, { siteTitle } from '../components/layout';
import React, { useEffect, useState } from 'react';

import styles from '../styles/Home.module.css'; // não usado

import Head from 'next/head';
import SelectMunicipio from '../components/SelectMunicipio/SelectMunicipio'
import SelectEscola from '../components/SelectEscola/SelectEscola'



export default function Home() {

  const [municipios, setMunicipios] = useState([]);

  const [selectedMunicipio, setSelectedMunicipio] = useState(null);
  const handleMunicipioChange = (newMunicipio) => {
    setSelectedMunicipio(newMunicipio);
  }

  const [escolas, setEscolas] = useState([]);
  const handleEscolasChange = (newEscolas) => {
    setEscolas(newEscolas);
  }

  return (
    <Layout home>

      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/cm.png" />
      </Head>

      <main >

        <div className={styles.container}>

          <SelectMunicipio selectedMunicipio={selectedMunicipio} handleMunicipioChange={handleMunicipioChange} handleEscolasChange={handleEscolasChange} />

          <SelectEscola selectedMunicipio={selectedMunicipio} escolas={escolas} />

        </div>

      </main>

    </Layout>
  )
}

