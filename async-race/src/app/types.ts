export interface Car {
  name: string,
  color: string,
  id: number
}
export interface CreateCar {
  name: string,
  color: string,
}
export interface Winner {
  car: Car | RenderCar,
  name: string,
  color: string,
  id: number,
  time: number,
}
export interface GETCAR {
  items: Array<Car | RenderCar>,
  count: number,
}
export interface STARTENGINE {
  velocity: number,
  distance: number,
}
export interface DRIVE {
  success: boolean,
}
export interface WinnerItem {
  page: number,
  limit: number,
  sort: string,
  order: string,
}
export interface WinnersItems {
  id: number,
  wins: number,
  time: number,
}
export interface SaveWinner {
  id: number,
  time: number,
}
export interface AnimationItem {
  [id: string]: number;
}
export interface AnimationObject {
  [id: number]: AnimationItem
}
export interface RaceDone {
  id: number,
  success: boolean,
  time: number,
}
export interface RaceWinner {
  name?: string,
  color?: string,
  id?: number,
  time: number,
}
export interface NewWinner {
  name?: string,
  color?: string,
  id: number,
  time: number,
}
export interface RenderCar {
  id: number,
  name: string,
  color: string,
  isEngineStarted?: boolean
}
export interface WinnerCar {
  id: number,
  wins: number,
  time: number,
  car: Car,
}
// export interface Winners {
//   items: WinnerCar,
//   count: number,
// }
export interface StoreObj {
  carsPage: number,
  cars: Array<Car>,
  carsCount: number,
  winnersPage: number,
  winners: Array<WinnerCar>,
  winnersCount: number,
  animation: AnimationObject,
  view: string,
  sortBy: string,
  sortOrder: string,
}
