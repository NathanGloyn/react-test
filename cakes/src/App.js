import React, { Component } from 'react';
import './App.css';
import Search from  './search';
import CakeList from './cakeList';
import DataSource from './dataSource';
import AddCake from './addCake';

class App extends Component {

  constructor(props){
    super(props);
    this.cakes = [];
    this.state= {cakes: undefined, formDisplayed: false};
    this.search = this.search.bind(this);
    this.displayForm = this.displayForm.bind(this);
    this.addCake = this.addCake.bind(this);
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

  addCake(cake){
    this.cakes.push(cake);
    this.setState({cakes: this.cakes});
    this.displayForm();
  }

  displayForm(){
    this.setState({formDisplayed: !this.state.formDisplayed});
  }

  render() {

    let searchBox = null;
    let cakeList = null;
    if(!this.state.formDisplayed) {
      cakeList = <CakeList cakes={this.state.cakes} />;
      searchBox = <Search onSearch={this.search} />;
    }

    return (
      <div className="App">
        {searchBox}
        <AddCake onDisplay={this.displayForm} onAdd={this.addCake} /> 
        {cakeList}
      </div>
    );
  }

}

export default App;
