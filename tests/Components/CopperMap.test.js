import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CopperMap from '../../src/Components/CopperMap/CopperMap'

beforeAll(() => {
    
});
describe('Render test', ()=> {
    it('renders a GameMap', () => {
        const component = shallow(<CopperMap/>);
        component.setState({authed : true});
        component.setState({userInfo: {points : 0}});
        
        expect(toJson(component)).toMatchSnapshot();
    })
});