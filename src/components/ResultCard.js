import React,{Component} from 'react';

class ResultCard extends Component{
    constructor(props){
        super(props);
        this.pokeNames = [];
        this.typeColor = { //from https://bulbapedia.bulbagarden.net/wiki/Category:Type_color_templates
            bug :'#A8B820', dark: '#705848', dragon: '#7038f8',
            electric: '#f8d030', fairy: '#ee99ac', fighting: '#c03028',
            fire: '#f08030', flying: '#A890f0', ghost: '#705898',
            grass: '#78c850', ground: '#e0c068', ice: '#98d8d8',
            normal: '#a8a878', poison: '#a040a0', psychic: '#f85888',
            rock: '#B8a038', steel: '#b8b8d0', water: '#6890f0'
        }
        
        this.numResults = props.numResults;
        for(let res of props.result.results){
            this.pokeNames.push(res.name);
        }

        this.state = {
            data : this.pokeNames,
            readyForData: false
        }
    }

    componentDidMount(){
        /* this.setState({readyForData: true}); */
        const pokeInfo = [];
         for(let i = 0; i < this.numResults; i++){
            let apiUrl = `https://pokeapi.co/api/v2/pokemon/${this.pokeNames[i]}`;
            fetch(apiUrl)
            .then((res) => res.json())
            .then( (result) => {
                pokeInfo.push(result);
                if(i === this.numResults -1){ //only change state on last iteration
                    this.setState({data: pokeInfo, readyForData: true});
                }
            });
        } 
    }

  render(){
    return (
        <div className="card-container">   
        {
            this.state.data.map((data, index) => {
                if(this.state.readyForData){
                    console.log(data.types.length);
                    if(data.types.length === 1){
                        return(
                            <div key={index} className={`card types-1 type-${data.types[0].type.name}`}>
                                <img className='card-img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt=""></img> 
                                <h1 className='card-name'>{data.name} </h1> 
                            </div> 
                        )
                    }
                    else if(data.types.length === 2){
                        return(
                            <div key={index} className={`card types-2`}>
                                <div className="bg-first"></div>
                                <div className="bg-second"></div>
                                <img className='card-img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt=""></img> 
                                <h1 className='card-name'>{data.name} </h1> 
                            </div>
                        );
                    }

                }
                else{
                    return(
                        <h1>GETINA DATA</h1>)
                }
            })
        }     
        </div>
    );
    }
}

export default ResultCard;