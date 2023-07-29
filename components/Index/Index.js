import React, { useEffect, useState } from 'react';

import styles from './index.module.css';

import Layout, { siteTitle } from '../Layout/layout';
import SelectMunicipality from '../SelectMunicipality/SelectMunicipality';
import SelectSchool from '../SelectSchool/SelectSchool';


const Home = () => {

  const [municipality, setMunicipality] = useState(null);
  const [school, setSchool] = useState(null);

  return (
    <Layout home>
      
      <p style={{ fontSize: '1.5em', lineHeight: '1.3em' }}>Saiba mais como chegar, com a Carris Metropolitana, <br></br> à sua escola ou universidade</p>
      
      <main className={ styles.main }>
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
  
  export default Home;