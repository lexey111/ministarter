/* eslint-disable */
import { mount, shallow } from 'enzyme';
import React from 'react';
import { Dropdown } from '../index';
import { DropdownItem } from '../dropdown-item';
import { DropdownContent } from '../dropdown-content';

declare const LIB_PREFIX;

describe('Test Dropdown component', () => {
  describe('Title', () => {
    test('Should render title (string value)', () => {
      const wrapper = shallow(<Dropdown value={'TestValue'} onChange={() => null}>
        <DropdownItem value={'TestValue'}>Test title</DropdownItem>
      </Dropdown>);
      expect(wrapper.text()).toMatch('Test title');
    });

    test('Should render title (string values)', () => {
      const wrapper = shallow(<Dropdown value={'TestValue2'} onChange={() => null}>
        <DropdownItem value={'TestValue1'}>Test title 1</DropdownItem>
        <DropdownItem value={'TestValue2'}>Test title 2</DropdownItem>
        <DropdownItem value={'TestValue3'}>Test title 3</DropdownItem>
      </Dropdown>);
      expect(wrapper.text()).toMatch('Test title 2');
    });

    test('Should render title (numeric value)', () => {
      const wrapper = shallow(<Dropdown value={2} onChange={() => null}>
        <DropdownItem value={1}>Test title 1</DropdownItem>
        <DropdownItem value={2}>Test title 2</DropdownItem>
        <DropdownItem value={3}>Test title 3</DropdownItem>
      </Dropdown>);
      expect(wrapper.text()).toMatch('Test title 2');
    });

    test('Should render empty title if no matching value found', () => {
      const wrapper = shallow(<Dropdown value={100} onChange={() => null}>
        <DropdownItem value={1}>Test title 1</DropdownItem>
        <DropdownItem value={2}>Test title 2</DropdownItem>
        <DropdownItem value={3}>Test title 3</DropdownItem>
      </Dropdown>);
      expect(wrapper.text()).toMatch('');
    });
  });

  describe('Render nodes', () => {
    test('Should render 3 nodes', () => {
      const wrapper = mount(<Dropdown value={1} onChange={() => null}>
        <DropdownItem value={1}>Test title 1</DropdownItem>
        <DropdownItem value={2}>Test title 2</DropdownItem>
        <DropdownItem value={3}>Test title 3</DropdownItem>
      </Dropdown>);
      expect(wrapper.find('.' + LIB_PREFIX + '-dropdown-item')).toHaveLength(3);
    });

    test('Nodes should have the correct titles', () => {
      const wrapper = mount(<Dropdown value={1} onChange={() => null}>
        <DropdownItem value={1}>Test title 1</DropdownItem>
        <DropdownItem value={2}>Test title 2</DropdownItem>
        <DropdownItem value={3}>Test title 3</DropdownItem>
      </Dropdown>);
      const children = wrapper.find('.' + LIB_PREFIX + '-dropdown-item').children();
      expect(children).toHaveLength(3);
      expect(mount(children.get(0)).text()).toMatch('Test title 1');
      expect(mount(children.get(1)).text()).toMatch('Test title 2');
      expect(mount(children.get(2)).text()).toMatch('Test title 3');
    });
  });

  describe('Disabled state', () => {
    test('Default state', () => {
      const wrapper = mount(<Dropdown value={1} onChange={() => null}>
        <DropdownItem value={1}>Test title 1</DropdownItem>
        <DropdownItem value={2}>Test title 2</DropdownItem>
        <DropdownItem value={3}>Test title 3</DropdownItem>
      </Dropdown>);
      expect(wrapper.find('.' + LIB_PREFIX + '-dropdown').hasClass('disabled')).toBeFalsy();
    });

    test('Disabled state [disabled]', () => {
      const wrapper = mount(<Dropdown value={1} onChange={() => null} disabled>
        <DropdownItem value={1}>Test title 1</DropdownItem>
        <DropdownItem value={2}>Test title 2</DropdownItem>
        <DropdownItem value={3}>Test title 3</DropdownItem>
      </Dropdown>);
      expect(wrapper.find('.' + LIB_PREFIX + '-dropdown').hasClass('disabled')).toBeTruthy();
    });

    test('Disabled state [disabled=true]', () => {
      const wrapper = mount(<Dropdown value={1} onChange={() => null} disabled={true}>
        <DropdownItem value={1}>Test title 1</DropdownItem>
        <DropdownItem value={2}>Test title 2</DropdownItem>
        <DropdownItem value={3}>Test title 3</DropdownItem>
      </Dropdown>);
      expect(wrapper.find('.' + LIB_PREFIX + '-dropdown').hasClass('disabled')).toBeTruthy();
    });

    test('Disabled state [disabled=false]', () => {
      const wrapper = mount(<Dropdown value={1} onChange={() => null} disabled={false}>
        <DropdownItem value={1}>Test title 1</DropdownItem>
        <DropdownItem value={2}>Test title 2</DropdownItem>
        <DropdownItem value={3}>Test title 3</DropdownItem>
      </Dropdown>);
      expect(wrapper.find('.' + LIB_PREFIX + '-dropdown').hasClass('disabled')).toBeFalsy();
    });

    test('Nodes should be disabled the correct way', () => {
      const wrapper = mount(<Dropdown value={1} onChange={() => null}>
        <DropdownItem value={1}>Test title 1</DropdownItem>
        <DropdownItem value={2} disabled>Test title 2</DropdownItem>
        <DropdownItem value={3} disabled={true}>Test title 3</DropdownItem>
        <DropdownItem value={4} disabled={false}>Test title 4</DropdownItem>
      </Dropdown>);
      const content = wrapper.find(DropdownContent);
      const children = content.find('.' + LIB_PREFIX + '-dropdown-item');
      expect(children).toHaveLength(4);

      expect(shallow(children.get(0)).hasClass('disabled')).toBeFalsy();
      expect(shallow(children.get(1)).hasClass('disabled')).toBeTruthy();
      expect(shallow(children.get(2)).hasClass('disabled')).toBeTruthy();
      expect(shallow(children.get(3)).hasClass('disabled')).toBeFalsy();
    });
  });
  // the rest: tab order, keyboard for open, close, select value, etc.
});
