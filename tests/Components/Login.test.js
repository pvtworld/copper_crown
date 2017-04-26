import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Login from '../../src/Components/Login/Login';

beforeAll(() => {
    
});

describe('Render test', ()=> {
    it('Renders without crashing', () => {
        const component = renderer.create(<Login />);
        
        expect(component).toMatchSnapshot();
    });
});