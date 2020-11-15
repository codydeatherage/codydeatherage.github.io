import React, { useEffect, useState } from 'react';
import './App.css';

import List from './components/List';
import WithLoading from './components/withListLoading';

import ResultCard from './components/ResultCard';

const ListWithLoading = WithLoading(List);
function App() {
  const [appState, setAppState] = useState({
    result: null,
    isLoading: false,
    names : [],
    numResults : 50
  });

  const names = [];
  useEffect(() => {
    setAppState({isLoading: true});
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=893&offset=0`;
    console.log(apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log('API RESULT', result.results.name);
        for(let res of result.results){
          names.push(res.name);
        }
        setAppState({isLoading: false, result: result, names: names});
        console.log(names);
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
         {/*  </ResultCard> */}
     

    </div>
  );
}

export default App;
