import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');

    // This test fails unless we explicitly provide an element for the CopyButton tooltip. Is
    // there a way to avoid doing this?
    div.setAttribute('id', 'CopyButton');
    document.body.appendChild(div);

    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
