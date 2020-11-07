import {
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

  // need to figure out how to find a game the user is associated with
  let [game] = yield Game.where({ id: 0 });

  if (user === null) {
    redirect("/login");
  }
  if (game === undefined) {
    return (
      <Container>
        <Section>
          <Heading>Waiting for an invitation</Heading>
          <Subheading>Patience is a virtue, {user?.username}</Subheading>
        </Section>
      </Container>
    );
  } else {
    return (
      <Container>
        <Section>
          <Heading>
            You're invited to {game?.name ? game.name : "a new game"}!
          </Heading>
          <Subheading>
            This is where information about the judge will go
          </Subheading>
        </Section>
      </Container>
    );
  }
});
