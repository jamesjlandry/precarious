import React from "react";
import {
  tether,
  Container,
  Heading,
  HelperText,
  Section,
  TextInput,
  PasswordInput,
  Button,
} from "@triframe/designer";

export const LoginUser = tether(function* ({ Api, redirect }) {
  const { User } = Api;
  const form = yield { username: "", password: "", errorMsg: null };

  return (
    <Container>
      <Heading>Log In</Heading>
      <Section>
        <TextInput
          label="username"
          value={form.username}
          onChange={(value) => (form.username = value)}
        />

        <PasswordInput
          label="password"
          value={form.password}
          onChange={(value) => (form.password = value)}
        />

        <Button
          onPress={async () => {
            try {
              const user = await User.login(form.username, form.password);
              redirect(`/view-user/${user.id}`);
            } catch (error) {
              form.errorMsg = error.message;
            }
          }}
        >
          Log In
        </Button>
        <HelperText type="error" visible={form.errorMsg !== null}>
          {form.errorMsg}
        </HelperText>
      </Section>
    </Container>
  );
});
