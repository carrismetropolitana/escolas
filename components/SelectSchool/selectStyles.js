const selectStyles = {

  control: (provided, state) => ({
    ...provided,
    borderRadius: '8px',
    backgroundColor: 'black',
    color: 'white',
    width: '35ch',
    margin: 'auto',
    marginBottom: '10px',
    boxShadow: state.isFocused ? '0 0 0 2px #007bff' : 'none', 
    cursor: 'pointer',
    border: '1px solid black',
  }),

  singleValue: (provided) => ({
    ...provided,
    color: 'white',
    backgroundColor: 'black',
  }),

  placeholder: (provided) => ({
    ...provided,
    color: 'white',
  }),

  menu: (provided, state) => ({
    ...provided,
    maxHeight: 250,
    overflow: 'hidden', // Hide the overflowed content
  }),

  menuList: (provided, state) => ({
    ...provided,
    maxHeight: 250,
    overflowY: 'scroll', // Enable scrolling for the menu content
  }),


  input: (provided) => ({
    ...provided,
    color: 'white', // Set the color of the typed text
    zIndex: 3,
    // Add other custom styles for the input class if needed.
  }),

  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    background: state.isFocused ? 'lightgrey' : 'white',
    // color: state.isFocused? 'white' : 'grey',
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'white',
    padding: '8px', // Set the font size to make the indicator bigger
    // Add other custom styles for the dropdownIndicator class if needed.
  }),
};

export default selectStyles;