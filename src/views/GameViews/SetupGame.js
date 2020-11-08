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
  const availableUsers = yield User.where({ isAvailable: true });

  const players = yield Player.where({ gameId: id });
  const notEnoughPlayers = yield players.length < 3;

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
      <Button disabled={notEnoughPlayers} onPress={() => {game.currentRound = 1, redirect(`/play/${game.id}`)}}>START!</Button>
    </Container>
  );
});
