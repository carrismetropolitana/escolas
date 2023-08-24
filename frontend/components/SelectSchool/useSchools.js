import { useState, useEffect } from 'react';

const useSchools = (municipality) => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('https://api.carrismetropolitana.pt/facilities');
        const facilities = await response.json();

        const schools = facilities.filter(
          (facility) =>
            ['school', 'university'].includes(facility.type) && // (facility.type === 'school' || facility.type === 'university')
            (!municipality || facility.municipality_name == municipality.label)
        );

        const schoolOptions = schools.map((item) => ({
          label: item.name,
          value: item.code,
        }));
        setSchools(schoolOptions);
      } catch (error) {
        console.log('Error fetching schools:', error);
      }
    };
    fetchSchools();
  }, [municipality]);

  return schools;
};

export default useSchools;
