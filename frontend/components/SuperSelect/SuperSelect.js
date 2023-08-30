import { Combobox, Highlight, TextInput, useCombobox, Group, Text } from '@mantine/core';
import { useState } from 'react';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate', '🍇 Grapes'];

export function SuperSelect() {
  //

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState('');

  const shouldFilterOptions = !groceries.some((item) => item === value);

  const filteredOptions = shouldFilterOptions ? groceries.filter((item) => item.toLowerCase().includes(value.toLowerCase().trim())) : groceries;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      <Highlight highlight={value} size="sm">
        {item}
      </Highlight>
      <Group>
        <Text fz={20}>{item}</Text>
        <div>
          <Text fz="sm" fw={500}>
            {value}
          </Text>
          <Text fz="xs" opacity={0.6}>
            {item}
          </Text>
        </div>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label="Pick value or type anything"
          placeholder="Pick value or type anything"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.updateSelectedOptionIndex();
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
