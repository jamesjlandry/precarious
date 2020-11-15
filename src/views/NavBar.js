import React from "react";

import { tether } from "@triframe/arbiter-react";
import { Appbar, Area, Button, Text } from "@triframe/designer";
import { BubbleButton } from "@triframe/designer/dist/Button";

export const NavBar = tether(function* ({ Api, redirect }) {
  const user = yield User.current();

  const buttonStyle = { backgroundColor: "#35047b", marginRight: "1em" };
  const navStyle = {
    backgroundColor: "grey",
    color: "white",
  };
  const headerFont = {
    color: "#35047b",
    cursor: "pointer",
    font: "small-caps 400 50px Helvetica, Arial, sans-serif",
    marginLeft: ".5em",
  };
  return (
    <Appbar style={navStyle}>
      <Text style={headerFont} onClick={() => redirect("/")}>
        Precarious!
      </Text>
      <Area alignX="right">
        {user === null ? (
          <Area inline>
            <BubbleButton
              style={buttonStyle}
              size="md"
              icon="account-plus"
              onPress={() => redirect("/create-user")}
            />
            <BubbleButton
              style={buttonStyle}
              size="md"
              icon="login"
              onPress={() => redirect("/login")}
            />
          </Area>
        ) : (
          <Area inline>
            <Button
              style={buttonStyle}
              icon="account"
              onPress={() => redirect(`/view-user/${user.id}`)}
            >
              {user.username}
            </Button>
          </Area>
        )}
      </Area>
    </Appbar>
  );
});
