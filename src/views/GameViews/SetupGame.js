import {
  Area,
  BubbleButton,
  Button,
  Container,
  Heading,
  List,
  Section,
  tether,
  Icon,
} from "@triframe/designer";
import React from "react";



export const SetupGame = tether(function* ({ Api, useParams }) {
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
        {availableUsers.length > 0 ? availableUsers.map((user) => (
          <Area inline key={user.id}>
            <BubbleButton
              icon="plus"
              onPress={() => Game.invitePlayers(id, user.id)}
            />
            <Area alignY="center">
              <List.Item title={user.username} />
            </Area>
          </Area>
        )): <Area>no users available
         <BubbleButton
              onPress={() => Game.invitePlayers(id, user.id)}
            ><Icon name="plus"></Icon></BubbleButton>
            </Area>}
      </Section>
      <Button disabled={notEnoughPlayers}>START!</Button>
    </Container>
  );
});
