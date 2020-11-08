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


export const PlayGame = tether(function* ({ Api, redirect }) {
  const { Game, Player } = Api;

 
  const cardStyle = {padding: '10px', borderStyle:'solid', borderRadius:'15px', backgroundColor:"rgb(245,245,245)"}
  const buttonStyle = {
    active: {backgroundColor:"green", borderRadius:"15px"},
    inactive: {backgroundColor:"rgb(230,230,230)", borderRadius:"15px"},
  }
  const currentUser = yield User.current();


    /**
     * create components
     */

    // const playerCard = {};
  return (
    <Container>
        <Area alignX="right" style={{padding: '10px'}} >
            <Card style={cardStyle}>
            <Heading><b>Players</b></Heading>
            
            <Section>

             player here
            
            </Section>
            </Card>
        </Area>
    </Container>
  );
});
