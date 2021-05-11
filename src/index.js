import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from './components/Main';
import { Provider } from 'react-redux';
import store from './redux/store';



ReactDOM.render( 
    <React.StrictMode >
        <Provider store={store}>
            <Main></Main>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);


reportWebVitals();