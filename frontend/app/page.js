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
  const [selectedEducationLevels, setSelectedEducationLevels] = useState([]);
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
        selectedMunicipalityId={selectedMunicipalityId}
        onSelectMunicipalityId={setSelectedMunicipalityId}
        selectedEducationLevels={selectedEducationLevels}
        onSelectEducationLevels={setSelectedEducationLevels}
        selectedSchool={selectedSchool}
        onSelectSchool={handleSelectSchool}
      />
    </Layout>
  );

  //
}
