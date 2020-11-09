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
  Paragraph,
} from "@triframe/designer";

export const PlayGame = tether(function* ({ Api, redirect, useParams }) {
  const { Game, Player } = Api;
  const { id } = yield useParams();

  const cardStyle = {
    padding: "10px",
    borderStyle: "solid",
    borderRadius: "15px",
    backgroundColor: "rgb(245,245,245)",
  };
  const buttonStyle = {
    active: { backgroundColor: "green", borderRadius: "15px" },
    inactive: { backgroundColor: "rgb(230,230,230)", borderRadius: "15px" },
    buzzer: { minHeight: "25vh", backgroundColor: "red", borderRadius: "50px" },
    inactiveBuzzer: {
      minHeight: "25vh",
      backgroundColor: "grey",
      borderRadius: "50px",
    },
  };

  const [currentGame] = yield Game.where({ id: id }, `*, players {*}`);
  const currentPlayer = yield Player.current();

  const players = yield Player.where(
    { gameId: id, isJudge: false },
    `*, user { * }`
  );
  const form = yield {
    pointWinnerId: null,
    points: 0,
    currentGameId: null,
  };
  console.log("currentGame:", currentGame);
  console.log("currentGame.buzzedInPlayerId:", currentGame.buzzedInPlayerId);

  return (
    <Container>
      <Area>
        <Heading>
          round: {currentGame.currentRound ? currentGame.currentRound : "-"}/
          {currentGame.rounds ? currentGame.rounds : "-"}
        </Heading>
      </Area>
      <Area alignX="right" style={{ padding: "10px" }}>
        <Card style={cardStyle}>
          <Heading>
            <b>Players</b>
          </Heading>
          <Area>
            {players.map((player) => (
              <Card key={player.id}>
                <Paragraph>
                  {player?.user?.username} : {player.score}
                </Paragraph>
              </Card>
            ))}
          </Area>
        </Card>
      </Area>
      <Area alignY="bottom">
        {currentPlayer.isJudge ? (
          <Section>
            <Area>
              {players.map((player) => (
                <Card
                  key={player.id}
                  style={
                    currentGame.buzzedInPlayerId === player.id
                      ? { color: "white", backgroundColor: "green" }
                      : { color: "black", backgroundColor: "light grey" }
                  }
                >
                  <Paragraph>{player.user.username}</Paragraph>
                </Card>
              ))}
            </Area>
            <Section>
              <TextInput
                label="Points"
                value={form.points}
                onChange={(value) => (form.points = value)}
              />
              <Button
                disabled={currentGame.buzzedInPlayerId === null}
                onPress={() => {
                  console.log(currentGame.buzzedInPlayerId),
                    Game.assignPoints(
                      currentGame.buzzedInPlayerId,
                      form.points,
                      id
                    );
                }}
              >
                Make it So
              </Button>
            </Section>
            <Section>
              <Button onPress={() => Game.enableBuzzer(id)}>
                Enable Buzzers
              </Button>
              <Button onPress={() => Game.dissableBuzzer(id)}>
                Disable Buzzers
              </Button>
            </Section>
          </Section>
        ) : (
          <Card style={cardStyle}>
            <Heading>
              <b>Player Window</b>
            </Heading>
            <Button
              disabled={!currentPlayer.buzzerIsEnabled}
              style={
                currentPlayer.buzzerIsEnabled
                  ? buttonStyle.buzzer
                  : buttonStyle.inactiveBuzzer
              }
              onPress={() => {
                console.log(
                  "buzz in! currentPlay:id",
                  currentPlayer.user.username,
                  ":",
                  id
                );
                return currentPlayer.buzzIn(id);
              }}
            >
              Buzzer
            </Button>
          </Card>
        )}
      </Area>
    </Container>
  );
});
