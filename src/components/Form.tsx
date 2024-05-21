import React, {useState, useCallback, ChangeEvent, Fragment} from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {observer} from 'mobx-react-lite';
import Input from '@mui/joy/Input';
import Divider from '@mui/joy/Divider';

import {useFormStore, formatDuration, DistanceUnit, convertToDistance, convertToMeters} from '../stores';
import {Select} from './Select';
import {DurationInput} from './DurationInput';

dayjs.extend(duration);

const removeArrows = {
  "-moz-appearance": "textfield",
  "input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
  }
};

const SwimForm = observer(() => {
  const {formState, setDistanceUnits, setSpeedUnits} = useFormStore();
  const {duration, distance, distanceUnits, speed, speedUnits} = formState.swim;

  const swimSpeedOptions: Array<{label: string, value: DistanceUnit}> = [
    {label: '/ 100 m', value: 'meters'},
    {label: '/ 100 yd', value: 'yards'}
  ];

  const swimDistanceOptions: Array<{label: string, value: DistanceUnit}> = [
    {label: 'yd', value: 'yards'},
    {label: 'm', value: 'meters'},
    {label: 'mi', value: 'miles'},
    {label: 'km', value: 'kilometers'}
  ];

  const handleDistanceUnitChange = useCallback((_: any, value: DistanceUnit | null) => {
    setDistanceUnits('swim', value as DistanceUnit);
  }, [setDistanceUnits]);

  const handleSpeedUnitChange = useCallback((_: any, value: DistanceUnit | null) => {
    setSpeedUnits('swim', value as DistanceUnit);
  }, [setSpeedUnits]);

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <input type="text" value={distance} />
        <Select value={distanceUnits} options={swimDistanceOptions} onChange={handleDistanceUnitChange}/>
      </div>
      <input type="text" value={formatDuration(duration)} />
      <div className='flex'>
        <input type="text" value={speed} />
        <Select value={speedUnits} options={swimSpeedOptions} onChange={handleSpeedUnitChange} />
      </div>
    </div>
  );
});

const BikeForm = observer(() => {
  const {formState, setDistanceUnits, setSpeedUnits, setSpeed, setDuration, setDistance} = useFormStore();
  const {duration, distance, distanceUnits, speed, speedUnits} = formState.bike;

  const bikeDistanceOptions: Array<{label: string, value: DistanceUnit}> = [
    {label: 'mi', value: 'miles'},
    {label: 'km', value: 'kilometers'}
  ];

  const bikeSpeedOptions: Array<{label: string, value: DistanceUnit}> = [
    {label: 'mph', value: 'miles'},
    {label: 'kph', value: 'kilometers'}
  ];

  const handleDistanceChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setDistance('bike', convertToMeters(parseInt(evt.target.value) || 0, distanceUnits));
  }, []);

  const handleSpeedChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setSpeed('bike', convertToMeters(parseInt(evt.target.value) || 0, speedUnits));
  }, [setSpeed]);

  const handleDistanceUnitChange = useCallback((_: any, value: DistanceUnit | null) => {
    setDistanceUnits('bike', value as DistanceUnit);
  }, [setDistanceUnits]);

  const handleSpeedUnitChange = useCallback((_: any, value: DistanceUnit | null) => {
    setSpeedUnits('bike', value as DistanceUnit);
  }, [setSpeedUnits]);

  const handleDurationChange = useCallback((value: duration.Duration) => {
    setDuration('bike', value);
  }, [setDuration]);

  return (
    <div className='flex flex-col'>
      <Input
        type="number"
        variant="plain"
        value={convertToDistance(distance, distanceUnits)}
        onChange={handleDistanceChange}
        sx={{...removeArrows}}
        endDecorator={
          <Select
            value={distanceUnits}
            options={bikeDistanceOptions}
            onChange={handleDistanceUnitChange}
            slotProps={{
              listbox: {
                variant: 'plain',
              },
            }}
            sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent' } }}
          />
        }
      />
      <DurationInput value={duration} onChange={handleDurationChange} />
      <Input
        type="number"
        variant="plain"
        value={convertToDistance(speed, speedUnits)}
        onChange={handleSpeedChange}
        sx={{...removeArrows}}
        endDecorator={
          <Select
            value={speedUnits}
            options={bikeSpeedOptions}
            onChange={handleSpeedUnitChange}
            slotProps={{
              listbox: {
                variant: 'plain',
              },
            }}
            sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent' } }}
          />
        }
      />
    </div>
  );
});

const RunForm = observer(() => {
  const {formState, setDistanceUnits, setSpeedUnits, setSpeed} = useFormStore();
  const {duration, distance, distanceUnits, speed, speedUnits} = formState.run;

  const runDistanceOptions: Array<{label: string, value: DistanceUnit}> = [
    {label: 'mi', value: 'miles'},
    {label: 'km', value: 'kilometers'}
  ];

  const runSpeedOptions: Array<{label: string, value: DistanceUnit}> = [
    {label: '/ mi', value: 'miles'},
    {label: '/ km', value: 'kilometers'}
  ];

  const handleDistanceUnitChange = useCallback((_: any, value: DistanceUnit | null) => {
    setDistanceUnits('run', value as DistanceUnit);
  }, [setDistanceUnits]);

  const handleSpeedUnitChange = useCallback((_: any, value: DistanceUnit | null) => {
    setSpeedUnits('run', value as DistanceUnit);
  }, [setSpeedUnits]);

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <input type="text" value={convertToDistance(distance, distanceUnits)} />
        <Select value={distanceUnits} options={runDistanceOptions} onChange={handleDistanceUnitChange}/>
      </div>
      <input type="text" value={formatDuration(duration)} />
      <div className='flex'>
        <input type="text" value={speed} />
        <Select value={speedUnits} options={runSpeedOptions} onChange={handleSpeedUnitChange} />
      </div>
    </div>
  );
});

export const Form = () => {
  const {} = useFormStore;

  return (
    <div className='flex'>
      <SwimForm />
      <BikeForm />
      <RunForm />
      <div>{}</div>
    </div>

  );
}