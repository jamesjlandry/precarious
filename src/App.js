import React from "react";
import { Provider, Route } from "@triframe/designer";
import { CreateUser } from "./views/UserViews/CreateUser";
import { MainPage } from "./views/MainPage";
import { LoginUser } from "./views/UserViews/LoginUser";
import { ViewUser } from "./views/UserViews/ViewUser";

export default () => (
  <Provider url={process.env.REACT_APP_BACKEND_URL}>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/login" component={LoginUser} />
    <Route exact path="/create-user" component={CreateUser} />
    <Route exact path="/view-user" component={ViewUser} />
  </Provider>
);
