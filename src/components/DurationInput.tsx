import React from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import {PatternFormat, PatternFormatProps} from 'react-number-format';

dayjs.extend(duration);

interface DurationInputProps {
  value: duration.Duration;
  onChange: (val: duration.Duration) => void;
}

const PatternFormatAdapter = React.forwardRef<PatternFormatProps, DurationInputProps>(
  function PatternFormatAdapter(props, ref) {
    const {onChange, value} = props;

    return (
      <PatternFormat
        value={value.format("hh:mm:ss")}
        getInputRef={ref}
        onChange={(val) => console.log(val)}
        format="##:##:##"
        allowEmptyFormatting={true}
        valueIsNumericString={true}
      />

    );
  }
);

export const DurationInput = ({value, onChange}: DurationInputProps) => {

  return (
    <Box display="flex">
      <Input
        variant="plain"
        slotProps={{
          input: {
            component: PatternFormatAdapter
          }
        }}
      />
    </Box>
  );
}