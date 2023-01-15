const base = 'http://127.0.0.1:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export const getCars = async (page: number, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number) => (
  await fetch(`${garage}/${id}`)
).json();

export const createCar = async (body: string) => (
  await fetch(`${garage}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

export const deleteCar = async (id: number) => (
  await fetch(`${garage}/${id}`, { method: 'DELETE' })
).json();

export const updateCar = async (id: number, body: string) => (
  await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

export const startEngine = async (id: number) => (
  await fetch(`${engine}?id=${id}&status=started`)
).json();

export const stopEngine = async (id: number) => (
  await fetch(`${engine}?id=${id}&status=stop`)
).json();

export const drive = async (id: number) => {
  const res = await fetch(`${engine}?id=${id}&status=drive`).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

const getSortOrder = (sort: string, order: string) => {
  if (sort && order) {
    return `&_sort=${sort}&_order=${order}`;
  }
  return '';
};

export const getWinners = async ({ page = 1, limit = 10, sort: string, order: string }) => {
  const response = await fetch(`${winners}?_page=${page}&limit=${limit}${getSortOrder(sort, order)}`);
  const items = await response.json();

  return {
    items: await Promise.all(items.map(async winner => ({ ...winner, car: await getCar(winner.id) }))),
    count: response.headers.get('X-Total-Count');
  };
};

export const getWinner = async (id: number) => (await fetch(`${winners}/${id}`)).json();

export const getWinnerStatus =async (id: number) => (await fetch(`${winners}/${id}`)).status;

export const deleteWinner =async (id: number) => (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

export const createWinner =async (body: string) => (
  await fetch(winners, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  })
).json();

export const updateWinner = async (id: number, body: string) => (
  await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  })
).json();

export const saveWinner =async ({ id: number, time }) => {
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
      time: time < winner.time ? time : winner.time
    });
  }
};
