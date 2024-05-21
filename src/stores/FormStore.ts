import {observable, action, computed, makeObservable} from 'mobx';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export type RaceType = 'sprint' | 'olympic' | 'half' | 'ironman';

export type LegType = 'swim' | 'bike' | 'run';
export const LEG_TYPES: LegType[] = ['swim', 'bike', 'run'];

export type DistanceUnit = 'yards' | 'meters' | 'miles' | 'kilometers';

interface LegState {
  distance: number;
  distanceUnits: DistanceUnit;
  duration: duration.Duration;
  speedUnits: DistanceUnit;
  speed: number;
}

export const DEFAULT_RACE_DISTANCES: Record<RaceType, Record<LegType, number>> = {
  'sprint': {
    swim: 750,
    bike: 20000,
    run: 5000,
  },
  'olympic': {
    swim: 1500,
    bike: 40000,
    run: 10000,
  },
  'half': {
    swim: 1900,
    bike: 90000,
    run: 21100,
  },
  'ironman': {
    swim: 3900,
    bike: 180200,
    run: 42200,
  },
}

export const convertToDistance = (distance: number, unit: DistanceUnit) => {
  let out = 0;
  switch (true) {
    case unit === 'miles': out = distance / 1609.34; break;
    case unit === 'yards': out =  distance * 1.09361; break;
    case unit === 'kilometers': out = distance / 1000; break;
    default:
      out = distance;
  }
  return Math.round(out / 100) * 100;
}

export const convertToMeters = (distance: number, unit: DistanceUnit) => {
  let out = 0;
  switch (true) {
    case unit === 'miles': out = distance * 1609.34; break;
    case unit === 'yards': out = distance / 1.09361; break;
    case unit === 'kilometers': out = distance * 1000; break;
    default:
      out = distance;
  }
  return Math.round(out / 100) * 100;
}

export const formatDuration = (dur: duration.Duration) => {
  return `${dur.asHours()}:${dur.format('mm:ss')}`;
}

export class FormStore {
  @observable raceType: RaceType = 'olympic';
  @observable t1Duration: duration.Duration = dayjs.duration({minutes: 2});
  @observable t2Duration: duration.Duration = dayjs.duration({minutes: 1});
  @observable formState: Record<LegType, LegState> = {
    swim: {
      distance: DEFAULT_RACE_DISTANCES['olympic'].swim,
      distanceUnits: 'meters',
      duration: dayjs.duration(0),
      speed: 0,
      speedUnits: 'meters',
    },
    bike: {
      distance: DEFAULT_RACE_DISTANCES['olympic'].bike,
      distanceUnits: 'kilometers',
      duration: dayjs.duration({hours: 2, minutes: 0, seconds: 0}),
      speed: 0,
      speedUnits: 'kilometers'
    },
    run: {
      distance: DEFAULT_RACE_DISTANCES['olympic'].run,
      distanceUnits: 'kilometers',
      duration: dayjs.duration(0),
      speed: 0,
      speedUnits: 'kilometers'
    }
  }

  constructor() {
    makeObservable(this);
  }

  @computed
  get raceDuration() {
    return this.t1Duration
      .add(this.t2Duration)
      .add(this.formState.swim.duration)
      .add(this.formState.bike.duration)
      .add(this.formState.run.duration)
  }

  @action.bound
  setRaceType(raceType: RaceType) {
    this.raceType = raceType;
    LEG_TYPES.forEach((leg) => {
      this.setDistance(leg, DEFAULT_RACE_DISTANCES[raceType][leg]);
    });
  }

  @action.bound
  setSpeed(leg: LegType, newSpeed: number) {
    this.formState[leg].speed = newSpeed;
    this.formState[leg].duration = dayjs.duration({seconds: this.formState[leg].distance / newSpeed});
  }

  @action.bound
  setSpeedUnits(leg: LegType, newUnit: DistanceUnit) {
    this.formState[leg].speedUnits = newUnit;
  }

  @action.bound
  setDistance(leg: LegType, newDistance: number) {
    this.formState[leg].distance = newDistance;
    this.formState[leg].duration = dayjs.duration({seconds: newDistance / this.formState[leg].speed});
  }

  @action.bound
  setDistanceUnits(leg: LegType, newUnit: DistanceUnit) {
    this.formState[leg].distanceUnits = newUnit;
  }

  @action.bound
  setDuration(leg: LegType, newDuration: duration.Duration) {
    this.formState[leg].duration = newDuration;
    this.formState[leg].speed = this.formState[leg].distance / newDuration.asSeconds();
  }
}