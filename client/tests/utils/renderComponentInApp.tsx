/**
 * @jest-environment jsdom
 */
import React from 'react';
import axios from "axios";
import MockAdapter from "axios-mock-adapter"
import {act, render} from '@testing-library/react';
import {MemoryRouter as Router, Routes, Route} from 'react-router-dom';

import {Provider} from 'react-redux';
import {ServiceContextProvider} from "../../src/core/service-context";
import {ServicesCreator} from "../../src/core/services/services-creator";

import thunk from "redux-thunk";
import {Store} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {IInitialState, initialState, rootReducer} from "../../src/core/store";

export interface IRequest {
  method: 'get';
  responseCode?: number;
  route: string;
  response: object;
}

export function commonSetup(ComponentToRender: any, initialState: object = {}, requests: IRequest[] = []) {
  const mock = new MockAdapter(axios);
  const methodMap = {
    get: ({route, responseCode = 200, response}: IRequest) => {
      mock.onGet(route).reply(responseCode, response)
    }
  }
  mock.reset();
  requests.forEach((request) => {
    methodMap[request.method](request);
  });
  const {component, store, services} = renderComponentInApp(() => ComponentToRender, initialState);
  return {component, store, services, mock};
}

export function generateAppTestStack(state: object = {}) {
  const defaultState = {...initialState, ...state};
  const storeConfig = {reducer: rootReducer, preloadedState: defaultState, devTools: false, middleware: [thunk]};
  const store: Store<IInitialState, AppAction> & { dispatch: DispatchType } = configureStore(storeConfig);
  const services = ServicesCreator.createServices({});
  return {store, services};
}

export function renderComponentInApp(Component: any, state: object = {}) {
  const {services, store} = generateAppTestStack(state);
  const component = render(<Provider store={store}>
      <ServiceContextProvider value={services}>
        <Router>
          <div className="content">
            <Routes>
              <Route path="/" element={<Component/>}/>
              <Route path="/:login" element={<Component/>}/>
            </Routes>
          </div>
        </Router>
      </ServiceContextProvider>
    </Provider>);
  return {component, store, services}
}
