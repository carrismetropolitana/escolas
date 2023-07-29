import React, { useEffect, useState } from 'react';


import Layout, { siteTitle } from '../components/Layout/layout';
import SelectMunicipalityAndSchool from '../components/SelectMunicipalityAndSchool/SelectMunicipalityAndSchool';
import ShowSchool from '../components/ShowSchool/ShowSchool';



export default function Home() {

  const [municipality, setMunicipality] = useState(null);
  const [school, setSchool] = useState(null);

  return (
    <Layout home>
      
      {!school ?

        < SelectMunicipalityAndSchool
          municipality={municipality}
          setMunicipality={setMunicipality}
          school={school}
          setSchool={setSchool}
        />

        :

        <ShowSchool
          municipality={municipality}
          school={school}
          setSchool={setSchool}
        />

      }

    </Layout>
  )
}