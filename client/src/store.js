import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './reducers/';

export const history = createBrowserHistory();

const initialState = {};
const middleware = [
  routerMiddleware(history)
];

const bindMiddleware = middleware => {
  if(process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    const { createLogger } = require('redux-logger');
    return composeWithDevTools(
      compose(
        applyMiddleware(...middleware, createLogger({collapsed: true}))
      )
    );
  }
  return applyMiddleware(...middleware);
};

const store = createStore(
  createRootReducer(history),
  initialState,
  compose(bindMiddleware(middleware))
);

export default store;