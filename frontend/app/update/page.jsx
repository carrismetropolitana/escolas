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
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState();

  //
  // B. Handle actions

  const handleSelectSchool = (schooldId) => {
    if (schooldId) router.push(`/update/${schooldId}`);
  };

  //
  // C. Render components

  return (
    <Layout>
      <SelectMunicipalityAndSchool
        selectedMunicipalityId={selectedMunicipalityId}
        onSelectMunicipalityId={setSelectedMunicipalityId}
        selectedEducationLevel={selectedEducationLevel}
        onSelectEducationLevel={setSelectedEducationLevel}
        selectedSchool={selectedSchool}
        onSelectSchool={handleSelectSchool}
      />
    </Layout>
  );
  //
}
