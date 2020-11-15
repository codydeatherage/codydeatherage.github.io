import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import WithLoading from './components/withListLoading';

const ListWithLoading = WithLoading(List);
function App() {
  const [appState, setAppState] = useState({
    result: null,
    isLoading: false,
    names : [],
    numResults : 50
  });

  const names = [];
  useEffect(async () => {
    setAppState({isLoading: true});
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=893&offset=0`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then( (result) => {
        for(let res of result.results){
          names.push(res.name);
        }
        setAppState({isLoading: false, result: result, names: names, numResults:50});
      });
  }, [setAppState]); 
 
  return (
    <div className='App'>
      <div className='banner-top'>
        Pokemans
      </div>
        <ListWithLoading
          isLoading={appState.isLoading}
          result={appState.result}
          numResults={appState.numResults}   
        />
    </div>
  );
}

export default App;
