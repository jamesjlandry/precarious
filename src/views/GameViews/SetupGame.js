import {
  Area,
  BubbleButton,
  Button,
  Container,
  Heading,
  List,
  Section,
  tether,
} from "@triframe/designer";
import React from "react";

export const SetupGame = tether(function* ({ Api, useParams, redirect }) {
  const { id } = yield useParams();
  const { Game, User, Player } = Api;

  const game = yield Game.read(id);
  const isActive = game.isActive;

  const currentUser = yield User.current();
  const availableUsers = yield User.where({ isAvailable: true });
  if (!isActive) {
    redirect(`/view-user/${currentUser.id}`);
  }

  const notEnoughPlayers = players?.length < 3;
  const players = yield Player.where({ gameId: id });

  return (
    <Container>
      <Heading>
        Select players for {game.name == "" || null ? "your game" : game.name}
      </Heading>
      <Section width="50%">
        {availableUsers.map((user) => (
          <Area inline key={user.id}>
            <BubbleButton
              icon="plus"
              onPress={() => Game.invitePlayers(id, user.id)}
            />
            <Area alignY="center">
              <List.Item title={user.username} />
            </Area>
          </Area>
        ))}
      </Section>
      <Button disabled={notEnoughPlayers}>START!</Button>
      <Button
        onPress={() => {
          game.isActive = false;
          redirect(`/view-user/${currentUser.id}`);
        }}
      >
        No, nevermind
      </Button>
    </Container>
  );
});
