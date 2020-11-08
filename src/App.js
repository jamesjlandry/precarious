import React from "react";
import { Provider, Route } from "@triframe/designer";
import { CreateUser } from "./views/CreateUser";
import { MainPage } from "./views/MainPage";
import { LoginUser } from "./views/LoginUser";
import { ViewUser } from "./views/ViewUser";

export default () => (
  <Provider url="http://localhost:8080">
    <Route exact path="/" component={MainPage} />
    <Route exact path="/login" component={LoginUser} />
    <Route exact path="/create-user" component={CreateUser} />
    <Route exact path="/view-user" component={ViewUser} />
  </Provider>
);
