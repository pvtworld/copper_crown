import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import NotFound from '../../src/Components/NotFound/NotFound';

beforeAll(() => {
    
});

describe('Render test', ()=> {
    it('Renders without crashing', () => {
        const component = renderer.create(<NotFound />);

        expect(component).toMatchSnapshot();
    });
});