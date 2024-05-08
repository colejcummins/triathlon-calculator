import React from 'react';
import {Select as BaseSelect, SelectProps as BaseSelectProps} from '@mui/base/Select';
import {Option as BaseOption} from '@mui/base/Option';

type SelectProps<T extends {}> = {
  options: Array<{label: string, value: T}>;
} & BaseSelectProps<T, false>

export function Select<T extends {}>(props: SelectProps<T>) {
  const {options, ...rest} = props;

  return (
    <BaseSelect {...rest}>
      {options.map((({label, value}) => (
        <BaseOption key={label} value={value}>{label}</BaseOption>
      )))}
    </BaseSelect>
  );
};

