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

export const MainPage = tether(function* ({ Api, redirect }) {
  return (
    <Container>
      <Heading>PRECARIOUS!</Heading>

      <Subheading>Login or Create User</Subheading>
      <Section>
        <Button onClick={() => redirect("/login")}>Log In</Button>
        <Button onClick={() => redirect("/create-user")}>
          Register New User
        </Button>
      </Section>
    </Container>
  );
});
