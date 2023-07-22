export const customStyles = {

    control: (provided) => ({
      ...provided,
      borderRadius: '8px',
      backgroundColor: 'black',
      color: 'white', // Set the desired font color for selected option
      backgroundColor: 'black',
      width: '25ch',
      margin: 'auto',
    }),

    singleValue: (provided) => ({
      ...provided,
      color: 'white', // Set the desired font color for selected option
      backgroundColor: 'black',
    }),

    placeholder: (provided) => ({
      ...provided,
      color: 'white', // Set the desired font color for placeholder text
      backgroundColor: 'black',
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