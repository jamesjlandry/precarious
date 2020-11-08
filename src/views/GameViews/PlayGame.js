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


export const PlayGame = tether(function* ({ Api, redirect, useParams }) {
  const { Game, Player } = Api;
  const { id } = yield useParams()
 
  const cardStyle = {padding: '10px', borderStyle:'solid', borderRadius:'15px', backgroundColor:"rgb(245,245,245)"}
  const buttonStyle = {
    active: {backgroundColor:"green", borderRadius:"15px"},
    inactive: {backgroundColor:"rgb(230,230,230)", borderRadius:"15px"},
    buzzer: {minHeight: "25vh", backgroundColor:"red", borderRadius:"50px"},
    inactiveBuzzer: {minHeight: "25vh", backgroundColor:"grey", borderRadius:"50px"}
  }

  const [currentGame] = yield Game.where({id: id}, `*, players {*}`)
  const currentUser = yield User.current();
  const currentPlayer = yield Player.current();      
                    
  const answering = false;
  const players = yield Player.where({gameId: id, isJudge: false}, `*, user { * }`)
  const form = yield {
    pointWinnerId: null,
    points: 0,
    currentGameId: null,
  }
console.log(currentGame)

  return (
    <Container>
        <Area>
        <Heading>round: {currentGame.currentRound ? currentGame.currentRound : '-'}/{currentGame.rounds ? currentGame.rounds : '-'} </Heading>
        </Area>
        <Area alignX="right" style={{padding: '10px'}} >
            <Card style={cardStyle}>
            <Heading><b>Players</b></Heading>
                <Section>{ players.map((player) => 
                    <Card>
                        {player.user.username} : {player.score}
                    </Card>
                   
                )}
                </Section>
                
            </Card>
        </Area>
        <Area alignY="bottom">
        {currentPlayer.isJudge ? <Card>
          <Area>
          {players.map(player => <Section><Card style={currentGame.buzzedInPlayerId ? {color: "green"} : {color: "grey"}}>{player.user.username}</Card></Section>)}
          </Area>
          <Section>
            
            <Section>
              <TextInput 
                label="Points"
                value={form.points}
                onChange={value => form.points = value}
              />
              <Button disabled={currentGame.buzzedInPlayerId === null} onPress={() => {console.log(currentGame.buzzedInPlayerId), Game.assignPoints(currentGame.buzzedInPlayerId, form.points, id)}}>
                Make it So
              </Button>
            </Section>
            
          
          </Section>
          <Section>
            <Button onPress={()=> Game.enableBuzzer(id)}>
                Enable Buzzers
            </Button>
            <Button onPress={() => Game.dissableBuzzer(id)}>
                Disable Buzzers
            </Button>
          </Section>
          
          
          </Card> 
        
        
        
        : <Card style={cardStyle}>
            <Heading><b>Player Window</b></Heading>
                <Button disabled={!currentPlayer.buzzerIsEnabled} style={currentPlayer.buzzerIsEnabled ? buttonStyle.buzzer : buttonStyle.inactiveBuzzer} onPress={()=> {
                    console.log("buzz in! currentPlay:id", currentPlayer.user.username, ":", id)
                    return currentPlayer.buzzIn(id)
                    }}>Buzzer</Button>
            </Card>}
        </Area>

    </Container>
  );
});
