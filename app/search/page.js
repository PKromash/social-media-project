"use client";

import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getPosts} from "@/redux/actions/posts";
import {follow, getUsers} from "@/redux/actions/users";
import {useRouter} from "next/navigation";
import {BsFillFilePostFill} from "react-icons/bs";
import {FaUserAlt} from "react-icons/fa";

import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import ProfileAvatar from "@/components/ProfileAvatar";
import {useSession} from "next-auth/react";
import {SlUserFollow, SlUserUnfollow} from "react-icons/sl";

const Search = () => {
  const router = useRouter();
  const {data: session, status} = useSession();

  const [profileData, setProfileData] = useState(null);
  const [search, setSearch] = useState("");
  const [postsOrUsers, setPostsOrUsers] = useState("posts");
  const [followToggle, setFollowToggle] = useState(false);

  const users = useSelector((state) => {
    if (!search.length)
      return state.users.filter((user) => user._id !== session?.user.id);
    return state.users.filter((user) => {
      const name = user.name.toLowerCase();
      const username = user.username.toLowerCase();
      return (
        user._id.toString() !== session?.user.id.toString() &&
        (name.includes(search.toLowerCase()) ||
          username.includes(search.toLowerCase()))
      );
    });
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (session && status !== "loading") {
      const fetchProfileData = async () => {
        const response = await fetch(`/api/users/${session?.user.id}`);
        const data = await response.json();
        setProfileData(data);
      };
      fetchProfileData();
    }
  }, [session, followToggle]);

  const posts = useSelector((state) => {
    if (!search.length) return state.Posts;
    return state.Posts.filter((post) => {
      const postTitle = post.title.toLowerCase();
      const postTags = post.tags.join(" ").toLowerCase();
      const postMessage = post.message.toLowerCase();
      const postCreator = post.creator.name.toLowerCase();
      const postCreatorUsername = post.creator.username.toLowerCase();
      return (
        postTitle.includes(search.toLowerCase()) ||
        postTags.includes(search.toLowerCase()) ||
        postMessage.includes(search.toLowerCase()) ||
        postCreator.includes(search.toLowerCase()) ||
        postCreatorUsername.includes(search.toLowerCase())
      );
    });
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Flex align="center" alignContent="top">
        <Spacer />
        <Box
          p={3}
          pr={3}
          mt={{
            base: -3,
            md: 0,
          }}
          maxW={{
            base: "100%",
            lg: "300px",
          }}>
          <FormControl>
            <Input
              type="text"
              value={search}
              placeholder="Search..."
              onChange={handleSearch}
            />
          </FormControl>
        </Box>

        <Box
          p={3}
          m={1}
          mt={{
            base: -2,
            md: 0,
          }}
          borderRadius="md"
          css={{cursor: "pointer"}}
          backgroundColor={postsOrUsers === "posts" ? "#a482cb" : ""}
          onClick={() => setPostsOrUsers("posts")}>
          <BsFillFilePostFill />
        </Box>

        <Box
          p={3}
          m={1}
          mt={{
            base: -2,
            md: 0,
          }}
          borderRadius="md"
          css={{cursor: "pointer"}}
          backgroundColor={postsOrUsers === "users" ? "#a482cb" : ""}
          onClick={() => setPostsOrUsers("users")}>
          <FaUserAlt />
        </Box>

        <Spacer />
      </Flex>

      {postsOrUsers === "posts" ? (
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
                onClick={() => router.push(`/post?id=${post._id}`)}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    maxWidth: "350px",
                    maxHeight: "350px",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ))
          ) : (
            <Box mx="auto" mt={3}>
              No posts found
            </Box>
          )}
        </Box>
      ) : (
        <>
          {profileData && (
            <Box px={4} pt={{base: 0.5, md: 3}} w="100%">
              {users.length ? (
                <SimpleGrid
                  columns={{
                    base: 1,
                    md: 2,
                    lg: 3,
                  }}
                  spacing={2}>
                  {users.map((user) => (
                    <Box
                      key={user._id}
                      borderWidth="1px"
                      borderRadius="md"
                      p={2}
                      onClick={(e) => {
                        if (!e.target.closest(".follow-btn")) {
                          router.push(`/profile?id=${user._id}`);
                        }
                      }}
                      cursor="pointer">
                      <Flex align="center" gap={3}>
                        <ProfileAvatar
                          name={user.name}
                          username={user.username}
                          image={user.image}
                          size="30px"
                        />
                        <Text fontWeight="bold">{user.username}</Text>

                        <Spacer />

                        <Button
                          className="follow-btn"
                          colorScheme={
                            profileData.following.filter(
                              (follow) => follow._id === user._id
                            ).length > 0
                              ? "red"
                              : "blue"
                          }
                          variant="ghost"
                          size="md"
                          onClick={() => {
                            dispatch(follow(profileData._id, user._id)).then(
                              () => {
                                setFollowToggle(!followToggle);
                              }
                            );
                          }}>
                          {profileData.following.filter(
                            (follow) => follow._id === user._id
                          ).length > 0 ? (
                            <SlUserUnfollow />
                          ) : (
                            <SlUserFollow />
                          )}
                          {profileData.following.filter(
                            (follow) => follow._id === user._id
                          ).length > 0 ? (
                            <Text ml="2">Unfollow</Text>
                          ) : (
                            <Text ml="2">Follow</Text>
                          )}
                        </Button>
                      </Flex>
                    </Box>
                  ))}
                </SimpleGrid>
              ) : (
                <Box w="" mx="calc(50% - 50px)" mt={3}>
                  No users found
                </Box>
              )}
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Search;
