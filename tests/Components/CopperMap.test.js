import React from 'react';
import ReactDOM from 'react-dom';
import CopperMap from '../src/Components/CopperMap';

beforeAll(() => {
    
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CopperMap />, div);
});