import React, { useCallback } from 'react';
import { AutoComplete } from 'antd';

type InputValueType = string | undefined;
const defaultPlaceholder = 'Choose the user for communication';
interface OptionsType {
  label?: string | number,
  value: string | number,
}

interface AutocompleteInputProps<K extends any, T extends InputValueType> {
 selectedValue: T,
 values: K[],
 renderValue: (value: K, index?: number) => React.ReactElement,
 renderOption: (value: K) => OptionsType,
 onValueChange: (value: string) => void,
 placeholder?: string,
}

const AutocompleteInput = <T, K extends InputValueType>({
  selectedValue, values, renderValue, renderOption, onValueChange, placeholder,
}: AutocompleteInputProps<T, K>) => {
  const onSearchUser = useCallback((value: string, option) => {
    return option.value.indexOf(value) !== -1;
  }, []);

  return (
    <AutoComplete
      filterOption={onSearchUser}
      onChange={onValueChange}
      value={selectedValue}
      options={values.map((value) => renderOption(value))}
      placeholder={placeholder || defaultPlaceholder}
      style={{ width: 200 }}
    >
      {values.map((value, index) => renderValue(value, index))}
    </AutoComplete>
  )
};

export default AutocompleteInput;