import React from 'react';
import "normalize.css/normalize.css";
import './index.scss';
import {createRoot} from "react-dom/client";
import App from "./components/app/app";
import {store} from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";


const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);