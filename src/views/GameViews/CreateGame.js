import React from "react";
import {
  Container,
  Heading,
  tether,
  Section,
  TextInput,
} from "@triframe/designer";

export const CreateGame = tether(function* ({ Api, redirect }) {
  const form = yield { name: "" };
  return (
    <Container>
      <Heading>Create a new Game</Heading>
      <Section>
        <TextInput label="The name of the game is..." />
      </Section>
    </Container>
  );
});
