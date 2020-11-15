import React from "react";
import {
  tether,
  Section,
  Container,
  Heading,
  Subheading,
  Button,
} from "@triframe/designer";

export const MainPage = tether(function* ({ Api, redirect }) {
  let user = yield Api.User.current();
  if (user !== null) {
    redirect(`/view-user/${user.id}`);
  }

  return (
    <Container>
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
