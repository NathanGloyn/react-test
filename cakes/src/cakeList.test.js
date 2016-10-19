import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'; 
import CakeList from './cakeList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let cakeData=[];
  let filtered = false;
  ReactDOM.render(<CakeList cakes={cakeData} filtered={filtered} />, div);
});


it('renders data', () => {
    
    let cakeData = [ {title: 'Lemon Cake', desc: 'A Lemon Cake', image: 'lemon.jpg'}];
    let filtered = false;

    const wrapper = shallow(<CakeList cakes={cakeData} filtered={filtered} />);

    const renderedCake =<div className="itemContainer" key="1">
                            <div className="imageColumn">
                                  <div className="cake-image-container">
                                      <img src="lemon.jpg" alt="Lemon Cake" />
                                  </div>
                              </div>
                              <div className="textColumn">
                                  <h3 className="title">Lemon Cake</h3>
                                  <p>A Lemon Cake</p>                        
                              </div>
                          </div>;
    
    expect(wrapper.contains(renderedCake)).toEqual(true);

});

it('displays no data message', () => {
    let cakeData=[];
    let filtered = true;

    const wrapper = shallow(<CakeList cakes={cakeData} filtered={filtered}/>);

    const noDataMessage = <p>No cakes found</p>;

    expect(wrapper.contains(noDataMessage)).toEqual(true);
});