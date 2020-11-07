import React from "react";
import {
  Button,
  Container,
  Heading,
  Section,
  tether,
} from "@triframe/designer";

export const ViewUser = tether(function* ({ Api, redirect }) {
  const { User } = Api;

  const user = yield User.current();

  if (user === null) {
    redirect("/login");
  } else {
    return (
      <Container>
        <Heading>Welcome, {user.username}!</Heading>
        <Section>
          <Button onClick={() => redirect("/create-game")}>Create Game</Button>
          <Button onClick={() => redirect("/join-game")}>Join A Game</Button>
        </Section>
      </Container>
    );
  }
});
