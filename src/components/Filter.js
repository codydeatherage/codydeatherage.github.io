import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
/* import Collapse from '@kunukn/react-collapse'; */
class Filter extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
            setOpen: false
        }
    }
    render(){
        return(
        

            <div className="filter-container">
                <Button id="filter-btn"
                    onClick={() => this.setState({open: !this.state.open})}
                    aria-controls="example-collapse-text"
                    aria-expanded={this.state.open}
                >
                    click
                </Button>
                <Collapse isOpen={this.state.open} id="filter-panel">
                    <div id="example-collapse-text">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                    terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                    labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </Collapse>


                {/* <div id="filter-panel" className="collapse">
                <h1> Lorem ipsum dolor sit amet, consectetur adipisicing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h1>
                    </div>  */}
            </div>
           
        )
    }
}

export default Filter;