'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import SelectMunicipalityAndSchool from '@/components/SelectMunicipalityAndSchool/SelectMunicipalityAndSchool';

export default function Page() {
  //

  //
  // A. Setup variables

  const router = useRouter();
  const [selectedMunicipalityCode, setSelectedMunicipalityCode] = useState(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState();

  //
  // B. Handle actions

  const handleSelectSchool = (schooldId) => {
    if (schooldId) router.push(`/${schooldId}`);
  };

  //
  // C. Render components

  return (
    <Layout>
      <SelectMunicipalityAndSchool
        selectedMunicipalityCode={selectedMunicipalityCode}
        onSelectMunicipalityCode={setSelectedMunicipalityCode}
        selectedEducationLevel={selectedEducationLevel}
        onSelectEducationLevel={setSelectedEducationLevel}
        selectedSchool={selectedSchool}
        onSelectSchool={handleSelectSchool}
      />
    </Layout>
  );

  //
}
