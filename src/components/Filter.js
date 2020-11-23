import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import {connect} from 'react-redux';

class Filter extends Component{
    constructor(){
        super();
        this.state = {
            results: 25,
            open: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({results: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.dispatch({
            type: 'CHANGE_NUM_RESULTS',
            payload: event.target.value
        })
    }

    render(){
        return(
            <div>
                <form className="needs-validation" noValidate>
                    <div className="form-row">
                        <div className="col-md-4 mb-3">
                            <select  className="custom-select custom-select-lg mb-3" id="first-type-select">
                                <option value="" disabled selected hidden>First Type</option>
                                <option value="bug">Bug</option>
                                <option value="dragon">Dragon</option>
                                <option value="electric">Electric</option>
                                <option value="fairy">Fairy</option>
                                <option value="fire">Fire</option>
                                <option value="flying">Flying</option>                          
                                <option value="ghost">Ghost</option>
                                <option value="grass">Grass</option>
                                <option value="ground">Ground</option>
                                <option value="ice">Ice</option>
                                <option value="normal">Normal</option>  
                                <option value="poison">Poison</option>
                                <option value="psychic">Psychic</option>
                                <option value="rock">Rock</option>
                                <option value="steel">Steel</option>
                                <option value="water">Water</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <select className="custom-select custom-select-lg mb-3" id="second-type-select">
                                <option value="" disabled selected hidden>Second Type</option>
                                <option value="bug">Bug</option>
                                <option value="dark">Dark</option>
                                <option value="dragon">Dragon</option>
                                <option value="electric">Electric</option>
                                <option value="fairy">Fairy</option>
                                <option value="fire">Fire</option>
                                <option value="flying">Flying</option>                          
                                <option value="ghost">Ghost</option>
                                <option value="grass">Grass</option>
                                <option value="ground">Ground</option>
                                <option value="ice">Ice</option>
                                <option value="normal">Normal</option>  
                                <option value="poison">Poison</option>
                                <option value="psychic">Psychic</option>
                                <option value="rock">Rock</option>
                                <option value="steel">Steel</option>
                                <option value="water">Water</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <select onChange={this.handleSubmit} className="custom-select custom-select-lg mb-3">
                                <option value="" disabled selected hidden># Results</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Search!</button>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { numResults: state.numResults }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      dispatch
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Filter)