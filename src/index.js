import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import "./index.css";
import App from "./components/App";
import store from './store/index'

ReactDOM.render(
  <App store={store} />,
  document.getElementById("root")
);
