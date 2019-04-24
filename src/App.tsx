import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Store} from './Store';
import {IAction, IEpisode} from './interfaces';


export default function App(){
  const {state, dispatch} = React.useContext(Store)

  React.useEffect(() => {
     state.episodes.length === 0 && fetchDataAction()
  })


  const fetchDataAction = async () => {
    const URL = 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes'
    const data = await fetch(URL)
    const dataJSON = await data.json();
    // console.log(dataJSON._embedded.episodes);
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    })
  }


  const toggleFavAction = (episode: IEpisode): IAction => {
    const episodeInFav = state.favorites.includes(episode);
    let dispatchObj = ({
      type: 'ADD_FAV',
      payload: episode
    })
    if(episodeInFav){
      const favWithoutEpisode = state.favorites.filter((fav: IEpisode) => fav.id !== episode.id);
      dispatchObj = {
        type: 'REMOVE_FAV',
        payload: favWithoutEpisode
      }
    }
    return dispatch(dispatchObj);
}


   console.log(state);
  return(
    <React.Fragment>
      <h1>Rick and Morty</h1>
      <section>
        {state.episodes.map((episode: IEpisode) => {
          return(
            <section key={episode.id}>
              <img src={episode.image.medium} alt={`Rick and Mort ${episode.name}`} />
              <div>{episode.name}</div>
              <section>
                <div>Season: {episode.season} Episode Number: {episode.number}</div>
                <button type="button" onClick={() => toggleFavAction(episode)}>
                {state.favorites.find((fav: any) => fav.id === episode.id)? "Unfav": "Fav"}
                </button>
              </section>
            </section>
          )
        })}
      </section>
    </React.Fragment>
  )
}
