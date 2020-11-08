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

export const JoinGame = tether(function* ({ Api, redirect }) {
  const { User, Game, Player } = Api;

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
  

  

  const declineInvite = async (userId, gameId) => {
    const userPlayers = await Player.where({ userId });
    let userGamePlayers = userPlayers.filter((up) => up.gameId === gameId);
    userGamePlayers.forEach((ugp) => ugp.delete());
  };
  if (activePlayerGame !== undefined && activePlayerGame.currentRound === 1) {
    return redirect(`/play/${activePlayerGame.id}`)
  }
  if (activePlayerGame !== undefined) {
    let gamePlayers = yield Player.where({ gameId: activePlayerGame.id });
    let [judgePlayer] = gamePlayers.filter((p) => p.isJudge);
    let judge = yield User.read(judgePlayer.userId);

    return (
      <Container>
        <Section>
          <Heading>
            You're invited to {activePlayerGame.name ?? "a new game"}!
          </Heading>
          <Subheading>
            {`${judge?.username} will be judge for this game.`}
          </Subheading>
        </Section>
        <Section>
          <Button
            onPress={() => {
              user.isAvailable = false;
              declineInvite(user.id, activePlayerGame.id);
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
