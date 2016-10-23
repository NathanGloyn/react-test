import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'; 
import sinon from 'sinon';
import CakeList from './cakeList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let cakeData=[];
  ReactDOM.render(<CakeList cakes={cakeData} />, div);
});


it('renders data', () => {
    
    let cakeData = [ {title: 'Lemon Cake', desc: 'A Lemon Cake', image: 'lemon.jpg'}];

    const wrapper = shallow(<CakeList cakes={cakeData} />);

    const renderedCake =<div>
                            <div className="itemContainer" key="1">
                                <div className="imageColumn">
                                    <div className="cake-image-container">
                                        <img src="lemon.jpg" alt="Lemon Cake" />
                                    </div>
                                </div>
                                <div className="textColumn">
                                    <div>
                                        <span className="title">Lemon Cake</span>
                                        <a className="updateCakeLink" href="#">
                                            <span className="fa fa-pencil"></span>
                                        </a>
                                    </div>
                                    <p className="desc">A Lemon Cake</p>                        
                                </div>
                            </div>
                          </div>


    expect(wrapper.html()).toEqual(shallow(renderedCake).html());

});

it('displays no data message', () => {
    let cakeData=[];

    const wrapper = shallow(<CakeList cakes={cakeData} />);

    const noDataMessage = <p>No cakes found</p>;

    expect(wrapper.contains(noDataMessage)).toEqual(true);
});

it('executes callback', () => {
    let cakeData = [ {title: 'Lemon Cake', desc: 'A Lemon Cake', image: 'lemon.jpg'}];

    let callback = sinon.spy();

    const wrapper = shallow(<CakeList cakes={cakeData} onEdit={callback} />);

    let link = wrapper.find('.textColumn').find('a');
    link.simulate('click');

    expect(callback.called).toBe(true);
    expect(callback.calledWith(0)).toEqual(true);
});