import { useState, useEffect } from 'react';

const useSchool = (schoolId) => { 

const [school, setSchool] = useState({});
const [paragens, setParagens] = useState([]);

useEffect(() => {
    const fetchSchool = async () => {
        try {
            const responseschool = await fetch(
                `https://api.carrismetropolitana.pt/facilities`
            );
            const schoolData = await responseschool.json();
            const school = schoolData.find((item) => item.code === schoolId);
            setSchool(school);

            const responseParagens = await fetch(
                `https://schedules.carrismetropolitana.pt/api/stops`
            );
            const paragensData = await responseParagens.json();
            const filteredParagens = paragensData.filter(
                (stop) =>
                    haversineDistance(
                        school.lat,
                        school.lon,
                        stop.stop_lat,
                        stop.stop_lon
                    ) < 0.5
            );

            // ordenação pelo nome
            const sortedParagens = filteredParagens.sort((a, b) => {
                const nameA = a.stop_name.toLowerCase();
                const nameB = b.stop_name.toLowerCase();
                return nameA.localeCompare(nameB);
            });

            setParagens(sortedParagens);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    fetchSchool();
}, [school]);

return [school, paragens];
}

export default useSchool;