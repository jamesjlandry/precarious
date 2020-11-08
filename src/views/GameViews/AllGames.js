import React from "react";
import {
  Area,
  BubbleButton,
  Button,
  Container,
  Heading,
  HelperText,
  List,
  Section,
  tether,
} from "@triframe/designer";

export const AllGames = tether(function* ({ Api, redirect }) {
  const { Game, User } = Api;
  const allGames = yield Game.list();
  const currentUser = yield User.current();

  return (
    <Container>
      <Heading>All games</Heading>
      <Section>
        {allGames.map((game) => {
          // how do I use an async inside a React map?
          //   const judge = yield game.getJudge();
          return (
            <Area inline>
              <BubbleButton
                icon="link"
                onPress={() => redirect(`/setup-game/${game.id}`)}
              />
              <Button
                // disabled={judge.id !== currentUser.id}
                icon="cancel"
                onPress={() => (game.isActive = false)}
              >
                Disable Game
              </Button>
              <Area alignY="center">
                <List.Item
                  title={game.name === "" ? `Game ${game.id}` : game.name}
                />
                <Area alignY="center">
                  <HelperText color="red">
                    {game.isActive ? "is" : "is not"} active
                  </HelperText>
                </Area>
              </Area>
            </Area>
          );
        })}
      </Section>
    </Container>
  );
});
