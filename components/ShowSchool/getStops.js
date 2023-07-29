import { useState, useEffect } from 'react';
// import axios from 'axios';

const getStops = (school) => {
  const baseUrl = 'https://schedules.carrismetropolitana.pt/api/stops/';
  const [stops, setStops] = useState([]);

  useEffect(() => {
    const fetchStopsData = async () => {
      if (school?.stops) {
        
        try {
          const axios = require('axios');
          const fetchPromises = school.stops.map(async (stop) => {
            const response = await axios.get(`${baseUrl}/${stop}`);
            return response.data;
          });

          const stopDataList = await Promise.all(fetchPromises);
          setStops(stopDataList);
        } catch (error) {
          console.error('Error fetching stops data:', error);
          setStops([]);
        }
      }
    };

    fetchStopsData();
  }, [school?.stops]); // ? protege de quando não ha stops ainda

  return stops;
};

export default getStops;

