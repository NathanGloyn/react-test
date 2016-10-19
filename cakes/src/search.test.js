import React from 'react';
import ReactDOM from 'react-dom';
import { mount, render } from 'enzyme'; 
import sinon from 'sinon';
import Search from './search';

it('renders without crashing', () => {
  const div = document.createElement('div');

  let callback = function(e){
      return ;
  }

  ReactDOM.render(<Search onSearch={callback}/>, div);
  expect(render(<Search onSearch={callback}/>).find('#searchCriteria').length).toBe(1);
});



it('executes the callback', () => {
  
    const seachInput = sinon.spy();
    let searchData;
    const callback = function(e){
        searchData = e;
    }

    var searchComponent = mount(<Search onSearch={callback}/>).find('#searchCriteria');
    searchComponent.simulate('change', {target: {value: 'My new value'}})

    expect(searchData).toEqual('My new value');
});