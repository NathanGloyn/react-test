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
            <div className="search">
                <label htmlFor="searchCriteria">Search:</label>
                <input id="searchCriteria" className="searchInput" type="text" onChange={this.search} placeholder="cake name"  ></input>            
            </div>
        )
    }
}


export default Search;