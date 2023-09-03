import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Container,
  Avatar,
  Box,
  Flex,
  Text,
  Badge,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

export default function Profilepage() {
  const { currentUser, userData, createUser, setingUser, fetchUser } =
    useAuth();
  const [state, setState] = useState({
    age: null,
    gender: "",
  });
  console.log(
    typeof userData,
    userData,
    !userData,
    userData === null,
    userData?.length !== 0,
    !userData && userData?.length !== 0,
    "userData"
  );
  useEffect(() => {
    if (currentUser) {
      fetchUser(currentUser).then((res) => {
        console.log(res.docs);
        if (res?.docs?.length >= 1) {
          setingUser(res.docs);
        } else {
          setingUser(null);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  return (
    <Layout>
      <Heading>Profile page</Heading>
      {!userData && userData === null ? (
        <Card maxW="md" mx="auto" mt={4}>
          <Heading textAlign="center" my={12}>
            Wellcome to the Firebase app
          </Heading>
          <chakra.form>
            <Stack spacing="6">
              <FormControl id="email">
                <FormLabel>Age</FormLabel>
                <Input
                  name="age"
                  type="number"
                  required
                  value={state.age}
                  onChange={(e) => {
                    setState({ ...state, [e.target.name]: e.target.value });
                  }}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Gender</FormLabel>
                <Input
                  name="gender"
                  value={state.gender}
                  onChange={(e) => {
                    setState({ ...state, [e.target.name]: e.target.value });
                  }}
                  required
                />
              </FormControl>
              <Button
                type="button"
                onClick={() => {
                  createUser({
                    uid: currentUser.uid,
                    name: currentUser.displayName,
                    authProvider: "google",
                    email: currentUser.email,
                    age: state.age,
                    gender: state.gender,
                  }).then(() => {
                    fetchUser(currentUser).then((res) => {
                      console.log(res);
                      if (res.docs.length >= 1) {
                        setingUser(res.docs);
                      } else {
                        setingUser(null);
                      }
                    });
                  });
                }}
                colorScheme="pink"
                size="lg"
                fontSize="md"
              >
                Add Data
              </Button>
            </Stack>
          </chakra.form>
        </Card>
      ) : (
        <Container maxW="container.lg" overflowX="auto" py={4}>
          <Box
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="lg"
            textAlign="center"
          >
            <Avatar
              size="xl"
              src={currentUser.photoURL}
              alt={currentUser.displayName}
              mb={2}
            />
            <Text fontWeight="bold" fontSize="lg">
              {currentUser.displayName}
            </Text>
            <Text color="gray.500" fontSize="sm" mt={1}>
              {currentUser.email}
            </Text>

            {userData && (
              <Flex justifyContent="center" mt={2}>
                <Badge colorScheme="teal" variant="subtle" mr={2}>
                  {
                    userData?.[0]._document.data.value.mapValue.fields.age
                      .stringValue
                  }{" "}
                  years old
                </Badge>
                <Badge colorScheme="pink" variant="subtle">
                  {
                    userData?.[0]._document.data.value.mapValue.fields.gender
                      .stringValue
                  }
                </Badge>
              </Flex>
            )}
          </Box>
        </Container>
      )}
    </Layout>
  );
}
