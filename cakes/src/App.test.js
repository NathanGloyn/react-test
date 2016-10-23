import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils'
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


let app=null;

beforeEach(() => {
  app = TestUtils.renderIntoDocument(<App />);
  app.cakes = [{title: 'sponge'}, {title: 'cheesecake'}];
});


describe('when searching', () => {

  it('should have empty cake list when search criteria does not match any cake title', () => {

    app.search("l")

    expect(app.state.cakes.length).toEqual(0);

  });

  it('should have reduced cake list when search criteria matches', () => {

    app.search("sp")

    expect(app.state.cakes.length).toEqual(1);

  });

  it('should display all cakes if search criteria is empty', () => {
    app.search("sp");

    expect(app.state.cakes.length).toEqual(1);

    app.search("");

    expect(app.state.cakes.length).toEqual(2);
  });

})

describe('When cancelling add or edit', () =>{

  it('should reset cake in state', ()=>{
    app.state.formDisplayed = true;
    app.formCancel();
    expect(app.state.cake).toBeNull();
  });

  it('should hide the form', ()=>{
    app.state.formDisplayed = true;
    app.formCancel();
    expect(app.state.formDisplayed).toBe(false);
  });
});

describe('when adding a cake', ()=>{

  it('should add a cake', () => {
    app.formSubmitted({title: 'brownie', desc:'chocolate brownie'});

    expect(app.state.cakes.length).toBe(3);
    expect(app.state.cakes[2].title).toBe('brownie');
  });

  it('should hide the form after adding cake', ()=>{

    app.state.formDisplayed = true;

    app.formSubmitted({title: 'brownie', desc:'chocolate brownie'});

    expect(app.state.formDisplayed).toBe(false);        
  });

});

describe('when starting to edit a cake', () => {

  it('should set the current cake index', () => {
    app.editCake(1);

    expect(app.currentlyEditingCake).toBe(1);
  });

  it('should set the current cake in state', () => {
    app.editCake(1);

    expect(app.state.cake.title).toBe('cheesecake');
  });

  it('should display the form', ()=>{

    app.editCake(1);

    expect(app.state.formDisplayed).toBe(true);    
  })

});

describe('when updating cakes after edit', () => {

  beforeEach(()=> {
    app.currentlyEditingCake = 1;
    app.state.cake = app.cakes[1];
    
  })

  it('should update the cake', () => {

    app.formSubmitted({title: 'carrot cake'});

    expect(app.state.cakes[1].title).toBe('carrot cake');
  })

  it('should set currently editing cake to null after edit', () => {
    app.formSubmitted({title: 'carrot cake'});
    expect(app.currentlyEditingCake).toBeNull();
  })

  it('should set cake in state to null after edit', () => {
    app.formSubmitted({title: 'carrot cake'});
    expect(app.state.cake).toBeNull();
  })

  it('should hide the form after edit', () => {
    app.state.formDisplayed = true;
    app.formSubmitted({title: 'carrot cake'});
    expect(app.state.formDisplayed).toBe(false);    
  })

});
