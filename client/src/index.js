import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

ReactDOM.render(
    // Using Provider to have react-redux in our program
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));