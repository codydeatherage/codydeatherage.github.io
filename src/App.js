import React, { useEffect, useState } from 'react';

import './App.css';
import List from './components/List';
import Button from 'react-bootstrap/Button';
import Collapse from '@kunukn/react-collapse';
import WithLoading from './components/withListLoading';
import Filter from './components/Filter';

const ListWithLoading = WithLoading(List);
function App() {
  const [appState, setAppState] = useState({
    result: null,
    isLoading: false
  });

  const [collState, setCollState] = useState({
    open: false
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
          setAppState({isLoading: false, result: result});
        });
    }
    fetchData();

  }, [setAppState]); 
 
  return (
    <div className='App'>
      <div className='banner-top'>
        <div className='inside-banner'></div>
        Pokedex Under Construction :)
      </div>
      <div>
        current task: finish filter section
      </div>
        <div className="search-section">
          <i className="fa fa-search"></i>
          <input className="search-bar" type="search"></input>
        </div>
        <div className="filter-container">
          <Button id="filter-btn"
            onClick={() => setCollState({open: !collState.open})}
            aria-controls="example-collapse-text"
            aria-expanded={collState.open}
          > Filter
          <i class="fa fa-caret-down" id="caret-left"></i> 
          <i class="fa fa-caret-down" id="caret-right"></i>
          </Button>
          <Collapse isOpen={collState.open} className="collapse-css-transition">
            <div className='card filter-card' id="example-collapse-text">
              <Filter></Filter>  
            </div>
          </Collapse>
        </div> 
{        <ListWithLoading
          isLoading={appState.isLoading}
          result={appState.result}
          /* numResults={appState.numResults}  */  
        />}
    </div>
  );
}

export default App;
