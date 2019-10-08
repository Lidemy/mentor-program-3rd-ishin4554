import React from 'react';
import expect from 'expect'
import { shallow } from 'enzyme';
import { Markdown } from 'react-showdown';
import Editor from './index';
import EditorCategory from './editorCategory';
import EditorTag from './editorTag';

function setup() {
  const props = {
    post: {
      category: 'work',
      tag: ['111','222','333'],
      title: 'test',
      content: 'kkkk'
    },
    match: {
      params: {
        id: 1,
        method: 'edit'
      }
    },
    categories: ['work', 'fun'],
    tags: ['ixd', 'service'],
    history: {
      push: jest.fn()
    },
    isChecked: null,
    getCategories: jest.fn(),
    getTags: jest.fn(),
    createPost: jest.fn(),
    editPost: jest.fn()
  }

  const wrapper = shallow(<Editor {...props} />)

  return {
    props,
    wrapper
  }
}

describe('<Editor />', () => {
  it('<Editor /> components renders', () => {
    const { wrapper } = setup();

    expect(wrapper.find(EditorCategory)).toHaveLength(1);
    expect(wrapper.find(EditorTag)).toHaveLength(1);
    expect(wrapper.find('[name="title"]')).toHaveLength(1);
    expect(wrapper.find('[name="content"]')).toHaveLength(1);
  });

  it('<Editor /> mount func', () => {
    const { props } = setup();
    
    expect(props.getCategories).toBeCalled();
    expect(props.getTags).toBeCalled();
  });

  it('<Editor /> prop change', () => {
    const { props, wrapper } = setup();
    wrapper.find('button').simulate('click');
    expect(props.editPost).toHaveBeenCalled();
    wrapper.setProps({match: {
      params: {
        id: 1,
        method: 'create'
      }
    }})
    wrapper.find('button').simulate('click');
    expect(props.createPost).toHaveBeenCalled();
    wrapper.setState({isChecked: true})
    expect(wrapper.find(Markdown)).toHaveLength(1);
  });
});