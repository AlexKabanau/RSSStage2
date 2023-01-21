import { getCars } from './api';
import { StoreObj } from './types';
// import { AnimationItem } from './types';

const { items: cars, count: carsCount } = await getCars(1);
// const { items: winners, count: winnersCount } = await getWinners({
//   page: 1, limit: 10, sort: '', order: '',
// });

// eslint-disable-next-line import/prefer-default-export
const store: StoreObj = {
  carsPage: 1,
  cars,
  carsCount,
  winnersPage: 1,
  winners: [],
  winnersCount: 0,
  animation: {},
  view: 'garage',
  sortBy: '',
  sortOrder: '',
  // sortBy: null,
  // sortOrder: null,
};
export default store;
