import {
  Area,
  Button,
  Container,
  Heading,
  Section,
  Subheading,
  tether,
} from "@triframe/designer";
import React from "react";
import { isNullOrEmpty } from "../../HelperFunctions";

export const JoinGame = tether(function* ({ Api, redirect, useParams }) {
  const { User, Game, Player } = Api;
  const { id } = yield useParams();

  
  let user = yield User.current();
  if (user === null) {
    alert('You must be logged in to join a game')
    redirect("/login");
  } else {

  let userPlayers = yield Player.where({ userId: user.id });
  let playerGameIds = userPlayers.map((player) => player.gameId);
  let activeGames = yield Game.where({ isActive: true });
  let [activePlayerGame] = activeGames.filter((ag) =>
    playerGameIds.includes(ag.id)
  );

  let [currentPlayer] = userPlayers.filter(
    (player) => player.gameId === activePlayerGame?.id
  );

  // if a user comes to this via a link, and they're not a player in the game yet, create the player
  if (id !== undefined && id !== "waiting-room") {
    let game = yield Game.read(id, `*, players {*}`);
    let players = game.players;
    let userPlayers = players.filter((player) => player.userId === user.id);

    if (userPlayers.length === 0) {
      currentPlayer = yield Game.invitePlayers(id, user.id);
    } else if (userPlayers.length === 1) {
      currentPlayer = userPlayers[0];
    } else {
      throw Error("How did you get into the same game twice?!");
    }
  }

  // the game has started when
  if (activePlayerGame !== undefined && activePlayerGame.currentRound === 1) {
    return redirect(`/play/${activePlayerGame.id}`);
  }
  if (activePlayerGame !== undefined) {
    let gamePlayers = yield Player.where({ gameId: activePlayerGame.id });
    let [judgePlayer] = gamePlayers.filter((p) => p.isJudge);
    let judge = yield User.read(judgePlayer.userId);
    if (id === "waiting-room") {
      redirect(`/join-game/${activePlayerGame.id}`);
    }

    return (
      <Container>
        <Section>
          <Heading>
            You're invited to{" "}
            {isNullOrEmpty(activePlayerGame.name)
              ? "a new game"
              : activePlayerGame.name}
            !
          </Heading>
          <Subheading>
            {`${judge?.username} will be judge for this game.`}
          </Subheading>
        </Section>
        <Section>
          <Button
            onPress={() => {
              user.isAvailable = false;
              currentPlayer.decline();
              redirect(`/view-user/${user.id}`);
            }}
          >
            Decline
          </Button>
        </Section>
        <Area alignX="center">
          <Subheading>
            or wait for {judge?.username} to start the game
          </Subheading>
        </Area>
      </Container>
    );
  } else {
    return (
      <Container>
        <Section>
          <Heading>Waiting for an invitation</Heading>
          <Subheading>Patience is a virtue, {user?.username}</Subheading>
        </Section>
        <Button
          onPress={() => {
            user.isAvailable = false;
            redirect(`/view-user/${user?.id}`);
          }}
        >
          I'm not that patient.
        </Button>
      </Container>
    );
  }
}
});
