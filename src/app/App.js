import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import MainNavbar from "@components/MainNavbar";
import store from "@app/store";

import routes from "./routes";

import "react-toastify/dist/ReactToastify.min.css";
import "../styles/index.scss";

const App = () => (
  <Provider store={store}>
    <Router>
      <MainNavbar />
      <Container fluid={false}>
        <ToastContainer autoClose={3000} theme="dark" />
        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              <div className="content py-2 py-sm-3 p-0 p-md-3">
                <Component />
              </div>
            </Route>
          ))}
        </Switch>
      </Container>
    </Router>
  </Provider>
);

export default App;
