import {observable, action, computed, makeObservable} from 'mobx';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export type RaceType = 'sprint' | 'olympic' | 'half' | 'ironman';

export type LegType = 'swim' | 'bike' | 'run'

export type DistanceUnit = 'yards' | 'meters' | 'miles' | 'kilometers';

interface _LegState {
  distance: number;
  distanceUnits: DistanceUnit;
  duration: duration.Duration;
  speedUnits: DistanceUnit;
}

type SwimState = _LegState & {
  speed: duration.Duration;
}

type BikeState = _LegState & {
  speed: number;
}

type RunState = _LegState & {
  speed: duration.Duration;
}

export const DEFAULT_RACE_DISTANCES: Record<RaceType, Record<LegType, {distance: number, distanceUnits: DistanceUnit}>> = {
  'sprint': {
    swim: {distance: 750, distanceUnits: 'meters'},
    bike: {distance: 20, distanceUnits: 'kilometers'},
    run: {distance: 5, distanceUnits: 'kilometers'},
  },
  'olympic': {
    swim: {distance: 1500, distanceUnits: 'meters'},
    bike: {distance: 40, distanceUnits: 'kilometers'},
    run: {distance: 10, distanceUnits: 'kilometers'},
  },
  'half': {
    swim: {distance: 1.2, distanceUnits: 'miles'},
    bike: {distance: 56, distanceUnits: 'miles'},
    run: {distance: 13.1, distanceUnits: 'miles'},
  },
  'ironman': {
    swim: {distance: 2.4, distanceUnits: 'miles'},
    bike: {distance: 112, distanceUnits: 'miles'},
    run: {distance: 26.2, distanceUnits: 'miles'},
  },
}

export const convertDistance = (distance: number, unit1: DistanceUnit, unit2: DistanceUnit) => {
  switch (true) {
    case unit1 === unit2: return distance;
    case unit1 === 'miles' && unit2 === 'kilometers': return distance * 1.60934;
    case unit1 === 'miles' && unit2 === 'meters': return distance * 1609.34;
    case unit1 === 'miles' && unit2 === 'yards': return distance * 1760;
    case unit1 === 'kilometers' && unit2 === 'miles': return distance / 1.60934;
    case unit1 === 'kilometers' && unit2 === 'meters': return distance * 1000;
    case unit1 === 'kilometers' && unit2 === 'yards': return distance * 1093.61;
    case unit1 === 'meters' && unit2 === 'miles': return distance / 1609.34;
    case unit1 === 'meters' && unit2 === 'kilometers': return distance / 1000;
    case unit1 === 'meters' && unit2 === 'yards': return distance * 1.09361;
    case unit1 === 'yards' && unit2 === 'kilometers': return distance / 1093.61;
    case unit1 === 'yards' && unit2 === 'miles': return distance / 1760;
    case unit1 === 'yards' && unit2 === 'meters': return distance / 1.09361;
    default: return 1;
  }
}

export const formatDuration = (dur: duration.Duration) => {
  return `${dur.asHours()}:${dur.format('mm:ss')}`;
}

export class FormStore {
  @observable raceType: RaceType = 'olympic';
  @observable t1Duration: duration.Duration = dayjs.duration({minutes: 2});
  @observable t2Duration: duration.Duration = dayjs.duration({minutes: 1});
  @observable swimState: SwimState = {
    ...DEFAULT_RACE_DISTANCES['olympic'].swim,
    duration: dayjs.duration(0),
    speed: dayjs.duration(0),
    speedUnits: 'meters'
  };
  @observable bikeState: BikeState = {
    ...DEFAULT_RACE_DISTANCES['olympic'].bike,
    duration: dayjs.duration({hours: 2}),
    speed: 0,
    speedUnits: 'miles'
  };
  @observable runState: RunState = {
    ...DEFAULT_RACE_DISTANCES['olympic'].run,
    duration: dayjs.duration(0),
    speed: dayjs.duration(0),
    speedUnits: 'miles'
  };

  constructor() {
    makeObservable(this);
  }

  @computed
  get raceDuration() {
    return this.t1Duration
      .add(this.t2Duration)
      .add(this.swimState.duration)
      .add(this.bikeState.duration)
      .add(this.runState.duration)
  }

  @action.bound
  setRaceType(newType: RaceType) {
    this.raceType = newType;
    this.swimState = {...this.swimState, ...DEFAULT_RACE_DISTANCES[newType].swim};
    this.bikeState = {...this.bikeState, ...DEFAULT_RACE_DISTANCES[newType].bike};
    this.runState = {...this.runState, ...DEFAULT_RACE_DISTANCES[newType].run};
    this.setSwimSpeed(this.swimState.speed);
    this.setBikeSpeed(this.bikeState.speed);
    this.setRunSpeed(this.runState.speed);
  }

  @action.bound
  setSwimSpeed(newSpeed: duration.Duration) {
    this.swimState.speed = newSpeed;
    const converted = convertDistance(this.swimState.distance, this.swimState.distanceUnits, this.swimState.speedUnits);
    this.swimState.duration = dayjs.duration({seconds: converted / 100 * newSpeed.asSeconds()});
  }

  @action.bound
  setBikeSpeed(newSpeed: number) {
    this.bikeState.speed = newSpeed;
    const converted = convertDistance(this.bikeState.distance, this.bikeState.distanceUnits, this.bikeState.speedUnits);
    this.bikeState.duration = dayjs.duration({hours: converted / newSpeed});
  }

  @action.bound
  setRunSpeed(newSpeed: duration.Duration) {
    this.runState.speed = newSpeed;
    const converted = convertDistance(this.runState.distance, this.runState.distanceUnits, this.runState.speedUnits);
    this.runState.duration = dayjs.duration({minutes: converted * newSpeed.asMinutes()});
  }

  @action.bound
  setSwimDistanceUnits(unit: DistanceUnit) {
    this.swimState.distance = convertDistance(this.swimState.distance, this.swimState.distanceUnits, unit);
    this.swimState.distanceUnits = unit;
  }

  @action.bound
  setBikeDistanceUnits(unit: DistanceUnit) {
    this.bikeState.distance = convertDistance(this.bikeState.distance, this.bikeState.distanceUnits, unit);
    this.bikeState.distanceUnits = unit;
  }

  @action.bound
  setRunDistanceUnits(unit: DistanceUnit) {
    this.runState.distance = convertDistance(this.runState.distance, this.runState.distanceUnits, unit);
    this.runState.distanceUnits = unit;
  }

  @action.bound
  setSwimSpeedUnits(unit: DistanceUnit) {
    const newDistance = convertDistance(this.swimState.distance, this.swimState.distanceUnits, unit);
    this.swimState.speed = dayjs.duration(newDistance )
  }

  @action.bound
  setBikeSpeedUnits(unit: DistanceUnit) {
    const newDistance = convertDistance(this.bikeState.distance, this.bikeState.distanceUnits, unit);
    if (this.bikeState.duration.asHours() !== 0) {
      this.bikeState.speed = newDistance / this.bikeState.duration.asHours();
    }
    this.bikeState.speedUnits = unit;
  }

}