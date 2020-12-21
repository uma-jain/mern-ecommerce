import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';



//redux
import reducers from './redux/reducers/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension"
import { Provider } from 'react-redux';



const store = createStore(reducers, {},composeWithDevTools(applyMiddleware(reduxThunk)));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

