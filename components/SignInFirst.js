"use client";

import {Box, Text, Button, Flex, Spacer} from "@chakra-ui/react";
import {useSession} from "next-auth/react";
import Feed from "./Feed";

const SignInPrompt = () => {
  const {data: session} = useSession();

  return (
    <>
      {session?.user ? (
        <Feed />
      ) : (
        <Box
          bg="white"
          px={4}
          py={2}
          boxShadow="md"
          borderRadius="md"
          width="100%"
          maxWidth={{base: "100%", md: "400px"}}
          mx="auto">
          <Flex alignItems="center">
            <Text color="purple.800" fontSize="sm" fontWeight="bold" mr={2}>
              Sign in to view posts
            </Text>
            {!session?.user && (
              <Button
                colorScheme="purple"
                size="sm"
                // onClick={() => signIn()}
                _hover={{bg: "purple.500"}}>
                Sign In
              </Button>
            )}
            <Spacer />
            <Text
              color="gray.500"
              fontSize="xs"
              mt={{base: 2, md: 0}}
              ml={{base: 0, md: 2}}>
              You need to sign in to view posts.
            </Text>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default SignInPrompt;
