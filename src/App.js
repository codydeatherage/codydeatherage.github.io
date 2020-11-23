import React, { Component, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import store from './Store';
import './App.css';
import List from './components/List';
import Button from 'react-bootstrap/Button';
import Collapse from '@kunukn/react-collapse';
import WithLoading from './components/withListLoading';
import Filter from './components/Filter';

const ListWithLoading = WithLoading(List);
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      collOpen : false,
      isLoading: false
    }
  }


  render(){
    console.log('AOO', this.props.numResults);
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
                onClick={() => this.setState({collOpen: !this.state.collOpen})}
                aria-controls="example-collapse-text"
                aria-expanded={this.state.collOpen}
              > Filter
              <i className="fa fa-caret-down" id="caret-left"></i> 
              <i className="fa fa-caret-down" id="caret-right"></i>
              </Button>
              <Collapse isOpen={this.state.collOpen} className="collapse-css-transition">
                <div className='card filter-card' id="example-collapse-text">
                  <Filter></Filter>  
                </div>
              </Collapse>
            </div>
{/*         <ListWithLoading
          isLoading={appState.isLoading}
          result={appState.result}
          numResults={appState.numResults}   
        /> */}
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {numResults: state.numResults}
}
 
export default connect(mapStateToProps)(App)
