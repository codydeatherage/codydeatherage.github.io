import React from 'react';
const List = (props) => {
  const { result } = props;
  if (!result || result.length === 0) return <p>No repos, sorry</p>;
  return (
    <div>
        {result.results.map((pokemon) => {
            return(
            <li key={pokemon.name} className='list'>
                <span className='repo-text'>{pokemon.name} </span>
            </li>
             );
        })}
    </div>
  );
};

export default List;
