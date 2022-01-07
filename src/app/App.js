import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

//import { AnimatedSwitch } from "react-router-transition";

import MainNavbar from "@components/MainNavbar";
import routes from "./routes";

import "react-toastify/dist/ReactToastify.min.css";
import "../styles/index.scss";

const App = () => (
  <Router>
    <MainNavbar />
    <Container fluid={false}>
      <ToastContainer autoClose={3000} theme="dark" />
      <Switch>
        {/* <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        > */}
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
            <div className="content py-2 py-sm-3 p-0 p-md-3">
              <Component />
            </div>
          </Route>
        ))}
        {/* </AnimatedSwitch> */}
      </Switch>
    </Container>
  </Router>
);

export default App;
