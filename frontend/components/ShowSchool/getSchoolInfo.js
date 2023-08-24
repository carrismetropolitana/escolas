import { useState, useEffect } from 'react';

const getSchoolInfo = (school) => {
  const baseUrl = 'https://api.carrismetropolitana.pt/facilities/';
  const [schoolInfo, setSchoolInfo] = useState(null);

  useEffect(() => {
    const fetchSchoolInfo = async () => {
      try {
        const response = await fetch(baseUrl + school.value);
        const data = await response.json();
        setSchoolInfo(data);
      } catch (error) {
        console.log('Error fetching school info:', error);
      }
    };
    fetchSchoolInfo();
  }, [school]);

  return schoolInfo;
};

export default getSchoolInfo;
