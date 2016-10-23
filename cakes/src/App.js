import React, { Component } from 'react';
import './App.css';
import Search from  './search';
import CakeList from './cakeList';
import DataSource from './dataSource';
import AddCake from './addCake';
import CakeForm from './cakeForm'

class App extends Component {

  constructor(props){
    super(props);
    this.cakes = [];
    this.cake=null;
    this.currentlyEditingCake = null;
    this.state= {cakes: undefined, formDisplayed: false, cake: null};
    this.search = this.search.bind(this);
    this.displayForm = this.displayForm.bind(this);
    this.editCake = this.editCake.bind(this);

    this.formCancel = this.formCancel.bind(this);
    this.formSubmitted = this.formSubmitted.bind(this);
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

  formCancel(){
    this.setState({cake: null});
    this.displayForm();
  }

  formSubmitted(cake){
    if(this.state.cake){
      this.cakes[this.currentlyEditingCake] = cake;
      this.currentlyEditingCake = null;
      this.setState({cake: null});
    } else {
      this.cakes.push(cake);
    }

      this.setState({cakes: this.cakes});
      this.displayForm();    
  }

  editCake(index){
    this.currentlyEditingCake = index;
    this.setState({cake: this.cakes[index]});
    this.displayForm();  
  }


  displayForm(){
    this.setState({formDisplayed: !this.state.formDisplayed});
  }

  render() {

    let searchBox = null;
    let cakeList = null;
    let addCake = null;
    let cakeForm = null;

    if(!this.state.formDisplayed) {
      cakeList = <CakeList cakes={this.state.cakes} onEdit={this.editCake} />;
      searchBox = <Search onSearch={this.search} />;
      addCake = <AddCake onClick={this.displayForm} /> 
    } else {
      cakeForm = <CakeForm onCancel={this.formCancel} onSubmit={this.formSubmitted} cake={this.state.cake} />
    }

    return (
      <div className="App">
        {searchBox}
        {addCake}
        {cakeList}
        {cakeForm}
      </div>
    );
  }

}

export default App;
