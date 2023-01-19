import {
  // eslint-disable-next-line max-len
  getCar, getCars, createCar, deleteCar, updateCar, startEngine, stopEngine, saveWinner, getWinners, deleteWinner, drive,
} from './api';
import store from './store';
import {
  animation, getDistanceBetweenElements, race, generateRandomCars,
} from './utils';
// import { CarInfo } from '../../core/types/index';

let selectedCar = null;

const getCarImage = (color) => `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">

  <defs>
  </defs>
  <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
    <path d="M 75.479 36.045 l -7.987 -1.22 l -2.35 -2.574 c -5.599 -6.132 -13.571 -9.649 -21.874 -9.649 h -6.245 c -1.357 0 -2.696 0.107 -4.016 0.296 c -0.022 0.004 -0.044 0.006 -0.066 0.01 c -7.799 1.133 -14.802 5.468 -19.285 12.106 C 5.706 37.913 0 45.358 0 52.952 c 0 3.254 2.647 5.9 5.9 5.9 h 3.451 c 0.969 4.866 5.269 8.545 10.416 8.545 s 9.447 -3.679 10.416 -8.545 h 30.139 c 0.969 4.866 5.27 8.545 10.416 8.545 s 9.446 -3.679 10.415 -8.545 H 84.1 c 3.254 0 5.9 -2.646 5.9 -5.9 C 90 44.441 83.894 37.331 75.479 36.045 z M 43.269 26.602 c 7.065 0 13.848 2.949 18.676 8.094 H 39.464 l -3.267 -8.068 c 0.275 -0.009 0.55 -0.026 0.826 -0.026 H 43.269 z M 32.08 27.118 l 3.068 7.578 H 18.972 C 22.429 30.813 27.018 28.169 32.08 27.118 z M 19.767 63.397 c -3.652 0 -6.623 -2.971 -6.623 -6.622 c 0 -3.652 2.971 -6.623 6.623 -6.623 s 6.623 2.971 6.623 6.623 C 26.39 60.427 23.419 63.397 19.767 63.397 z M 70.738 63.397 c -3.652 0 -6.623 -2.971 -6.623 -6.622 c 0 -3.652 2.971 -6.623 6.623 -6.623 c 3.651 0 6.622 2.971 6.622 6.623 C 77.36 60.427 74.39 63.397 70.738 63.397 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill:${color}; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
  </g>
  </svg>
`;

const renderCar = ({
  id, name, color, isEngineStarted,
}) => `
  <div class="general-buttons">
  <button class="button select-button" id="select-car-${id}">Select</button>
  <button class="button remove-button" id="remove-car-${id}">Remove</button>
  <span class="car-name">${name}</span>
  </div>
  <div class="road">
  <div class="launch-pad">
    <div class="color-panel">
      <button class="icon start-engine-button" id="start-engine-car-${id}" ${isEngineStarted ? 'disabled' : ''}>A</button>
      <button class="icon stop-engine-button" id="stop-engine-car-${id}" ${isEngineStarted ? 'disabled' : ''}>B</button>
    </div>
    <div class="car" id="car-${id}">
      ${getCarImage(color)}
    </div>
  </div>
  <div class="flag" id="flag-${id}">&#127937;</div>
  </div>
`;

const renderGarage = () => `
  <h1>Garage (${store.carsCount})</h1>
  <h2>Page #${store.carsPage}</h2>
  <ul class="garage">
    ${store.cars.map((car) => `
    <li>${renderCar(car)}</li>
    `).join('')}
  </ul>
`;

const sorter = { byWins: 'wins', byTime: 'time' };

// eslint-disable-next-line no-return-assign
const renderWinners = () => `
  <h1>Winner (${store.winnersCount})</h1>
  <h2>Page #${store.winnersPage}</h2>
  <table class="table" cellspacing="0" border="0" cellpadding="0">
    <thead>
      <th>Number</th>
      <th>Car</th>
      <th>Name</th>
      <th class="table-button table-wins ${store.sortBy = sorter.byWins ? store.sortOrder : ''}" id="sort-by-wins">Wins</th>
      <th class="table-button table-time ${store.sortBy = sorter.byTime ? store.sortOrder : ''}" id="sort-by-time">Best time (seconds)</th>
    </thead>
    <tbody>
      ${store.winners.map((winner, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${getCarImage(winner.car.color)}</td>
          <td>${winner.car.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`;

export const render = async () => {
  const html = `
    <div class="menu">
      <button class="button garage-menu-button primary" id="garage-menu">To Garage</button>
      <button class="button winners-menu-button primary" id="winners-menu">To Winners</button>
    </div>
    <div id="garage-view">
      <div>
        <form class="form" id="create">
          <input class="input" id="create-name" name="name" type="text">
          <input class="color" id="create-color" name="color" type="color" value="#ffffff">
          <button class="button" type="submit">Create</button>
        </form>
        <form class="form" id="update">
          <input class="input" id="update-name" name="name" type="text" disabled>
          <input class="color" id="update-color" name="color" type="color" value="#ffffff" disabled>
          <button class="button" id="update-submit" type="submit">Update</button>
        </form>
      </div>
      <div class="race-controls">
        <button class="button race-button primary" id="race">Race</button>
        <button class="button reset-button primary" id="reset">Reset</button>
        <button class="button generator-button primary" id="generator">Generate Cars</button>
      </div>
      <div id="garage">
        ${renderGarage()}
      </div>
      <div>
        <p class="message" id="message"></p>
      </div>
    </div>
    <div id="winners-view" style="display: none;">
      ${renderWinners()}
    </div>
    <div class="pagination">
      <button class="button primary prev-button" id="prev" disabled>Prev</button>
      <button class="button primary next-button" id="next" disabled>Next</button>
    </div>
  `;
  const root = document.createElement('div');
  root.innerHTML = html;
  document.body.append(root);
};

const MAX_CARS_PER_PAGE = 7;

export const updateStateGarage = async () => {
  const { items, count } = await getCars(store.carsPage);
  store.cars = items;
  store.carsCount = count;

  if (store.carsPage * MAX_CARS_PER_PAGE < Number(store.carsCount)) {
    // console.log(store.carsPage);
    ((document.getElementById('next'))).disabled = false;
  } else {
    document.getElementById('next').disabled = true;
  }
  if (store.carsPage > 1) {
    ((document.getElementById('prev'))).disabled = false;
  } else {
    ((document.getElementById('prev'))).disabled = true;
  }
};

const MAX_ITEM_PER_PAGE = 10;

export const updateStateWinners = async () => {
  // eslint-disable-next-line max-len
  const { items, count } = await getWinners({ page: store.winnersPage, sort: store.sortBy, order: store.sortOrder });
  store.winners = items;
  store.winnersCount = count;
  console.log(store.winnersPage);
  console.log(store.winnersCount);

  if (store.winnersPage * MAX_ITEM_PER_PAGE < Number(store.winnersCount)) {
    ((document.getElementById('next'))).disabled = false;
  } else {
    ((document.getElementById('next'))).disabled = true;
  }
  if (store.winnersPage > 1) {
    ((document.getElementById('prev'))).disabled = false;
  } else {
    ((document.getElementById('prev'))).disabled = true;
  }
};

const startDriving = async (id) => {
  const startButton = document.getElementById(`start-engine-car-${id}`);
  console.log(startButton);
  startButton.disabled = true;
  startButton.classList.toggle('enabling', true);

  const { velocity, distance } = await startEngine(id);
  const time = Math.round(distance / velocity);

  startButton.classList.toggle('enabling', false);
  (document.getElementById(`stop-engine-car-${id}`)).disabled = false;

  const car = document.getElementById(`car-${id}`);
  const flag = document.getElementById(`flag-${id}`);
  const htmlDistance = Math.floor(getDistanceBetweenElements(car, flag)) + 100;

  store.animation[id] = animation(car, htmlDistance, time);

  const { success } = await drive(id);
  console.log(success);

  if (!success) window.cancelAnimationFrame(store.animation[id].id);

  return { success, id, time };
};

const stopDriving = async (id) => {
  const stopButton = document.getElementById(`stop-engine-car-${id}`);
  console.log(stopButton);
  stopButton.disabled = true;
  stopButton.classList.toggle('enabling', true);
  await stopEngine(id);

  // const { velocity, distance } = await startEngine(id);
  // const time = Math.round(distance / velocity);

  stopButton.classList.toggle('enabling', false);
  (document.getElementById(`start-engine-car-${id}`)).disabled = false;

  const car = document.getElementById(`car-${id}`);
  car.style.transform = 'translateX(0)';

  if (store.animation[id]) window.cancelAnimationFrame(store.animation[id].id);
};

const setSortOrder = async (sortBy) => {
  store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc';
  store.sortBy = sortBy;
};

export const listen = () => {
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
