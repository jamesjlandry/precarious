import React from "react";
import {
  Container,
  Heading,
  tether,
  Section,
  TextInput,
  Subheading,
  Button,
  Area,
  Card,
} from "@triframe/designer";

export const CreateGame = tether(function* ({ Api, redirect }) {
  const { User } = Api;
  const form = yield { name: "", rounds: 5, players: [] };
  const cardStyle = {padding: '10px', borderStyle:'solid', borderRadius:'15px', backgroundColor:"rgb(245,245,245)"}
  const buttonStyle = {
    active: {backgroundColor:"green", borderRadius:"15px"},
    inactive: {backgroundColor:"rgb(230,230,230)", borderRadius:"15px"},
  }
  const currentUser = yield User.current();

  return (
    <Container>
      <Area alignX="center" style={{padding: '30px'}} >
      <Card style={cardStyle}>
      <Heading><b>Create a New Game</b></Heading>
      
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
        <div style={{padding:"15px"}}>
          <Button style={buttonStyle.active}
            onPress={async () => {
              const game = await Game.createGame(
                currentUser.id,
                form.name,
                form.rounds
              );
              
              redirect(`/setup-game/${game.id}`);
            }}
          >
            Make The Game!
          </Button>
        </div>
       
      </Section>
      </Card>
      </Area>
    </Container>
  );
});
