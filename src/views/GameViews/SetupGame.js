import { Redirect } from "@triframe/arbiter-react";
import {
  Area,
  BubbleButton,
  Button,
  Container,
  Heading,
  List,
  Section,
  tether,
  Icon,
  Subheading,
} from "@triframe/designer";
import React from "react";
import { TextInput } from "react-native-gesture-handler";

export const SetupGame = tether(function* ({ Api, useParams, redirect }) {
  const { id } = yield useParams();
  const { Game, User, Player } = Api;

  const game = yield Game.read(id);
  const isActive = game.isActive;

  const currentUser = yield User.current();
  const availableUsers = yield User.where({ isAvailable: true });
  if (!isActive) {
    redirect(`/view-user/${currentUser.id}`);
  }

  const players = yield Player.where({ gameId: id });
  const notEnoughPlayers = players?.length < 3;

  return (
    <Container>
      <Heading>
        Select players for {game.name == "" || null ? "your game" : game.name}
      </Heading>
      <Section width="50%">
        <Area>
          <Subheading>Invite players:</Subheading>
          <TextInput
            label="link"
            value={`${window.location.host}/join-game/${id}`}
            mode="outlined"
          />
        </Area>
        <Area>
          <Subheading>Available users:</Subheading>
          {availableUsers.length > 0 ? (
            availableUsers.map((user) => (
              <Area inline key={user.id}>
                <BubbleButton
                  icon="plus"
                  onPress={() => Game.invitePlayers(id, user.id)}
                />
                <Area alignY="center">
                  <List.Item title={user.username} />
                </Area>
              </Area>
            ))
          ) : (
            <Area>Waiting for available players...</Area>
          )}
        </Area>
      </Section>
      <Button
        disabled={notEnoughPlayers}
        onPress={() => {
          (game.currentRound = 1), redirect(`/play/${game.id}`);
        }}
      >
        START!
      </Button>
      <Button
        onPress={() => {
          game.isActive = false;
          redirect(`/view-user/${currentUser.id}`);
        }}
      >
        Cancel Game
      </Button>
    </Container>
  );
});
