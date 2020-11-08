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

export const CreateGame = tether(function* ({ Api, redirect }) {
  const { User } = Api;
  const form = yield { name: "", rounds: 5, players: [] };
  const currentUser = yield User.current();

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
        <Button
          onPress={async () => {
            const game = await Game.createGame(
              currentUser,
              form.name,
              form.rounds
            );
            redirect(`/setup-game/${game.id}`);
          }}
        >
          Make The Game!
        </Button>
      </Section>
    </Container>
  );
});
