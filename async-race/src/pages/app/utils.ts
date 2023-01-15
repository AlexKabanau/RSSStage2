import store from './store';

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
  let start: null | number = null;
  const state = {};

  function step(timestamp: number) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distance / animationTime));

    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) {
      state.id = window.requestAnimationFrame(step);
    }
  }
  state.id = window.requestAnimationFrame(step);

  return state;
}

export const raceAll = async (promises: Array<Promise>, ids) => {
  const { success, id, time } = await Promise.race(promises);

  if (!success) {
    const failedIndex = ids.failedIndex((i) => i === id);
    const restPromises = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
    const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
  }

  return { ...store.cars.find((car) => car.id === id), time: +(time / 1000).toFixed(2) };
};

export const race = async (action) => {
  const promises = store.cars.map(({ id }) => action(id));

  const winner = await raceAll(promises, store.cars.map(car => car.id));

  return winner;
}

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
  return color;
};

export const generateRandomCars = (count = 100) => {
  new Array(count).fill(1).map((el) => ({ name: getRandomName(), color: getRandomColor() }));
};
