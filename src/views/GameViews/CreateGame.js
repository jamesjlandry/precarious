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
import { List } from "@triframe/core/dist/List";

export const CreateGame = tether(function* ({ Api, redirect }) {
  const { User } = Api;
  const form = yield { name: "", rounds: 5, players: [] };
  const availablePlayers = yield User.where({ isAvailable: true });
  const cardStyle = {padding: '10px', borderStyle:'solid', borderRadius:'15px', backgroundColor:"rgb(245,245,245)"}
  const buttonStyle = {
    active: {backgroundColor:"green", borderRadius:"15px"},
    inactive: {backgroundColor:"rgb(230,230,230)", borderRadius:"15px"},
  }

  return (
    <Container>
      <Area alignX="center" style={{padding: '30px'}} >
      <Card style={cardStyle}>
      <Heading><b>Create a New Game</b></Heading>
      
      <Section>
      <Area style={{ width: '100%'}}>
        
          
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
          <Area style={{paddingTop:"5px"}}>
            <Button style={buttonStyle.active} onPress={async () => {}}>Make The Game!</Button>
          </Area>
        </Area>
      </Section>
      </Card>
      </Area>
    </Container>
  );
});
