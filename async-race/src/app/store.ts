import { getCars, getWinners } from './api';

const { items: cars, count: carsCount } = await getCars(1);
const { items: winners, count: winnersCount } = await getWinners({
  page: 1, limit: 10, sort: '', order: '',
});

export default {
  carsPage: 1,
  cars,
  carsCount,
  winnersPage: 1,
  winners,
  winnersCount,
  animation: {},
  view: 'garage',
  sortBy: '',
  sortOrder: '',
  // sortBy: null,
  // sortOrder: null,
};
