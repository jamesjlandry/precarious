import React from "react";
import {
  Area,
  BubbleButton,
  Container,
  Heading,
  HelperText,
  List,
  Section,
  Subheading,
  tether,
} from "@triframe/designer";

export const AllUsers = tether(function* ({ Api, redirect }) {
  const { User } = Api;
  const allUsers = yield User.list();
  const currentUser = yield User.current();

  return (
    <Container>
      <Heading>All users</Heading>
      <Section>
        {allUsers.map((user) => (
          <Area inline>
            <BubbleButton
              icon="link"
              onPress={() => redirect(`/view-user/${user.id}`)}
            />
            <BubbleButton
              disabled={user.id !== currentUser.id}
              icon="delete"
              onPress={() => user.delete()}
            />
            <Area alignY="center">
              <List.Item title={user.username} />
              <Area alignY="center">
                <HelperText color="red">
                  {user.isAvailable ? "is" : "is not"} available
                </HelperText>
              </Area>
            </Area>
          </Area>
        ))}
      </Section>
    </Container>
  );
});
