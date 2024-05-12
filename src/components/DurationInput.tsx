import React, {useState, useCallback, ChangeEvent, WheelEventHandler} from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import {PatternFormat, PatternFormatProps} from 'react-number-format';

dayjs.extend(duration);

/**


const PatternFormatAdapter = React.forwardRef<PatternFormatProps, PatternFormatCustomProps>(
  function PatternFormatAdapter(props, ref) {
    const {onChange, value} = props;

    return (
      <PatternFormat
        value={value}
        getInputRef={ref}
        onChange={onChange}
        format="##:##:##"
        mask="_"
        allowEmptyFormatting={true}
        valueIsNumericString={true}
      />

    );
  }
);
*/

const removeArrows = {
  "-moz-appearance": "textfield",
  "input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
  }
};

interface DurationInputProps {
  value: duration.Duration;
  onChange: (val: duration.Duration) => void;
}

export const DurationInput = ({value, onChange}: DurationInputProps) => {
  const handleHoursChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(evt.target.value) || 0;
    if (parsed <= 24) {
      onChange(dayjs.duration({hours: parsed, minutes: value.minutes(), seconds: value.seconds()}));
    }
  }, [value, onChange])

  const handleMinutesChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(evt.target.value) || 0;
    if (parsed <= 60) {
      onChange(dayjs.duration({hours: value.hours(), minutes: parsed, seconds: value.seconds()}));
    }
  }, [value, onChange]);

  const handleSecondsChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(evt.target.value) || 0;
    if (parsed <= 60) {
      onChange(dayjs.duration({hours: value.hours(), minutes: value.minutes(), seconds: parsed}));
    }
  }, [value, onChange]);

  const preventWheel: WheelEventHandler<HTMLInputElement> = (e) => {
    e.target.blur();
    e.stopPropagation();
    setTimeout(() => {
      e.target.focus()
    }, 0)
  };

  return (
    <Box display="flex" alignItems="center">
      <Input
        variant="plain"
        type="number"
        value={value.hours().toString()}
        onChange={handleHoursChange}
        sx={{...removeArrows}}
        slotProps={{
          input: {
            min: 0,
            max: 24,
            step: 1,
            onWheel:
          }
        }}
      />
      <Box fontSize="18px">:</Box>
      <Input
        variant="plain"
        type="number"
        value={value.minutes().toString()}
        onChange={handleMinutesChange}
        sx={{...removeArrows}}
        slotProps={{
          input: {
            max: 60,
            min: 0,
            step: 1,
            onWheel: () => false
          }
        }}
      />
      <Box fontSize="18px">:</Box>
      <Input
        variant="plain"
        type="number"
        value={value.seconds().toString()}
        onChange={handleSecondsChange}
        sx={{...removeArrows}}
        slotProps={{
          input: {
            max: 60,
            min: 0,
            step: 1,
            onWheel: () => false
          }
        }}
      />
    </Box>
  );
}