import React from "react";
import { Center, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center height="100vh">
      <Spinner thickness="7px" speed="0.65s" color="secondary.500" size="xl" />
    </Center>
  );
};

export default Loading;