import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import WithLoading from './components/withListLoading';

const ListWithLoading = WithLoading(List);
function App() {
  const [appState, setAppState] = useState({
    result: null,
    isLoading: false,
    numResults : 50
  });

  const names = [];
  useEffect(() => {
    async function fetchData(){
      setAppState({isLoading: true});
      const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=893&offset=0`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then( (result) => {
          for(let res of result.results){
            names.push(res.name);
          }
          setAppState({isLoading: false, result: result, numResults:50});
        });
    }
    fetchData();

  }, [setAppState]); 
 
  return (
    <div className='App'>
      <div className='banner-top'>
        Pokemans
      </div>
        <div className="search-section">
          <i className="fa fa-search"></i>
          <input className="search-bar" type="search"></input>
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
