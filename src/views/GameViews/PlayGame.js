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
  Grid,
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

  const scoreCardStyle = {
    border: "1px solid gray",
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

  const paragraphStyle = {
    color: "inherit",
    textAlign: "center",
    margin: ".5em",
  };

  const buzzedInStyle = {
    color: "white",
    backgroundColor: "green",
    width: "25%",
    margin: "0.5em",
  };

  const notBuzzedInStyle = {
    color: "black",
    backgroundColor: "lightgrey",
    width: "25%",
    margin: "0.5em",
  };

  const [currentGame] = yield Game.where({ id: id }, `*, players {*}`);
  const currentPlayer = yield Player.current();

  const players = yield Player.where(
    { gameId: id, isJudge: false },
    `*, user { * }`
  );
  const form = yield {
    pointWinnerId: null,
    points: null,
    currentGameId: null,
  };

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
              <Card style={scoreCardStyle} key={player.id}>
                <Paragraph style={paragraphStyle}>
                  {player?.user?.username.toUpperCase()} : {player.score}
                </Paragraph>
              </Card>
            ))}
          </Area>
        </Card>
      </Area>
      <Area alignY="bottom">
        {currentPlayer.isJudge ? (
          <Section>
            <Grid base={4} gutter={10} style={{ height: "20%" }}>
              {players.map((player) => (
                <Card
                  key={player.id}
                  style={
                    currentGame.buzzedInPlayerId === player.id
                      ? buzzedInStyle
                      : notBuzzedInStyle
                  }
                >
                  <Paragraph style={paragraphStyle}>
                    {player.user.username.toUpperCase()}
                  </Paragraph>
                </Card>
              ))}
            </Grid>
            <Section>
              <TextInput
                label="Points"
                value={form.points}
                onChange={(value) => (form.points = value)}
              />
              <Button
                disabled={currentGame.buzzedInPlayerId === null}
                onPress={() => {
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
            <Button
              disabled={!currentPlayer.buzzerIsEnabled}
              style={
                currentPlayer.buzzerIsEnabled
                  ? buttonStyle.buzzer
                  : buttonStyle.inactiveBuzzer
              }
              onPress={() => {
                return currentPlayer.buzzIn(id);
              }}
            >
              I KNOW THIS!
            </Button>
          </Card>
        )}
      </Area>
    </Container>
  );
});
