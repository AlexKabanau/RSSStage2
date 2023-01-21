// eslint-disable-next-line import/named
import {
  // eslint-disable-next-line max-len
  startDriving, stopDriving, updateStateGarage, renderGarage, updateStateWinners, renderWinners, setSortOrder,
} from './ui';
import {
  // eslint-disable-next-line max-len
  // getCar, createCar, deleteCar, updateCar, deleteWinner,
  getCar, createCar, deleteCar, updateCar, saveWinner, deleteWinner,
} from './api';
import {
  race, generateRandomCars,
} from './utils';
import store from './store';
import { Car } from './types';

let selectedCar: null | Car = null;
const listen = () => {
  document.body.addEventListener('click', async (event) => {
    // eslint-disable-next-line prefer-destructuring
    const target = event.target as HTMLElement;

    if (target.classList.contains('start-engine-button')) {
      const id = +target.id.split('start-engine-car-')[1];
      console.log(id);
      startDriving(id);
    }

    if (target.classList.contains('stop-engine-button')) {
      const id = +target.id.split('stop-engine-car-')[1];
      stopDriving(id);
    }

    if (target.classList.contains('select-button')) {
      // eslint-disable-next-line no-const-assign
      selectedCar = await getCar(Number(target.id.split('select-car-')[1]));
      (document.getElementById('update-name') as HTMLInputElement).value = selectedCar.name;
      (document.getElementById('update-color') as HTMLInputElement).value = selectedCar.color;
      (document.getElementById('update-name') as HTMLInputElement).disabled = false;
      (document.getElementById('update-color') as HTMLInputElement).disabled = false;
      (document.getElementById('update-submit') as HTMLInputElement).disabled = false;
    }

    if (target.classList.contains('remove-button')) {
      const id = +target.id.split('remove-car-')[1];
      await deleteCar(id);
      await deleteWinner(id);
      await updateStateGarage();
      (document.getElementById('garage') as HTMLElement).innerHTML = renderGarage();
    }

    if (target.classList.contains('generator-button')) {
      (target as HTMLButtonElement).disabled = true;
      const cars = generateRandomCars();
      console.log(cars);
      await Promise.all(cars.map((c) => createCar(c)));
      await updateStateGarage();
      (document.getElementById('garage') as HTMLElement).innerHTML = renderGarage();
      (target as HTMLButtonElement).disabled = false;
    }

    if (target.classList.contains('race-button')) {
      (target as HTMLButtonElement).disabled = true;
      const winner = await race(startDriving);
      await saveWinner(winner);
      const message = document.getElementById('message') as HTMLElement;
      message.innerHTML = `${winner.name} went first ${winner.time}s.`;
      message.classList.toggle('visible', true);
      (document.getElementById('reset') as HTMLButtonElement).disabled = false;
    }

    if (target.classList.contains('reset-button')) {
      (target as HTMLButtonElement).disabled = true;
      store.cars.map(({ id }) => stopDriving(id));
      const message = document.getElementById('message') as HTMLElement;
      message.classList.toggle('visible', false);
      (document.getElementById('race') as HTMLButtonElement).disabled = false;
    }

    if (target.classList.contains('prev-button')) {
      // eslint-disable-next-line default-case
      switch (store.view) {
        case 'garage': {
          store.carsPage -= 1;
          await updateStateGarage();
          (document.getElementById('garage') as HTMLElement).innerHTML = renderGarage();
          break;
        }
        case 'winner': {
          store.winnersPage -= 1;
          await updateStateWinners();
          (document.getElementById('winners-view') as HTMLElement).innerHTML = renderWinners();
          break;
        }
      }
    }

    if (target.classList.contains('next-button')) {
      console.log(store.view);
      // eslint-disable-next-line default-case
      switch (store.view) {
        case 'garage': {
          store.carsPage += 1;
          await updateStateGarage();
          (document.getElementById('garage') as HTMLElement).innerHTML = renderGarage();
          break;
        }
        case 'winner': {
          store.winnersPage += 1;
          await updateStateWinners();
          (document.getElementById('winners-view') as HTMLElement).innerHTML = renderWinners();
          break;
        }
      }
    }

    if (target.classList.contains('garage-menu-button')) {
      (document.getElementById('garage-view') as HTMLElement).style.display = 'block';
      store.view = 'garage';
      (document.getElementById('winners-view') as HTMLElement).style.display = 'none';
    }

    if (target.classList.contains('winners-menu-button')) {
      (document.getElementById('garage-view') as HTMLElement).style.display = 'none';
      (document.getElementById('winners-view') as HTMLElement).style.display = 'block';
      store.view = 'winner';
      await updateStateWinners();
      (document.getElementById('winners-view') as HTMLElement).innerHTML = renderWinners();
    }

    if (target.classList.contains('table-wins')) {
      setSortOrder('wins');
      await updateStateWinners();
      (document.getElementById('winners-view') as HTMLElement).innerHTML = renderWinners();
    }

    if (target.classList.contains('table-time')) {
      setSortOrder('time');
      await updateStateWinners();
      (document.getElementById('winners-view') as HTMLElement).innerHTML = renderWinners();
    }
  });

  (document.getElementById('create') as HTMLFormElement).addEventListener('submit', async (event) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const targetName = target.querySelector('.input') as HTMLInputElement;
    const targetColor = target.querySelector('.color') as HTMLInputElement;
    const newCar = new Map();
    newCar.set(targetName.name, targetName.value);
    newCar.set(targetColor.name, targetColor.value);
    const car = Object.fromEntries(newCar);

    // eslint-disable-next-line max-len
    // const car: CreateCar = Object.fromEntries(new Map([...target].filter(({ name }) => !!name).map(({ value, name }) => [name, value]))); // !!!!!!
    await createCar(car);
    await updateStateGarage();
    (document.getElementById('garage') as HTMLElement).innerHTML = renderGarage();
    (document.getElementById('create-name') as HTMLInputElement).value = '';
    // eslint-disable-next-line no-param-reassign
    target.disabled = true;
  });

  (document.getElementById('update') as HTMLFormElement).addEventListener('submit', async (event) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const targetName = target.querySelector('.input') as HTMLInputElement;
    const targetColor = target.querySelector('.color') as HTMLInputElement;
    const newCar = new Map();
    newCar.set(targetName.name, targetName.value);
    newCar.set(targetColor.name, targetColor.value);
    const car = Object.fromEntries(newCar);
    // eslint-disable-next-line max-len
    // const car: CreateCar = Object.fromEntries(new Map([...event.target].filter(({ name }) => !!name).map(({ value, name }) => [name, value]))); // !!!!!!
    await updateCar((selectedCar as Car).id, car);
    await updateStateGarage();
    (document.getElementById('garage') as HTMLElement).innerHTML = renderGarage();
    (document.getElementById('update-name') as HTMLInputElement).value = '';
    (document.getElementById('update-name') as HTMLInputElement).disabled = true;
    (document.getElementById('update-color') as HTMLInputElement).disabled = true;
    (document.getElementById('update-submit') as HTMLInputElement).disabled = true;
    (document.getElementById('update-color') as HTMLInputElement).value = '#ffffff';
    selectedCar = null;
  });
};

export default listen;
