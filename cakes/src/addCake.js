import React, { Component } from 'react';
import CakeForm from './cakeForm'

class AddCake extends Component {

    constructor(props){
        super(props);
        this.displayAdd = this.displayAdd.bind(this);
        this.cakeAdded = this.cakeAdded.bind(this);

        this.state={
            displayingForm: false
        }
    }

    displayAdd(){
        this.setState({displayingForm: !this.state.displayingForm});
        this.props.onDisplay();
    }

    cakeAdded(cake){
        this.props.onAdd(cake);
        this.setState({displayingForm: !this.state.displayingForm});
    }

    render (){
        let display = null;
        if(!this.state.displayingForm){
            display = <a href='#' onClick={this.displayAdd}>Add cake</a>
        } else {
            display =<div>
                        <h2>Add a new cake</h2> 
                        <CakeForm onCancel={this.displayAdd} onSubmit={this.cakeAdded}/>
                     </div>
        }

       return(
           <div>
            {display}
           </div>
       );
    }
}

export default AddCake;