import React from "react";
import {
  Button,
  Container,
  Heading,
  Section,
  tether,
} from "@triframe/designer";

export const ViewUser = tether(function* ({ Api, redirect, useParams }) {
  const { id } = yield useParams();
  console.log("id:", id);

  if (id === null) {
    redirect("/login");
  } else {
    const { User } = Api;
    const user = yield User.read(id);
    return (
      <Container>
        <Heading>Welcome, {user.username}!</Heading>
        {/* TODO: this only renders if this is the logged in user's page */}
        <Section>
          <Button onClick={() => redirect("/create-game")}>Create Game</Button>
          <Button onClick={() => redirect("/join-game")}>Join A Game</Button>
        </Section>
      </Container>
    );
  }
});
