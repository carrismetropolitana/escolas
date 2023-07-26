import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import Layout, { siteTitle } from '../components/Layout/layout';
import SelectMunicipality from '../components/SelectMunicipality/SelectMunicipality'
import SelectSchool from '../components/SelectSchool/SelectSchool'

export default function Home() {

  const [municipality, setMunicipality] = useState(null);
  const [school, setSchool] = useState(null);

  return (
    <Layout home>

      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/cm.png" />
      </Head>

      <main >
          <SelectMunicipality 
            municipality={municipality} 
            setMunicipality={setMunicipality} 
          />

          {/* para renderizar no HTML o nome do municipality */}
          {/* {municipality ? municipality.label : '' }  */}
          
          <SelectSchool 
            municipality={municipality} 
            setSchool={setSchool}
          />

      </main>

    </Layout>
  )
}