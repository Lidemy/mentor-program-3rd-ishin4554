import React from 'react';
import expect from 'expect'
import { shallow } from 'enzyme';
import Post from './post';
import Posts from './index';

function setup() {
  const props = {
    match: {
      params: {
        category: 'work'
      },
      isLoadingGetPostsList: false,
      isLoadingCreatePost: false,
      isLoadingDeletePost: false, 
      isLoadingEditPost: false 
    },
    category: 'work',
    getPostsList: jest.fn(),
    postsList: [
      {
        title: 'test',
        cateogry: 'work',
        Tags: ['1','2','3']
      },
      {
        title: 'test2',
        cateogry: 'fun',
        Tags: ['1','2','3']
      },
      {
        title: 'test3',
        cateogry: 'fun',
        Tags: ['1','2','3']
      }
    ]
  }

  const wrapper = shallow(<Posts {...props} />);

  return {
    props,
    wrapper
  }
}

describe('<Posts />', () => {
  it('<Posts /> components renders', () => {
    const { wrapper } = setup();
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(Post)).toHaveLength(3);
  });

  it('<Posts /> mount func', () => {
    const { props } = setup();
    expect(props.getPostsList).toBeCalled();
  });

});

