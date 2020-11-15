import React from "react";
import {
  Area,
  BubbleButton,
  Button,
  Container,
  Heading,
  Section,
  Subheading,
  tether,
} from "@triframe/designer";
import { tryParseInt } from "../../HelperFunctions";

export const ViewUser = tether(function* ({ Api, redirect, useParams }) {
  const { id } = yield useParams();

  if (tryParseInt(id, null) === null) {
    redirect("/login");
  } else {
    const { User } = Api;
    const user = yield User.read(id);
    const me = yield User.current();
    const thisIsMe = id == me?.id;

    return (
      <Container>
        <Heading>{user.username}</Heading>
        {thisIsMe ? (
          <Section>
            <Area inline>
              <Area alignY="center">
                <Subheading>Welcome!</Subheading>
              </Area>
              <Button
                icon="logout"
                size="sm"
                onClick={() => {
                  User.logout();
                  redirect("/login");
                }}
              >
                Logout
              </Button>
            </Area>
            <Section>
              <Button onClick={() => redirect("/create-game")}>
                Create Game
              </Button>
              <Button
                onClick={() => {
                  user.isAvailable = true;
                  redirect("/join-game/waiting-room");
                }}
              >
                Join A Game
              </Button>
            </Section>
          </Section>
        ) : (
          <Section>
            {me === null ? (
              <Area inline>
                <Area alignY="center">
                  <Heading>You're not logged in</Heading>
                </Area>
                <Area alignY="center">
                  <BubbleButton
                    icon="login"
                    onPress={() => redirect("/login")}
                  />
                </Area>
              </Area>
            ) : (
              <Heading>
                Wait, you're not {user.username}, you're {me.username}!
              </Heading>
            )}
          </Section>
        )}
      </Container>
    );
  }
});
