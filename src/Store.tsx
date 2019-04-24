import React from 'react';
import {IAction, IEpisode, IState} from './interfaces';

const initialState: IState = {
  episodes: [],
  favorites: []
}
export const Store = React.createContext<IState | any>(initialState)

function reducer(state: IState, action: IAction): IState {
  console.log(action.payload);
  console.log('here are the favorites', state.favorites);
  switch(action.type){
    case "FETCH_DATA":
      return {...state, episodes: action.payload}
    case 'ADD_FAV':
      return {...state, favorites: [...state.favorites, action.payload]}
    case "REMOVE_FAV":
      return {...state, favorites: action.payload}
    default:
      return state;
  }
}

export function StoreProvider(props: any): JSX.Element{
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
}

//https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes
