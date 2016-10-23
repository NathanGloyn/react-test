import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class AddCake extends Component {

    constructor(props){
        super(props);
        this.displayForm = this.displayForm.bind(this);
    }

    displayForm(){
        this.props.onClick();
    }

    render (){
       return(
           <div className="addCakeLink">
                <a href='#' onClick={this.displayForm}><FontAwesome name="plus" />new cake</a>
           </div>
       );
    }
}

export default AddCake;