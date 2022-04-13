import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './core/reducers';
import { rootSaga } from './core/sagas';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [saga],
});

saga.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
