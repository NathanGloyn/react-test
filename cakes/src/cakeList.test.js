import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'; 
import CakeList from './cakeList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  var cakeData=[];
  ReactDOM.render(<CakeList cakes={cakeData}/>, div);
});


it('renders data', () => {
    
    var cakeData = [ {title: 'Lemon Cake', desc: 'A Lemon Cake', image: 'lemon.jpg'}];

    const wrapper = shallow(<CakeList cakes={cakeData} />);

    const renderedCake = <li className="cake-item" key="0"><span>Lemon Cake</span><div className="cake-image-container"><img src="lemon.jpg" alt="Lemon Cake" /><span>A Lemon Cake</span></div></li>;

    expect(wrapper.contains(renderedCake)).toEqual(true);

});