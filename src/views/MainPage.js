import React from "react";
import {
  tether,
  Section,
  Container,
  Heading,
  Redirect,
  Subheading,
  Button,
} from "@triframe/designer";

export const MainPage = tether(function* ({ Api }) {
  return (
    <Container>
      <Heading>PRECARIOUS!</Heading>

      <Subheading>Login or Create User</Subheading>
      <Section>
        <Button onClick={() => <Redirect to="/login" />}>Log In</Button>
        <Button onClick={() => <Redirect to="/create-user" />}>Register</Button>
      </Section>
    </Container>
  );
});
