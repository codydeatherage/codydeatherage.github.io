import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/List';
import withListLoading from './components/withListLoading';

function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    result: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=100&offset=200`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log('useEffect? ', result);
        setAppState({ loading: false, result: result });
      });
  }, [setAppState]);

  return (
    <div className='App'>
      <div className='banner-top'>
        <h1>Pokemans</h1>
      </div>
      <div className='repo-container'>
        <ListLoading isLoading={appState.loading} result={appState.result} />
      </div>

    </div>
  );
}

export default App;
