/* eslint-disable */
import { mount, shallow } from 'enzyme';
import React from 'react';
import { Checkbox } from '../index';

declare const LIB_PREFIX;

describe('Test Checkbox component', () => {
  describe('Title', () => {
    test('Render title (props)', () => {
      const wrapper = shallow(<Checkbox title={'Test title'} checked={true}/>);
      expect(wrapper.text()).toMatch('Test title');
    });

    test('Render title (children)', () => {
      const wrapper = shallow(<Checkbox checked={true}>Test title</Checkbox>);
      expect(wrapper.text()).toMatch('Test title');
    });

    test('Render title (props over children)', () => {
      const wrapper = shallow(<Checkbox title={'Test title props'} checked={true}>Test title children</Checkbox>);
      expect(wrapper.text()).toMatch('Test title props');
    });

    test('Add [no-title] class if no title', () => {
      const wrapper = mount(<Checkbox title={''} checked={true} disabled={true}/>);
      expect(wrapper.getDOMNode().classList).toContain('no-title');
    });
  });

  describe('Disabled class', () => {
    test('Default', () => {
      const wrapper = mount(<Checkbox title={'Test title'} checked={true}/>);
      expect(wrapper.getDOMNode().classList).not.toContain('disabled');
    });

    test('Default ([disabled=false])', () => {
      const wrapper = mount(<Checkbox title={'Test title'} checked={true} disabled={false}/>);
      expect(wrapper.getDOMNode().classList).not.toContain('disabled');
    });

    test('Disabled ([disabled])', () => {
      const wrapper = mount(<Checkbox title={'Test title'} checked={true} disabled/>);
      expect(wrapper.getDOMNode().classList).toContain('disabled');
    });

    test('Disabled ([disabled=true])', () => {
      const wrapper = mount(<Checkbox title={'Test title'} checked={true} disabled={true}/>);
      expect(wrapper.getDOMNode().classList).toContain('disabled');
    });
  });

  describe('Tab order', () => {
    test('Default', () => {
      const wrapper = mount(<Checkbox title={'Test title'} checked={true}/>);
      expect(wrapper.getDOMNode().tabIndex).toBe(0);
    });

    test('Default ([disabled=false])', () => {
      const wrapper = mount(<Checkbox title={'Test title'} checked={true} disabled={false}/>);
      expect(wrapper.getDOMNode().tabIndex).toBe(0);
    });

    test('Disabled ([disabled])', () => {
      const wrapper = mount(<Checkbox title={'Test title'} checked={true} disabled/>);
      expect(wrapper.getDOMNode().tabIndex).toBe(-1);
    });

    test('Disabled ([disabled=true])', () => {
      const wrapper = mount(<Checkbox title={'Test title'} checked={true} disabled={true}/>);
      expect(wrapper.getDOMNode().tabIndex).toBe(-1);
    });
  });

  describe('Checked', () => {
    test('Should contain [checked] class when checked', () => {
      const wrapper = mount(<Checkbox title={'Test title'} checked={true}/>);
      expect(wrapper.getDOMNode().classList).toContain('checked');
    });

    test('Should not contain [checked] class when not checked', () => {
      const wrapper = mount(<Checkbox title={'Test title'} checked={false}/>);
      expect(wrapper.getDOMNode().classList).not.toContain('checked');
    });
  });

  describe('On change', () => {
    test('Should switch [checked] class when checked changes', () => {
      const wrapper = mount(<Checkbox title={'Test title'} checked={false}/>);
      expect(wrapper.getDOMNode().classList).not.toContain('checked');

      wrapper.setProps({ checked: true });
      expect(wrapper.getDOMNode().classList).toContain('checked');

      wrapper.setProps({ checked: false });
      expect(wrapper.getDOMNode().classList).not.toContain('checked');
    });

    it('Test click event', () => {
      const mockCallBack = jest.fn();

      const wrapper = shallow(<Checkbox onChange={mockCallBack} title={'Test'} checked={true}/>);
      wrapper.find('div.' + LIB_PREFIX + '-checkbox').simulate('click');
      expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('Test keyboard [Enter] event', () => {
      const mockCallBack = jest.fn();

      const wrapper = shallow(<Checkbox onChange={mockCallBack} title={'Test'} checked={true}/>);
      wrapper.find('div.' + LIB_PREFIX + '-checkbox').simulate('keypress', { key: 'Enter' });
      expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('Test keyboard [Space] event', () => {
      const mockCallBack = jest.fn();

      const wrapper = shallow(<Checkbox onChange={mockCallBack} title={'Test'} checked={true}/>);
      wrapper.find('div.' + LIB_PREFIX + '-checkbox').simulate('keypress', { key: ' ' });
      expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('Test keyboard [A] event', () => {
      const mockCallBack = jest.fn();

      const wrapper = shallow(<Checkbox onChange={mockCallBack} title={'Test'} checked={true}/>);
      wrapper.find('div.' + LIB_PREFIX + '-checkbox').simulate('keypress', { key: 'A' });
      expect(mockCallBack.mock.calls.length).toEqual(0);
    });
  });
});
