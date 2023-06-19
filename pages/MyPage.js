import React from 'react'
import Select from 'react-select'

const MyPage = () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const handleChange = (value) => {
    // Handle the Select2 value change
    console.log(value);
  };

  return (
    <div>
      <h1>My Page</h1>
      <Select2 options={options} onChange={handleChange} />
    </div>
  );
};

export default MyPage;