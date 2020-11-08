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
} from "@triframe/designer";
import React from "react";

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
  
  console.log(players)

  console.log(availableUsers)

  console.log(currentUser)

  return (
    <Container>
      <Heading>
        Select players for {game.name == "" || null ? "your game" : game.name}
      </Heading>
      <Section width="50%">
        {availableUsers.length > 0 ? availableUsers.map((user) => (
          <Area inline key={user.id}>
            <BubbleButton
              icon="plus"
              onPress={() => Game.invitePlayers(id, user.id)}
            />
            <Area alignY="center">
              <List.Item title={user.username} />
            </Area>
          </Area>
        )): 
        <Area>Waiting for available players...
         
        </Area> }
      </Section>
<<<<<<< HEAD
      <Button disabled={notEnoughPlayers} onClick={()=>redirect(`/play/${game.id}`)}>START!</Button>
=======
      <Button
        disabled={notEnoughPlayers}
        onPress={() => {
          (game.currentRound = 1), redirect(`/play/${game.id}`);
        }}
      >
        START!
      </Button>
>>>>>>> a2d62761bcddcf95e3fb58614de9b52778360cab
    </Container>
  );
});
