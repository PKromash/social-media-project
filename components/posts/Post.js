import {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  IconButton,
  AspectRatio,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import {useDispatch} from "react-redux";
import {likePost} from "../../redux/actions/posts";
import ProfileAvatar from "../ProfileAvatar";
import {useRouter} from "next/navigation";

const Post = ({post}) => {
  const {data: session} = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Box
      bg="purple.50"
      border="1px solid #e6e6e6"
      borderRadius="4px"
      p="4"
      m="4"
      maxW="500px"
      boxShadow="sm"
      onClick={(e) => {
        if (!e.target.closest(".like-button, .profile-avatar")) {
          router.push(`/post?id=${post._id}`);
        }
      }}>
      <Flex align="center" className="profile-avatar">
        <ProfileAvatar
          userId={post.creator._id}
          image={post.creator.image}
          size="35px"
        />
        <Text
          fontWeight="bold"
          ml={2}
          onClick={() => router.push(`/post?id=${post._id}`)}>
          {post.creator.username}
        </Text>
      </Flex>

      <Text fontWeight="bold" fontSize="3xl" mb="2" color="purple.800">
        {post.title}
      </Text>

      <Divider mb={4} />

      <AspectRatio ratio={10 / 11} mb={2}>
        <Box
          bg="gray.200"
          borderRadius="md"
          overflow="hidden"
          display="flex"
          justifyContent="center"
          alignItems="center">
          <img
            src={post.image}
            alt="Post Image"
            style={{objectFit: "cover", width: "100%", height: "100%"}}
          />
        </Box>
      </AspectRatio>

      <Text color="gray.900" fontSize="lg" mb={1}>
        {post.message}
      </Text>

      <Text color="gray.700" fontSize="sm" mb={1}>
        {post.tags.map((tag) => `#${tag} `)}
      </Text>

      <Flex align="center" pr={3}>
        <IconButton
          icon={
            post.likes.find((like) => like === session?.user.id) ? (
              <AiFillHeart style={{color: "#e32951"}} />
            ) : (
              <AiOutlineHeart />
            )
          }
          aria-label="Like"
          variant="ghost"
          size="sm"
          mr="2"
          onClick={() => dispatch(likePost(post._id, session?.user.id))}
          className="like-button"
        />
        <Text mr={2}>
          {post.likes.length} like{post.likes.length !== 1 ? "s" : ""}
        </Text>

        <Spacer />
        <>
          {post.comments.length ? (
            <Text color="gray.500">{`${post.comments.length} comment${
              post.comments.length > 1 ? "s" : ""
            }`}</Text>
          ) : (
            <Text color="gray.500" fontSize="">
              No comments yet.
            </Text>
          )}
        </>
      </Flex>

      <Divider mt={2} />

      <Text mb="2">{post.caption}</Text>
      <Text color="gray.500" fontSize="sm">
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>
    </Box>
  );
};

export default Post;
