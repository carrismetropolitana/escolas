const selectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '8px',
    backgroundColor: 'white',
    color: 'black',
    width: '35ch',
    margin: 'auto',
    cursor: 'pointer',
    // border: '1px solid black',
    // outline: 'none !important', // not managing to remove the blue border :-( !!!
    // boxShadow: 'none !important',
  }),

  singleValue: (provided) => ({
    ...provided,
    color: 'black',
    backgroundColor: 'white',
  }),

  placeholder: (provided) => ({
    ...provided,
    color: 'black',
    backgroundColor: 'white',
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

  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    background: state.isFocused ? 'lightgrey' : 'white',
    // color: state.isFocused? 'white' : 'grey',
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'black',
  }),

  // indicatorSeparator: (provided) => ({
  //   ...provided,
  //   backgroundColor: 'black',
  // }),
};

export default selectStyles;
