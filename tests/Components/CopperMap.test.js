import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import CopperMap from '../../src/Components/CopperMap/CopperMap'

beforeAll(() => {
    
});
describe('Render test', ()=> {
    it('Renders without crashing', () => {
        const state = {
        authed: false,
        userInfo : {
            points: 0,
            }
        }

        const component = renderer.create(<CopperMap state={state} />);

        expect(component).toMatchSnapshot();
    });
});