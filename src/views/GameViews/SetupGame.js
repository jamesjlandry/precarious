import { Container, Heading, List, Section, tether } from "@triframe/designer";
import React from "react";

export const SetupGame = tether(function* ({ Api, useParams }) {
  const { id } = yield useParams();
  const { Game, User, Player } = Api;
  const game = yield Game.read(id);
  const availableUsers = yield User.where({ isAvailable: true });

  return (
    <Container>
      <Heading>
        Select players for {game.name == "" || null ? "your game" : game.name}
      </Heading>
      <Section>
        {availableUsers.map((user) => (
          <List.Item title={user.username} />
        ))}
      </Section>
    </Container>
  );
});
