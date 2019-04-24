export interface IEpisode{
  airdate: string
  airstamp: string
  airtime: string
  id: number
  image: {medium: string, original: string}
  name: string
  number: number
  runtimer: number
  season: number
  summary: string
  url: string
}

export interface IState {
  episodes: Array<any>,
  favorites: Array<any>
}

export interface IAction {
  type: string,
  payload: any
}
