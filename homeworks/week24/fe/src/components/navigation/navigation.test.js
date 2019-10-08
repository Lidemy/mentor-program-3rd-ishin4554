import React from 'react';
import expect from 'expect'
import { shallow } from 'enzyme';

import Navigation from './index';
function setup() {
  const props = {
    logout: jest.fn(),
    isLogin: true
  }

  const wrapper = shallow(<Navigation {...props} />)

  return {
    props,
    wrapper
  }
}

describe('<Navigation />', () => {
  it('<Navigation /> components renders ', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper).toHaveLength(1);
  });

  it('<Navigation /> prop change?', () => {
    let wrapper = shallow(<Navigation isLogin={false}/>);
    expect(wrapper.find({ to: '/login' })).toHaveLength(1);
    wrapper = shallow(<Navigation isLogin={true}/>);
    expect(wrapper.find('.logout')).toHaveLength(1);
  });

  it('<Navigation /> event', () => {
    const { props, wrapper } = setup()
    wrapper.find('.logout').simulate('click')
    expect(props.logout).toBeCalled();
  });
  
});