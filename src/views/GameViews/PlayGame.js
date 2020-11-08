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
<<<<<<< HEAD
    const api = Api;
    console.log(api)
  const {Player, Game} = Api;  
             
 
=======
  const { Game, Player } = Api;

>>>>>>> a2d62761bcddcf95e3fb58614de9b52778360cab
 
  const cardStyle = {padding: '10px', borderStyle:'solid', borderRadius:'15px', backgroundColor:"rgb(245,245,245)"}
  const buttonStyle = {
    active: {backgroundColor:"green", borderRadius:"15px"},
    inactive: {backgroundColor:"rgb(230,230,230)", borderRadius:"15px"},
    buzzer: {minHeight: "25vh", backgroundColor:"red", borderRadius:"50px"}
  }
  const currentUser = yield User.current();
  const answering = false;

  return (
    <Container>
        <Area>
        <Heading>round: {Game.currentRound ? Game.currentRound : '-'}/{Game.rounds ? Game.rounds : '-'} </Heading>
        </Area>
        <Area alignX="right" style={{padding: '10px'}} >
            <Card style={cardStyle}>
            <Heading><b>Players</b></Heading>
                <Section>{Game.players ? Game.players.map((player) => 
                    <Card>
                        {player.name} : {player.score}
                    </Card>
                ) : null}

                </Section>
            </Card>
        </Area>
        <Area alignY="bottom">
        <Card style={cardStyle}>
            <Heading><b>Player Window</b></Heading>
                <Button style={buttonStyle.buzzer} onClick={()=> {
                    console.log("buzz in!")
                    /*currentPlayer.buzzIn*/
                    }}>Buzzer</Button>
            </Card>
        </Area>

    </Container>
  );
});
