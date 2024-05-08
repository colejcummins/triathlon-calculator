import {createContext, useContext} from 'react';

import {FormStore, formatDuration, RaceType, LegType, DistanceUnit} from './FormStore';

export const FormContext = createContext<FormStore>(new FormStore());
export const useFormStore = () => {
  return useContext(FormContext)
};
export {FormStore, formatDuration}
export type {RaceType, LegType, DistanceUnit}