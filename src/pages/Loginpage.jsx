import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

export default function Loginpage() {
  const history = useHistory();
  const { signInWithGoogle, fetchUser, setingUser, createUser } = useAuth();
  const location = useLocation();

  function handleRedirectToOrBack() {
    history.replace(location.state?.from ?? "/profile");
  }

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Login
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        {/* <chakra.form>
          <Stack spacing="6">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input name="email" type="email" autoComplete="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                autoComplete="password"
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="pink" size="lg" fontSize="md">
              Sign in
            </Button>
          </Stack>
        </chakra.form>
        <DividerWithText my={6}>OR</DividerWithText> */}
        <Button
          variant="outline"
          isFullWidth
          colorScheme="red"
          leftIcon={<FaGoogle />}
          onClick={() =>
            signInWithGoogle()
              .then((user) => {
                handleRedirectToOrBack();
                fetchUser(user.user).then((res) => {
                  console.log(res);
                  if (res.docs.length >= 1) {
                    setingUser(res.docs);
                  } else {
                    setingUser(null);
                  }
                });
              })
              .catch((e) => console.log(e.message))
          }
        >
          Sign in with Google
        </Button>
      </Card>
    </Layout>
  );
}
