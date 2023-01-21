import {
  Car, GETCAR, STARTENGINE, DRIVE, WinnerItem, WinnersItems, SaveWinner, CreateCar,
} from './types';

const base = 'http://127.0.0.1:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;
// массив автомобилей и число
export const getCars = async (page: number, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  // let items: Array<Car>;
  const obj: GETCAR = {
    items: await response.json(),
    count: Number(response.headers.get('X-Total-Count')),
  };
  return obj;
};

export const getCar = async (id: number): Promise<Car> => (
  await fetch(`${garage}/${id}`)
).json();

export const createCar = async (body: CreateCar): Promise<Car> => (
  await fetch(`${garage}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

export const deleteCar = async (id: number): Promise<Car> => (
  await fetch(`${garage}/${id}`, { method: 'DELETE' })
).json();

export const updateCar = async (id: number, body: CreateCar): Promise<Car> => (
  await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

export const startEngine = async (id: number): Promise<STARTENGINE> => (
  await fetch(`${engine}?id=${id}&status=started`, { method: 'PATCH' })
).json();

export const stopEngine = async (id: number): Promise<STARTENGINE> => (
  await fetch(`${engine}?id=${id}&status=stopped`, { method: 'PATCH' })
).json();

export const drive = async (id: number): Promise<DRIVE> => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

const getSortOrder = (sort: string, order: string): string => {
  if (sort !== '' && order !== '') {
    return `&_sort=${sort}&_order=${order}`;
  }
  return '';
};

export const getWinners = async ({
  page, limit = 10, sort, order,
}: WinnerItem) => {
  const response = await fetch(`${winners}?_page=${page}&limit=${limit}${getSortOrder(sort, order)}`);
  const items: Array<WinnersItems> = await response.json();
  // console.log(items);
  // const obj: GETCAR = {
  //   items: await response.json(),
  //   count: Number(response.headers.get('X-Total-Count')),
  // };
  // return obj;
  return {
    // eslint-disable-next-line max-len
    items: await Promise.all(items.map(async (winner) => ({ ...winner, car: await getCar(winner.id) }))),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (id: number): Promise<WinnersItems> => (await fetch(`${winners}/${id}`)).json();

// eslint-disable-next-line max-len
export const deleteWinner = async (id: number): Promise<WinnersItems> => (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

const createWinner = async (body: WinnersItems): Promise<WinnersItems> => (
  await fetch(winners, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
).json();

export const updateWinner = async (id: number, body: WinnersItems): Promise<WinnersItems> => (
  await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
).json();

const getWinnerStatus = async (id: number) => (await fetch(`${winners}/${id}`)).status;

export const saveWinner = async ({ id, time }: SaveWinner) => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};
