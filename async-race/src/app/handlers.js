// eslint-disable-next-line import/named
import {
  // eslint-disable-next-line max-len
  startDriving, stopDriving, updateStateGarage, renderGarage, updateStateWinners, renderWinners, setSortOrder,
} from './ui';
import {
  // eslint-disable-next-line max-len
  getCar, createCar, deleteCar, updateCar, saveWinner, deleteWinner,
} from './api';
import {
  race, generateRandomCars,
} from './utils';
import store from './store';

let selectedCar = null;
const listen = () => {
  document.body.addEventListener('click', async (event) => {
    // eslint-disable-next-line prefer-destructuring
    const target = event.target;

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
      (document.getElementById('update-name')).value = selectedCar.name;
      (document.getElementById('update-color')).value = selectedCar.color;
      (document.getElementById('update-name')).disabled = false;
      (document.getElementById('update-color')).disabled = false;
      (document.getElementById('update-submit')).disabled = false;
    }

    if (target.classList.contains('remove-button')) {
      const id = +target.id.split('remove-car-')[1];
      await deleteCar(id);
      await deleteWinner(id);
      await updateStateGarage();
      (document.getElementById('garage')).innerHTML = renderGarage();
    }

    if (target.classList.contains('generator-button')) {
      (target).disabled = true;
      const cars = generateRandomCars();
      console.log(cars);
      await Promise.all(cars.map((c) => createCar(c)));
      await updateStateGarage();
      (document.getElementById('garage')).innerHTML = renderGarage();
      (target).disabled = false;
    }

    if (target.classList.contains('race-button')) {
      (target).disabled = true;
      const winner = await race(startDriving);
      await saveWinner(winner);
      const message = document.getElementById('message');
      message.innerHTML = `${winner.name} went first ${winner.time}s.`;
      message.classList.toggle('visible', true);
      (document.getElementById('reset')).disabled = false;
    }

    if (target.classList.contains('reset-button')) {
      (target).disabled = true;
      store.cars.map(({ id }) => stopDriving(id));
      const message = document.getElementById('message');
      message.classList.toggle('visible', false);
      (document.getElementById('race')).disabled = false;
    }

    if (target.classList.contains('prev-button')) {
      // eslint-disable-next-line default-case
      switch (store.view) {
        case 'garage': {
          store.carsPage -= 1;
          await updateStateGarage();
          (document.getElementById('garage')).innerHTML = renderGarage();
          break;
        }
        case 'winner': {
          store.winnersPage -= 1;
          await updateStateWinners();
          (document.getElementById('winners-view')).innerHTML = renderWinners();
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
          (document.getElementById('garage')).innerHTML = renderGarage();
          break;
        }
        case 'winner': {
          store.winnersPage += 1;
          await updateStateWinners();
          (document.getElementById('winners-view')).innerHTML = renderWinners();
          break;
        }
      }
    }

    if (target.classList.contains('garage-menu-button')) {
      (document.getElementById('garage-view')).style.display = 'block';
      store.view = 'garage';
      (document.getElementById('winners-view')).style.display = 'none';
    }

    if (target.classList.contains('winners-menu-button')) {
      (document.getElementById('garage-view')).style.display = 'none';
      (document.getElementById('winners-view')).style.display = 'block';
      store.view = 'winner';
      await updateStateWinners();
      (document.getElementById('winners-view')).innerHTML = renderWinners();
    }

    if (target.classList.contains('table-wins')) {
      setSortOrder('wins');
      await updateStateWinners();
      (document.getElementById('winners-view')).innerHTML = renderWinners();
    }

    if (target.classList.contains('table-time')) {
      setSortOrder('time');
      await updateStateWinners();
      (document.getElementById('winners-view')).innerHTML = renderWinners();
    }
  });

  (document.getElementById('create')).addEventListener('submit', async (event) => {
    event.preventDefault();
    // eslint-disable-next-line max-len
    const car = Object.fromEntries(new Map([...event.target].filter(({ name }) => !!name).map(({ value, name }) => [name, value]))); // 50.09
    await createCar(car);
    await updateStateGarage();
    (document.getElementById('garage')).innerHTML = renderGarage();
    (document.getElementById('create-name')).value = '';
    // eslint-disable-next-line no-param-reassign
    event.target.disabled = true;
  });

  (document.getElementById('update')).addEventListener('submit', async (event) => {
    event.preventDefault();
    // eslint-disable-next-line max-len
    const car = Object.fromEntries(new Map([...event.target].filter(({ name }) => !!name).map(({ value, name }) => [name, value]))); // !!!!!!
    await updateCar(selectedCar.id, car);
    await updateStateGarage();
    (document.getElementById('garage')).innerHTML = renderGarage();
    (document.getElementById('update-name')).value = '';
    (document.getElementById('update-name')).disabled = true;
    (document.getElementById('update-color')).disabled = true;
    (document.getElementById('update-submit')).disabled = true;
    (document.getElementById('update-color')).value = '#ffffff';
    selectedCar = null;
  });
};

export default listen;
