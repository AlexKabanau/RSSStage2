/* eslint-disable max-len */
import store from './store';
import {
  AnimationItem, NewWinner, RaceDone, RaceWinner,
} from './types';
// import { AnimationItem, RaceDone, Winner } from './types';

function getPositionAtCenter(element: HTMLElement) {
  const {
    top, left, width, height,
  } = element.getBoundingClientRect();

  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

export function getDistanceBetweenElements(a: HTMLElement, b: HTMLElement) {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

export function animation(car: HTMLElement, distance: number, animationTime: number) {
  // let start: number | null = null;
  const state: AnimationItem = {};
  const startTime = new Date().getTime();
  function step() {
    const currentTime = new Date().getTime();
    const passed = Math.round((currentTime - startTime)) * (distance / animationTime);

    // eslint-disable-next-line no-param-reassign
    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) {
      state.id = window.requestAnimationFrame(step);
    }
  }
  state.id = window.requestAnimationFrame(step);

  return state;
}

// eslint-disable-next-line max-len
const raceAll = async (promises: Array<Promise<RaceDone>>, ids: Array<number>): Promise<RaceWinner | null> => {
  const { success, id, time } = await Promise.race(promises);

  if (!success) {
    const failedIndex = ids.findIndex((i) => i === id);
    promises.splice(failedIndex, 1);
    ids.splice(failedIndex, 1);
    if (promises.length < 1) return null;
    return raceAll(promises, ids);
  }

  return { ...store.cars.find((car) => car.id === id), time: +(time / 1000).toFixed(2) };
};

export const race = async (action: (id: number) => Promise<RaceDone>) => {
  const promises = store.cars.map(({ id }) => action(id));

  const winner = await raceAll(promises, store.cars.map((car) => car.id)) as NewWinner;

  return winner;
};

const models = ['Lada', 'VW', 'KIA', 'Geely', 'Audi', 'Opel', 'Ford', 'Renault', 'Mercedes', 'BMW'];
const names = ['Vesta', 'Polo', 'Rio', 'Niva Legend', 'A6', 'Vectra', 'Mondeo', 'Scenic', 'E-Class', '5-Series'];

const getRandomName = () => {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  return `${model} ${name}`;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  // console.log(color);
  return color;
};

export const generateRandomCars = (count = 100) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, implicit-arrow-linebreak
  new Array(count).fill(1).map((el) => ({ name: getRandomName(), color: getRandomColor() }));
