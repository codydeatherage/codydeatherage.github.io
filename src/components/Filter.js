import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
/* import Collapse from '@kunukn/react-collapse'; */
class Filter extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    render(){
        return(
            <div>
                <form className="needs-validation" novalidate>
                    <div className="form-row">
                        <div className="col-md-4 mb-3">
                            <select class="custom-select custom-select-lg mb-3" id="first-type-select">
                                <option value="" disabled selected hidden>First Type</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <select class="custom-select custom-select-lg mb-3" id="second-type-select">
                                <option value="" disabled selected hidden>Second Type</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Search!</button>
                </form>
            </div>
        )
    }
}

export default Filter;