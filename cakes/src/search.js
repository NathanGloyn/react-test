import React, { Component } from 'react';

class Search extends Component{

    constructor(props){
        super(props);
        this.search = this.search.bind(this);
    }

    search(e){
        e.preventDefault();

        let searchCriteria = '';

        if(e.target.value){
            searchCriteria = e.target.value;
        }

        this.props.onSearch(searchCriteria);
    }

    render(){
        return (
            <div>
                <label htmlFor="filterCriteria">Filter</label>
                <input id="filterCriteria" type="text" onChange={this.search} ></input>            
            </div>
        )
    }
}

export default Search;