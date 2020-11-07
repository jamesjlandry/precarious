import React from "react";
import { Provider, Route } from "@triframe/designer";
import { CreateUser } from "./views/UserViews/CreateUser";
import { MainPage } from "./views/MainPage";
import { LoginUser } from "./views/UserViews/LoginUser";
import { ViewUser } from "./views/UserViews/ViewUser";
import { CreateGame } from "./views/GameViews/CreateGame";
import { JoinGame } from "./views/GameViews/JoinGame";

export default () => (
  <Provider url={process.env.REACT_APP_BACKEND_URL}>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/login" component={LoginUser} />
    <Route exact path="/create-user" component={CreateUser} />
    <Route exact path="/view-user/:id" component={ViewUser} />
    {/* TODO: this should redirect, not just render a diffent component */}
    <Route exact path="/view-user/" component={LoginUser} />
    <Route exact path="/create-game" component={CreateGame} />
    <Route exact path="/join-game" component={JoinGame} />
  </Provider>
);
