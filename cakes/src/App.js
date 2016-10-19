import React, { Component } from 'react';
import './App.css';
import Search from  './search';
import CakeList from './cakeList';
import DataSource from './dataSource'

class App extends Component {

  constructor(props){
    super(props);
    this.cakes = [];
    this.state= {cakes: undefined};
    this.search = this.search.bind(this);
  }
  
  componentDidMount(){
    DataSource.getData( function (cakes) {
        this.cakes =  cakes;
        this.setState({cakes: this.cakes}); 
			}.bind(this));
  }

  search(criteria){
    if(criteria){
      let filteredCakes = this.cakes.filter(x => x.title.indexOf(criteria) > -1);
      this.setState({cakes: filteredCakes});
    } else {
      this.setState({cakes: this.cakes});
    }
  }

  render() {
    return (
      <div className="App">
        <Search onSearch={this.search} />
        <CakeList cakes={this.state.cakes} />
      </div>
    );
  }

}

export default App;
