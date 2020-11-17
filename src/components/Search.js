import React, {Component} from 'react';

class Search extends Component{
    render(){
        return(
            <div>
                <i class="fas fa-search"></i>
                <input className="search-bar" type="search"></input>
            </div>
        )
    }
}

export default Search;