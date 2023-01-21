export interface Car {
  name: string,
  color: string,
  id: number
}
export interface GETCAR {
  items: Array<Car>,
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
