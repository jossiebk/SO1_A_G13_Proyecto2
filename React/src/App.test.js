import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Tabla from './views/Tabla';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
  const div = document.createElement('div');
  ReactDOM.render(<Tabla />, div);
  ReactDOM.unmountComponentAtNode(div);
});
