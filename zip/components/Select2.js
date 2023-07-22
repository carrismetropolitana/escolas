import React, { useEffect, useRef } from 'react';
import $ from 'jquery';

const Select2 = ({ options, onChange }) => {
  const selectRef = useRef(null);

  useEffect(() => {
    // Initialize Select2 once the component has mounted
    $(selectRef.current).select2(options);

    // Trigger the onChange event when the Select2 value changes
    $(selectRef.current).on('change', (e) => {
      const value = e.target.value;
      onChange(value);
    });

    // Cleanup Select2 when the component unmounts
    return () => {
      $(selectRef.current).select2('destroy');
    };
  }, [options, onChange]);

  return <select ref={selectRef} />;
};

export default Select2;
