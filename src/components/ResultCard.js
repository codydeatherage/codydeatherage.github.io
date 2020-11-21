import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

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
        
        //this.numResults = props.numResults;
        for(let res of props.result.results){
            this.pokeNames.push(res.name);
        }

        this.state = {
            data : this.pokeNames,
            readyForData: false,
        }
    }

    componentDidMount(){
        /* this.setState({readyForData: true}); */
        console.log('inMOUNT results:', this.props.numResults);
        const pokeInfo = [];
         for(let i = 0; i < this.props.numResults; i++){
            let apiUrl = `https://pokeapi.co/api/v2/pokemon/${this.pokeNames[i]}`;
            fetch(apiUrl)
            .then((res) => res.json())
            .then( (result) => {
                pokeInfo.push(result);
                if(i === this.props.numResults -1){ //only change state on last iteration
                    this.setState({data: pokeInfo, readyForData: true});
                }
            });
        }
    }

  render(){
      console.log('results:', this.props.numResults);
    return (
        <div className="card-container">   
        {
            this.state.data.map((data, index) => {
                let child= 0;
                if(this.state.readyForData){
                    if(data.types.length === 1){
                        let cssProps = {'--card-bg-color': data.types[0].type.name};
                        let color = this.typeColor[`${data.types[0].type.name}`];
                        //console.log(color, data.types[0].type.name);
                        cssProps['--card-bg-color'] = color;
                        let idString = '';
                        idString = data.id.toString();
                        //console.log(idString.length);
                        switch(idString.length){
                            case 1 : idString = `00` + idString.toString(); break;
                            case 2: idString = `0` + idString.toString(); break;
                        }
                        //console.log(idString.length, data.name);
                        return(
                            <div key={index} style={cssProps} className={`card types-1 type-${data.types[0].type.name}`} id="result">
                                <div className='id-label'>{`No. ${idString}`}</div>
                                <img className='card-img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt=""></img> 
                                <h1 className='card-name'>{data.name} </h1>
                                {/* <div className='type-info'>{data.types[0].type.name}</div> */}
                            </div> 
                        )
                    }

                    else if(data.types.length === 2){
                        let cssProps = {'--card-bg-color': data.types[0].type.name,
                                        '--card-bg2-color': data.types[1].type.name};
                        let color = this.typeColor[`${data.types[0].type.name}`];
                        let color2 = this.typeColor[`${data.types[1].type.name}`];
                        cssProps['--card-bg-color'] = color;
                        cssProps['--card-bg2-color'] = color2;
                        let idString = '';
                        idString = data.id.toString();
                        //console.log(idString.length);
                        switch(idString.length){
                            case 1 : idString = `00` + idString.toString(); break;
                            case 2: idString = `0` + idString.toString(); break;
                        }
                        return(
                            <div key={index} style={cssProps} className='card'>
                                <div className='id-label'>{`No. ${idString}`}</div>
                                <img className='card-img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt=""></img> 
                                <h1 className='card-name'>{data.name} </h1> 
                            </div>
                        );
                    }

                }
                else{
                    return(
                        <div class="spinner-container">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        )
                }
            })
        }     
        </div>
    );
    }
}
const mapStateToProps = state => {
    return {numResults: state.numResults}
  }
   
export default connect(mapStateToProps)(ResultCard)