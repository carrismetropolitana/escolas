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
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);

  //
  // B. Handle actions

  const handleSelectSchool = ({ value }) => {
    if (value) router.push(`/${value}`);
  };

  //
  // C. Render components

  return (
    <Layout>
      <SelectMunicipalityAndSchool selectedMunicipality={selectedMunicipality} onSelectMunicipality={setSelectedMunicipality} selectedSchool={selectedSchool} onSelectSchool={handleSelectSchool} />
    </Layout>
  );

  //
}
