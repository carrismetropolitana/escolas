const selectStyles = {

  control: (provided) => ({
    ...provided,
    borderRadius: '8px',
    backgroundColor: 'black',
    color: 'white',
    width: '30ch',
    margin: 'auto',
    cursor: 'pointer',
    border: '1px solid black',
    // outline: 'none !important', // not managing to remove the blue border :-( !!!
    // boxShadow: 'none !important',
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