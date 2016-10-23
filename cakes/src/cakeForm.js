import React, { Component } from 'react';
import update from 'react-addons-update';

class CakeForm extends Component {

    constructor(props) {
        super(props);

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fieldChanged = this.fieldChanged.bind(this);
        this.valid = this.valid.bind(this);
        this.formIsValid = this.formIsValid.bind(this);

        this.state = {
            title: props.cake ? props.cake.title  : '',
            desc: props.cake ? props.cake.desc : '',
            image: props.cake ? props.cake.image : '',
            status: {
                title: null,
                desc: null,
                image: null,
                valid: false
            }
        }

        this.editing = false;
        
        // Check if we have been given any values
        // if so we're editing existing data
        if(props.title || props.desc || props.image){
            this.editing = true;
        }
    }

    handleSubmit(e) {
        
        e.preventDefault();
        if(this.formIsValid()){
            this.props.onSubmit({
                title: this.state.title,
                desc: this.state.desc,
                image: this.state.image
            });
        }
    }

    handleCancel(e){
        e.preventDefault();
        this.props.onCancel();
    }

    formIsValid(){

        if(this.state.title && this.state.title.length > 0 && 
           this.state.desc && this.state.desc.length > 0 &&
           this.state.image && this.state.image.length > 0) {
               return true;
           }

        return false;
    }

    fieldChanged(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    valid(event){
        let statusValue = null;
        if(!event.target.value){
            statusValue = 'You must enter this value';
        } 

        this.setState({
            status: update(this.state.status, {
                [event.target.id]: {$set: statusValue},
                valid: {$set: this.formIsValid()}
            })
        });
    }

    render() {
        const errorStyle = {
                             color: 'red',
                             fontWeight: 'bold',
                             marginLeft: '10px',
                             marginBottom: '10px'
                        };

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <h2>{this.state.title ? 'Edit' : 'Add new'} cake</h2>
                </div>            
                <div>
                    <label htmlFor="title">Title:</label>
                    <div>
                        <input id="title"
                            type="text"
                            value={this.state.title}
                            onChange={this.fieldChanged}
                            onBlur={this.valid}
                        />
                        <div>
                            {this.state.status.title ? <span id="titleError" style={errorStyle}>{this.state.status.title}</span> : null}
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="desc">Description:</label>
                    <div>
                        <textarea id="desc"
                                  cols={10}
                                  rows={4}
                                  value={this.state.desc}
                                  onChange={this.fieldChanged}
                                  onBlur={this.valid}
                        />
                        <div>
                            {this.state.status.desc ? <span id="descError" style={errorStyle}>{this.state.status.desc}</span> : null}
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <div>
                        <input id="image"
                            type="text"
                            value={this.state.image}
                            placeholder="Add Url to image" 
                            onChange={this.fieldChanged}
                            onBlur={this.valid}         
                        />
                        <div>         
                            {this.state.status.image ? <span id="imageError" style={errorStyle}>{this.state.status.image}</span> : null}
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <button id="cancel" onClick={this.handleCancel}>Cancel</button>
                        <button id="submit" disabled={!this.state.status.valid} type="submit">{this.editing ? 'Update' : 'Add'}</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default CakeForm;