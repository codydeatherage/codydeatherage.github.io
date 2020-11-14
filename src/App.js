import React, { useEffect, useState } from 'react';
import './App.css';

import List from './components/List';
import WithLoading from './components/withListLoading';

import ResultCard from './components/ResultCard';

const ListWithLoading = WithLoading(List);
function App() {
   const [appState, setAppState] = useState({
    result: null,
    isLoading: false
  });
  const ids = [];
  useEffect(() => {
    setAppState({isLoading: true});
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`;
    console.log(apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log('API RESULT', result.results);
        setAppState({isLoading: false, result: result});
      });
  }, [setAppState]); 
 
   
  
  return (
    <div className='App'>
      <div className='banner-top'>
        Pokemans
      </div>
     
        <ListWithLoading isLoading={appState.isLoading} result={appState.result} />
         {/*  </ResultCard> */}
     

    </div>
  );
}

export default App;
