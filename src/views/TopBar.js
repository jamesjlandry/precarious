import React from "react";

import { tether } from "@triframe/arbiter-react";
import { Container, Heading } from "@triframe/designer";

export const TopBar = tether(function* ({ Api }) {
  return (
    <Container>
      <Heading>This the topbar</Heading>
    </Container>
  );
});
