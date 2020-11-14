import React, {Component} from 'react';
import ResultCard from './ResultCard';

async function getPokeImg (name){
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((result) => {
      console.log(result.sprites.front_default);
      return result.sprites.front_default.toString();
    });
}


const List = (props) => {
  const { result } = props;
  if (!result || result.length === 0) return <p>No repos, sorry</p>;
  return (
    <ResultCard result={result} ></ResultCard>
  );
}; 

export default List;
