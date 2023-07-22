"use client";

import Post from "./posts/Post";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useSession} from "next-auth/react";
import {getPosts} from "@/redux/actions/posts";
import {Box, Flex, Grid} from "@chakra-ui/react";
import {getUsers} from "@/redux/actions/users";

const Feed = () => {
  const {data: session} = useSession();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch]);

  const posts = useSelector((state) => state.Posts);
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user._id === session?.user?.id);

  return (
    <Box
      mx={{
        base: "0",
        sm: "calc((100% - 500px) / 2)",
        lg: "calc((100% - 1000px) / 2)",
      }}
      pt={{
        base: 0,
        md: 0.1,
      }}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={4}>
        {posts &&
          posts
            .filter(
              (post) =>
                post.creator._id === session?.user?.id ||
                user.following.includes(post.creator._id)
            )
            .reverse()
            .map((post) => (
              <Box key={post._id}>
                <Post post={post} />
              </Box>
            ))}
      </Grid>
    </Box>
  );
};

export default Feed;
