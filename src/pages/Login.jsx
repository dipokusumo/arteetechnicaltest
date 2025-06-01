import React, { useState } from "react";
import {
  Flex,
  Box,
  Button,
  Input,
  VStack,
  Heading,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Loading from "../component/loading";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        if (data.message === "Email not found") {
          setError("Email not found");
        } else if (data.message === "Incorrect password") {
          setError("Incorrect password");
        } else if (data.message === "Validation Error") {
          setError("Email or password is required");
        } else {
          setError(data.message || "Something went wrong. Please try again.");
        }
      } else {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        navigate("/task");
      }
    } catch (setError) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  if (loading) return <Loading />;

  return (
    <Flex minH="100vh" align="center" justify="center" bg="blue.900" px={4}>
      <Box
        w={["100%", "90%", "md"]}
        p={[6, 8]}
        bg="blue.800"
        boxShadow="2xl"
        borderRadius="lg"
        border="1px solid white"
      >
        <Heading
          as="h2"
          size="lg"
          mb="8"
          textAlign="center"
          color="secondary.500"
        >
          Task Manager
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing="5">
            <FormControl isInvalid={error}>
              <Input
                placeholder="Email"
                type="email"
                variant="flushed"
                focusBorderColor="secondary.500"
                color="white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl isInvalid={error}>
              <Input
                placeholder="Password"
                type="password"
                variant="flushed"
                focusBorderColor="secondary.500"
                color="white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>

            <Button
              colorScheme="primary"
              width="full"
              bg="primary.500"
              _hover={{ filter: "brightness(0.9)" }}
              type="submit"
            >
              Sign In
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;