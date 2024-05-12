import {createContext, useContext} from 'react';

import {FormStore, formatDuration, RaceType, LegType, DistanceUnit, convertToDistance} from './FormStore';

export const FormContext = createContext<FormStore>(new FormStore());
export const useFormStore = () => {
  return useContext(FormContext)
};
export {FormStore, formatDuration, convertToDistance}
export type {RaceType, LegType, DistanceUnit}