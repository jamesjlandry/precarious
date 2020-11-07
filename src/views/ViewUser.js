import React from "react";
import { Container, Heading, tether } from "@triframe/designer";

export const ViewUser = tether(function* ({ Api, redirect }) {
  const { User } = Api;

  const user = yield User.current();
  console.log("current user:", user);

  if (user === null) {
    redirect("/login");
  } else {
    return (
      <Container>
        <Heading>Welcome, {user.username}!</Heading>
      </Container>
    );
  }
});
