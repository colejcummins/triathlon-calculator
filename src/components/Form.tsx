import React, {useState, useCallback, ChangeEvent} from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {observer} from 'mobx-react-lite';

import {useFormStore, formatDuration, DistanceUnit} from '../stores';
import {Select} from './select';

dayjs.extend(duration);

const SwimForm = observer(() => {
  const {swimState, setSwimDistanceUnits} = useFormStore();
  const {duration, distance, distanceUnits, speed, speedUnits} = swimState;

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
    setSwimDistanceUnits(value as DistanceUnit);
  }, [setSwimDistanceUnits]);

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <input type="text" value={distance} />
        <Select value={distanceUnits} options={swimDistanceOptions} onChange={handleDistanceUnitChange}/>
      </div>
      <input type="text" value={formatDuration(duration)} />
      <div className='flex'>
        <input type="text" value={formatDuration(speed)} />
        <input type="text" value={speedUnits} />
      </div>
    </div>
  );
});

const BikeForm = observer(() => {
  const {bikeState, setBikeSpeed, setBikeDistanceUnits, setBikeSpeedUnits} = useFormStore();
  const {duration, distance, distanceUnits, speed, speedUnits} = bikeState;

  const bikeDistanceOptions: Array<{label: string, value: DistanceUnit}> = [
    {label: 'mi', value: 'miles'},
    {label: 'km', value: 'kilometers'}
  ];

  const bikeSpeedOptions: Array<{label: string, value: DistanceUnit}> = [
    {label: 'mph', value: 'miles'},
    {label: 'kph', value: 'kilometers'}
  ];

  const handleSpeedChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setBikeSpeed(parseInt(evt.target.value) || 0);
  }, [setBikeSpeed]);

  const handleDistanceUnitChange = useCallback((_: any, value: DistanceUnit | null) => {
    setBikeDistanceUnits(value as DistanceUnit);
  }, [setBikeDistanceUnits]);

  const handleSpeedUnitChange = useCallback((_: any, value: DistanceUnit | null) => {
    setBikeSpeedUnits(value as DistanceUnit);
  }, [setBikeSpeedUnits]);

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <input type="text" value={distance} />
        <Select value={distanceUnits} options={bikeDistanceOptions} onChange={handleDistanceUnitChange}/>
      </div>
      <input type="text" value={formatDuration(duration)} />
      <div className='flex'>
        <input type="text" value={speed} onChange={handleSpeedChange}/>
        <Select value={speedUnits} options={bikeSpeedOptions} onChange={handleSpeedUnitChange} />
      </div>
    </div>
  );
});

const RunForm = observer(() => {
  const {runState, setRunDistanceUnits} = useFormStore();
  const {duration, distance, distanceUnits, speed, speedUnits} = runState;

  const runDistanceOptions: Array<{label: string, value: DistanceUnit}> = [
    {label: 'mi', value: 'miles'},
    {label: 'km', value: 'kilometers'}
  ];

  const handleDistanceUnitChange = useCallback((_: any, value: DistanceUnit | null) => {
    setRunDistanceUnits(value as DistanceUnit);
  }, [setRunDistanceUnits]);

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <input type="text" value={distance} />
        <Select value={distanceUnits} options={runDistanceOptions} onChange={handleDistanceUnitChange}/>
      </div>
      <input type="text" value={formatDuration(duration)} />
      <div className='flex'>
        <input type="text" value={formatDuration(speed)} />
        <input type="text" value={speedUnits} />
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