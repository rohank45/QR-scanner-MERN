import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import AfterEntry from "./components/AfterEntry";
import AfterExit from "./components/AfterExit";
import MainPage from "./components/MainPage";
import ViewLogs from "./components/ViewLogs";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Verification from "./auth/Verification";
import ErrorPage from "./components/ErrorPage";
import AuthPage from "./auth/AuthPage";

const App = () => {
  return (
    <div className="font-nunito">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/after/entry" component={AfterEntry} exact />
          <Route path="/after/exit" component={AfterExit} exact />
          <Route path="/mainpage" component={MainPage} exact />
          <Route path="/view/logs" component={ViewLogs} exact />

          <Route path="/auth" component={AuthPage} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/verify" component={Verification} exact />

          <Route path="*" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
