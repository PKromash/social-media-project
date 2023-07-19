"use client";

import {useState, useEffect} from "react";
import {useSearchParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {getPosts, editPost, deletePost} from "@/redux/actions/posts";
import {
  Avatar,
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Spacer,
  Divider,
  FormControl,
  Input,
  Spinner,
} from "@chakra-ui/react";
import {SlUserFollow, SlUserUnfollow} from "react-icons/sl";
import {AiOutlineEdit, AiFillCheckCircle} from "react-icons/ai";
import {ImCancelCircle} from "react-icons/im";
import {follow, editUser} from "@/redux/actions/users";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import ProfileAvatar from "@/components/ProfileAvatar";
import {AiFillDelete} from "react-icons/ai";
import {BiDotsHorizontalRounded} from "react-icons/bi";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const searchParams = useSearchParams();
  const {data: session} = useSession();
  const router = useRouter();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const posts = useSelector((state) =>
    state.Posts.filter((post) => post.creator._id === searchParams.get("id"))
  );

  const users = useSelector((state) => state.users);

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch(`/api/users/${searchParams.get("id")}`);
      const data = await response.json();
      setProfileData(data);
    };
    fetchProfileData();
  }, [searchParams, users]);

  const handleSubmit = () => {
    dispatch(editUser(profileData, profileData._id));
    setShowEdit(false);
  };

  return (
    <Box pt={2}>
      {profileData ? (
        <Box maxW="900px" mx="auto" display="flex">
          <Box flex="1" m={4}>
            <Flex flexDirection="column">
              <Box mb="4">
                <Heading as="h2" fontSize="lg" mb="2">
                  Following
                </Heading>
                <Divider />
                {profileData.following.length ? (
                  profileData.following.map((user) => (
                    <Flex align="center" my="2" key={user._id}>
                      <ProfileAvatar
                        userId={user._id}
                        image={user.image}
                        size="35px"
                      />
                      <Text ml="2">{user.username}</Text>
                    </Flex>
                  ))
                ) : (
                  <Text mt="2">No users followed yet</Text>
                )}
              </Box>

              <Box mb="4">
                <Heading as="h2" fontSize="lg" mb="2">
                  Followers
                </Heading>
                <Divider />
                {profileData.followers.length ? (
                  profileData.followers.map((user) => (
                    <Flex align="center" my="2" key={user._id}>
                      <ProfileAvatar
                        userId={user._id}
                        image={user.image}
                        size="35px"
                      />
                      <Text ml="2">{user.username}</Text>
                    </Flex>
                  ))
                ) : (
                  <Text mt="2">No users following yet</Text>
                )}
              </Box>
            </Flex>
          </Box>

          <Box flex="3">
            <Box textAlign="center" my="4">
              <Flex align="center" mx="auto" gap={2}>
                <Spacer />
                <Avatar
                  size="lg"
                  name={profileData.name}
                  src={profileData.image}
                />
                {session?.user.id !== profileData._id && (
                  <Button
                    colorScheme={
                      profileData.followers.filter(
                        (user) => user._id === session?.user.id
                      ).length > 0
                        ? "red"
                        : "blue"
                    }
                    variant="ghost"
                    size="md"
                    onClick={() =>
                      dispatch(follow(session?.user.id, profileData._id))
                    }>
                    {profileData.followers.filter(
                      (user) => user._id === session?.user.id
                    ).length > 0 ? (
                      <SlUserUnfollow />
                    ) : (
                      <SlUserFollow />
                    )}
                    {profileData.followers.filter(
                      (user) => user._id === session?.user.id
                    ).length > 0 ? (
                      <Text ml="2">Unfollow</Text>
                    ) : (
                      <Text ml="2">Follow</Text>
                    )}
                  </Button>
                )}
                <Spacer />
              </Flex>

              <Flex align="center" justify="center">
                {showEdit ? (
                  <FormControl id="username" isRequired mt={2} maxW="175px">
                    <Input
                      type="text"
                      placeholder="Username"
                      value={profileData.username}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          username: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                ) : (
                  <Heading as="h1" fontSize="xl" my="2" textAlign="center">
                    {profileData.username}
                  </Heading>
                )}
                <>
                  {session?.user.id === profileData._id && (
                    <>
                      <Button
                        colorScheme={showEdit ? "red" : "blue"}
                        variant="ghost"
                        size="md"
                        ml="2"
                        onClick={() => setShowEdit(!showEdit)}>
                        {showEdit ? <ImCancelCircle /> : <AiOutlineEdit />}
                      </Button>
                      {showEdit && (
                        <Button
                          colorScheme="green"
                          variant="ghost"
                          size="md"
                          onClick={handleSubmit}>
                          <AiFillCheckCircle />
                        </Button>
                      )}
                    </>
                  )}
                </>
              </Flex>

              <Text fontSize="md" color="gray.500">
                {profileData.name}
              </Text>
            </Box>
            <Flex align="center" justify="center" mb="4" mt="-3" gap={2}>
              <Text fontSize="md" color="gray.500" fontWeight="bold">
                Posts: {posts.length}
              </Text>
              <Text fontSize="md" color="gray.500" fontWeight="bold">
                Followers: {profileData.followers.length}
              </Text>
              <Text fontSize="md" color="gray.500" fontWeight="bold">
                Following: {profileData.following.length}
              </Text>
            </Flex>

            <Divider />

            <Box mt="4">
              <Box
                px={4}
                pt={{base: 0.5, md: 3}}
                display="grid"
                gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
                gap={4}>
                {posts.length ? (
                  posts.map((post) => (
                    <Box
                      key={post._id}
                      width="100%"
                      paddingBottom="100%"
                      position="relative"
                      overflow="hidden"
                      borderRadius="md"
                      onClick={(e) => {
                        if (!e.target.closest(".edit, .delete")) {
                          router.push(`/post?id=${post._id}`);
                        }
                      }}>
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          maxWidth: "600px",
                          maxHeight: "600px",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      {session?.user.id === profileData._id && (
                        <>
                          <Box
                            className="delete"
                            position="absolute"
                            top="8px"
                            right="50px"
                            borderRadius="lg"
                            p={1.5}
                            zIndex="1"
                            backgroundColor="rgba(255, 255, 255, 0.3)"
                            _hover={{
                              backgroundColor: "rgba(105, 105, 240, 0.5)",
                            }}
                            color="blue.600"
                            onClick={() =>
                              router.push(`/create-post?id=${post._id}`)
                            }>
                            <BiDotsHorizontalRounded />
                          </Box>

                          <Box
                            className="delete"
                            position="absolute"
                            top="8px"
                            right="8px"
                            borderRadius="lg"
                            p={1.5}
                            zIndex="1"
                            backgroundColor="rgba(255, 255, 255, 0.3)"
                            _hover={{
                              backgroundColor: "rgba(240, 105, 105, 0.5)",
                            }}
                            color="red"
                            onClick={() => dispatch(deletePost(post._id))}>
                            <AiFillDelete />
                          </Box>
                        </>
                      )}
                    </Box>
                  ))
                ) : (
                  <Box mx="auto" mt={3}>
                    No posts yet
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          mt="-100px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width
          mx>
          <Spinner size="xl" />
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
