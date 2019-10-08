import React from 'react';
import expect from 'expect'
import { shallow } from 'enzyme';
import { Markdown } from 'react-showdown';
import { Link } from 'react-router-dom';
import Article from './article';

function setup() {
  const props = {
    post: {
      title: 'test',
      content: 'kkkk',
    },
    match: {
      params: {
        id: 1
      }
    },
    isLogin: false,
    isLoadingGetPost: false,
    getPost: jest.fn(),
    handleCardDelete: jest.fn()
  }

  const wrapper = shallow(<Article {...props} />)

  return {
    props,
    wrapper
  }
}

describe('<Article />', () => {
  it('renders <Article /> components', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.page__title').text()).toBe('test');
    expect(wrapper.find('.page__content').find(Markdown)).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(0);
  });

  it('renders <Article /> handle btn', () => {
    const { wrapper } = setup();
    wrapper.setProps({isLogin: true})
    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(1);
  });
});