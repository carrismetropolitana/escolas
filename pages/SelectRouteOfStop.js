import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { customStyles } from './selectStyles'; // Import custom styles from the separate file


const SelectRouteOfStop = () => {

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://schedules.carrismetropolitana.pt/api/stops/010001'); // Replace with your API endpoint
        const data = await response.json();
        const formattedOptions = data.routes.map((item) => ({
          value: item.route_id,
          label: item.route_long_name
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (value) => {
    // Handle the Select2 value change
    console.log('Foi selecionada a rota', value.value, 'com o nome', value.label);

    // fetch('https://schedules.carrismetropolitana.pt/api/stops/010001')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data.routes);
    //   });
  };

  return (
    <div>
      <Select
        instanceId='InstanciaSelectRouteOfStop' 
        options={options} 
        placeholder="selecione um município"
        styles={customStyles} 
        onChange={handleChange}
      />
    </div>
  );
};

export default SelectRouteOfStop;