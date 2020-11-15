import React,{Component} from 'react';

class ResultCard extends Component{
    constructor(props){
        super(props);
        this.pokeNames = [];
        this.numResults = props.numResults;
        for(let res of props.result.results){
            this.pokeNames.push(res.name);
        }

        this.state = {
            data : this.pokeNames
        }
    }

    componentDidMount(){
        const pokeInfo = [];
         for(let i = 0; i < this.numResults; i++){
            let apiUrl = `https://pokeapi.co/api/v2/pokemon/${this.pokeNames[i]}`;
            fetch(apiUrl)
            .then((res) => res.json())
            .then( (result) => {
                pokeInfo.push(result);
                if(i === this.numResults -1){
                    this.setState({data: pokeInfo});
                }
            });
        } 
    }
  render(){
    return (
        <div className="card-container">   
        {
            this.state.data.map((data, index) => {
                return(  
                <div key={index} className='card '>
                    <img className='card-img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt=""></img> 
                    <h1 className='card-name'>{data.name} </h1> 
                </div>
                );
            })
        }     
        </div>
    );
    }
}

export default ResultCard;