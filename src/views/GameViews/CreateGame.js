import React from "react";
import {
  Container,
  Heading,
  tether,
  Section,
  TextInput,
  Subheading,
  Button,
} from "@triframe/designer";
import { List } from "@triframe/core/dist/List";

export const CreateGame = tether(function* ({ Api, redirect }) {
  const { User } = Api;
  const form = yield { name: "", rounds: 5, players: [] };
  const availablePlayers = yield User.where({ isAvailable: true });

  return (
    <Container>
      <Heading>Create a new Game</Heading>
      <Section>
        <Subheading>The name of the game is...</Subheading>
        <TextInput
          label="Optional"
          value={form.name}
          onChange={(value) => (form.name = value)}
        />
        <Subheading>How many questions will this game have?</Subheading>
        <TextInput
          label="Rounds"
          value={form.rounds}
          onChange={(value) => (form.rounds = value)}
        />
        <Subheading>Who do you want to play with?</Subheading>
        {availablePlayers.map((player) => (
          <List.Item title={player.username} />
        ))}
        <Button onPress={async () => {}}>Make The Game!</Button>
      </Section>
    </Container>
  );
});
