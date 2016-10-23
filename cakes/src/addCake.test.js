import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import AddCake from './addCake';

it('should execute callback', () => {
    let callback = sinon.spy();

    const wrapper = shallow(<AddCake onClick={callback} />);

    wrapper.find('a').simulate('click');

    expect(callback.called).toBe(true);

})