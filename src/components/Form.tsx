import React, {useState, useCallback, ChangeEvent} from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {observer} from 'mobx-react-lite';

import {useFormStore, formatDuration, DistanceUnit, convertToDistance} from '../stores';
import {Select} from './Select';
import {DurationInput} from './DurationInput';

dayjs.extend(duration);

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
  const {formState, setDistanceUnits, setSpeedUnits, setSpeed, setDuration} = useFormStore();
  const {duration, distance, distanceUnits, speed, speedUnits} = formState.bike;

  const bikeDistanceOptions: Array<{label: string, value: DistanceUnit}> = [
    {label: 'mi', value: 'miles'},
    {label: 'km', value: 'kilometers'}
  ];

  const bikeSpeedOptions: Array<{label: string, value: DistanceUnit}> = [
    {label: 'mph', value: 'miles'},
    {label: 'kph', value: 'kilometers'}
  ];

  const handleSpeedChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setSpeed('bike', parseInt(evt.target.value) || 0);
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
      <div className='flex'>
        <input type="text" value={convertToDistance(distance, distanceUnits)} />
        <Select value={distanceUnits} options={bikeDistanceOptions} onChange={handleDistanceUnitChange}/>
      </div>
      <DurationInput value={duration} onChange={handleDurationChange} />
      <div className='flex'>
        <input type="text" value={convertToDistance(speed, speedUnits)} onChange={handleSpeedChange}/>
        <Select value={speedUnits} options={bikeSpeedOptions} onChange={handleSpeedUnitChange} />
      </div>
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
        <input type="text" value={distance} />
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