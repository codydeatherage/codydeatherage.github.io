import React,{Component} from 'react';

class ResultCard extends Component{
    componentDidMount(){
        console.log(this.props.result.results);
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${this.props.result.results.name}`;
        fetch(apiUrl)
        .then((res) => res.json())
        .then((result) => {
            console.log(result.id);
        })
    }
    getPokeID = (url) =>{
        const apiUrl = url;
        fetch(apiUrl)
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            return result.id
        })
    }

  render(){
    const { result } = this.props;
    return (
        <div className="card-container">
        {result.results.map((pokemon) => {
            {console.log('POKE', pokemon)}
            return(
                
              <div key={pokemon.name} className='card '>
    
                   <img className='card-img' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png' alt=""></img> 
                   <h1 className='card-name'>{pokemon.name} </h1> 
              {/*   <h1 className='card-name'>{this.getPokeID(pokemon.url)}</h1> */}

              </div>
             );
        })}
    </div>
    );
    }
};

export default ResultCard;