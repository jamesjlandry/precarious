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
  console.log("id:", id);

  let user = yield User.current();
  if (user === null) {
    redirect("/login");
  }

  let userPlayers = yield Player.where({ userId: user.id });
  let playerGameIds = userPlayers.map((player) => player.gameId);
  let activeGames = yield Game.where({ isActive: true });
  let [activePlayerGame] = activeGames.filter((ag) =>
    playerGameIds.includes(ag.id)
  );

  let [currentPlayer] = userPlayers.filter(
    (player) => player.gameId === activePlayerGame?.id
  );

  if (activePlayerGame !== undefined && activePlayerGame.currentRound === 1) {
    return redirect(`/play/${activePlayerGame.id}`);
  }
  if (activePlayerGame !== undefined) {
    console.log("activePlayerGame.name", activePlayerGame.name);
    let gamePlayers = yield Player.where({ gameId: activePlayerGame.id });
    let [judgePlayer] = gamePlayers.filter((p) => p.isJudge);
    let judge = yield User.read(judgePlayer.userId);

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
});
