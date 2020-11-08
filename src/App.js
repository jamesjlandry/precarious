import React from "react";
import { Provider, Route, Redirect } from "@triframe/designer";
import { CreateUser } from "./views/UserViews/CreateUser";
import { MainPage } from "./views/MainPage";
import { LoginUser } from "./views/UserViews/LoginUser";
import { ViewUser } from "./views/UserViews/ViewUser";
import { CreateGame } from "./views/GameViews/CreateGame";
import { JoinGame } from "./views/GameViews/JoinGame";
import { SetupGame } from "./views/GameViews/SetupGame";
import { PlayGame } from "./views/GameViews/PlayGame";
import { GameOver } from "./views/GameViews/GameOver"
import { AllUsers } from "./views/UserViews/AllUsers";
import { AllGames } from "./views/GameViews/AllGames";


export default () => (
  <Provider url={process.env.NODE_ENV === 'staging' ? "http://localhost:8080" : undefined}>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/login" component={LoginUser} />
    <Route exact path="/create-user" component={CreateUser} />
    <Route exact path="/view-user/:id" component={ViewUser} />
    <Route exact path="/view-user" component={AllUsers} />
    <Route exact path="/create-game" component={CreateGame} />
    <Route exact path="/join-game" component={JoinGame} />
    <Route exact path="/setup-game/:id" component={SetupGame} />
    <Route exact path="/play/:id" component={PlayGame} />
    <Route exact path="/game-over/:id" component={GameOver} />
    <Route exact path="/all-games" component={AllGames} />
  </Provider>
);
