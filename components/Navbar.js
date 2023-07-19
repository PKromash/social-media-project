"use client";

import {signIn, signOut, useSession, getProviders} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import {
  Box,
  Flex,
  Spacer,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {ChevronDownIcon, ChevronRightIcon} from "@chakra-ui/icons";
import ProfileAvatar from "./ProfileAvatar";

const Navbar = () => {
  const router = useRouter();
  const {data: session, status} = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [session, status, router]);

  const {isOpen, onOpen, onClose} = useDisclosure();
  const isMobile = useBreakpointValue({base: true, md: false});

  const handleSignOut = () => {
    signOut().then(() => router.push("/"));
  };

  const handleSignIn = (providerId) => {
    signIn(providerId);
  };

  return (
    <Box
      bg="purple.100"
      px={5}
      py={4}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
      }}>
      <Flex alignItems="center">
        <Image
          src="./logo.png"
          mr={5}
          h={{base: "48px", md: "60px"}}
          w={{base: "48px", md: "60px"}}
          css={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => router.push("/")}></Image>
        <Heading
          color="purple.800"
          size="xl"
          css={{
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
          onClick={() => router.push("/")}>
          InstaChat
        </Heading>

        <Spacer />
        {isMobile && session?.user && (
          <Menu isOpen={isOpen} onClose={onClose}>
            <MenuButton
              mr={2}
              pr={3}
              onClick={onOpen}
              as={Button}
              variant="ghost"
              colorScheme="purple">
              Menu
              {!isOpen ? <ChevronRightIcon /> : <ChevronDownIcon />}
            </MenuButton>
            <MenuList>
              <MenuItem color="purple.800" onClick={() => router.push("/")}>
                Home
              </MenuItem>
              <MenuItem
                color="purple.800"
                onClick={() => router.push("/search")}>
                Search
              </MenuItem>
              <MenuItem
                color="purple.800"
                onClick={() => router.push("/create-post")}>
                Create
              </MenuItem>
              <MenuItem color="purple.800" onClick={handleSignOut}>
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        )}
        {!isMobile && session?.user && (
          <>
            <Button
              onClick={() => router.push("/create-post")}
              colorScheme="purple"
              variant="ghost"
              _active={{backgroundColor: "gray.50"}}
              _hover={{backgroundColor: "purple.200"}}>
              Create
            </Button>

            <Button
              onClick={() => router.push("/search")}
              colorScheme="purple"
              variant="ghost"
              _active={{backgroundColor: "gray.50"}}
              _hover={{backgroundColor: "purple.200"}}>
              Search
            </Button>

            <Button
              onClick={handleSignOut}
              colorScheme="purple"
              variant="ghost"
              mr={2}
              _active={{backgroundColor: "gray.50"}}
              _hover={{backgroundColor: "purple.200"}}>
              Sign Out
            </Button>
          </>
        )}
        {!session?.user &&
          providers &&
          Object.values(providers).map((provider) => (
            <Button
              colorScheme="purple"
              variant="ghost"
              key={provider.id}
              onClick={() => handleSignIn(provider.id)}
              mr={2}
              _active={{backgroundColor: "gray.50"}}
              _hover={{backgroundColor: "purple.200"}}>
              Sign In
            </Button>
          ))}
        {session?.user && (
          <ProfileAvatar
            userId={session?.user.id}
            image={
              session?.user.image ||
              `https://ui-avatars.com/api/?name=${session?.user.name}`
            }
            size="40px"
          />
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
