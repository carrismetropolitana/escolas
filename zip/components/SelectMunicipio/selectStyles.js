export const customStyles = {

    control: (provided) => ({
      ...provided,
      borderRadius: '8px',
      backgroundColor: 'white',
      color: 'black', // Set the desired font color for selected option
      backgroundColor: 'white',
    }),

    singleValue: (provided) => ({
      ...provided,
      color: 'black', // Set the desired font color for selected option
      backgroundColor: 'white',
    }),

    placeholder: (provided) => ({
      ...provided,
      color: 'lightgrey', // Set the desired font color for placeholder text
      backgroundColor: 'white',
    }),

    menu: (provided, state) => ({
      ...provided,
      maxHeight: 150,
      overflow: 'hidden', // Hide the overflowed content
    }),
    
    menuList: (provided, state) => ({
      ...provided,
      maxHeight: 150,
      overflowY: 'scroll', // Enable scrolling for the menu content
    }),
};
