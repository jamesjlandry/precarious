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

export const CreateUser = tether(function* ({ Api }) {
  const { User } = Api;
  const form = yield { username: "", password: "", errorMsg: null };

  return (
    <Container>
      <Heading>Create New User</Heading>
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
              await User.register(form.username, form.password);
            } catch (error) {
              form.errorMsg = error.message;
            }
          }}
        >
          Create User
        </Button>
        <HelperText type="error" visible={form.errMsg !== null}>
          {form.errorMsg}
        </HelperText>
      </Section>
    </Container>
  );
});
