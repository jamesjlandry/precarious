import React from "react";
import {
  Area,
  BubbleButton,
  Container,
  Heading,
  HelperText,
  List,
  Section,
  tether,
} from "@triframe/designer";
import { ToggleSwitch } from "@triframe/designer/dist/Form";

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
            <Area key={game.id} inline>
              <BubbleButton
                icon="link"
                onPress={() => redirect(`/setup-game/${game.id}`)}
              />
              <Area alignY="center">
                <ToggleSwitch
                  value={game.isActive}
                  onPress={() => (game.isActive = !game.isActive)}
                />
              </Area>
              <Area alignY="center">
                <List.Item
                  title={game.name === "" ? `Game ${game.id}` : game.name}
                />

                <HelperText color="red">
                  {game.isActive ? "is" : "is not"} active
                </HelperText>
              </Area>
            </Area>
          );
        })}
      </Section>
    </Container>
  );
});
