import React from 'react';
import JoySelect, {SelectProps} from '@mui/joy/Select';
import JoyOption from '@mui/joy/Option';

type CustomSelectProps<T extends {}> = {
  options: Array<{label: string, value: T}>;
} & SelectProps<T, false>

export function Select<T extends {}>(props: CustomSelectProps<T>) {
  const {options, ...rest} = props;

  return (
    <JoySelect {...rest} variant='plain'>
      {options.map((({label, value}) => (
        <JoyOption key={label} value={value}>{label}</JoyOption>
      )))}
    </JoySelect>
  );
};

