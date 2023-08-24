import { useState, useEffect } from 'react';

const useMunicipalities = () => {
  const [municipalities, setMunicipalities] = useState([]);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        const response = await fetch('https://api.carrismetropolitana.pt/municipalities');
        const municipalitiesData = await response.json();

        const municipalityOptions = municipalitiesData.map((item) => ({ label: item.name, value: item.code }));
        setMunicipalities(municipalityOptions);
      } catch (error) {
        console.log('Error fetching municipalities:', error);
      }
    };
    fetchMunicipalities();
  }, []);

  return municipalities;
};

export default useMunicipalities;
