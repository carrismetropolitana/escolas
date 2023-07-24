export const customStyles = {

    control: (provided) => ({
      ...provided,
      borderRadius: '8px',
      backgroundColor: 'black',
      color: 'white', 
      backgroundColor: 'black',
      width: '35ch',
      margin: 'auto',
    }),

    singleValue: (provided) => ({
      ...provided,
      color: 'white', 
      backgroundColor: 'black',
    }),

    placeholder: (provided) => ({
      ...provided,
      color: 'white', 
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