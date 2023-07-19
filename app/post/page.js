"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  IconButton,
  Spacer,
  Image,
} from "@chakra-ui/react";
import {useSearchParams} from "next/navigation";
import ProfileAvatar from "@/components/ProfileAvatar";
import {useSession} from "next-auth/react";
import {useDispatch} from "react-redux";
import {getPosts, newComment, deleteComment} from "@/redux/actions/posts";
import {BiArrowBack} from "react-icons/bi";
import {AiFillHeart, AiOutlineHeart, AiFillDelete} from "react-icons/ai";
import {likePost} from "@/redux/actions/posts";
import {useSelector} from "react-redux";

const CommentForm = ({setShowForm, post}) => {
  const [comment, setComment] = useState("");
  const {data: session} = useSession();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.length) return;
    try {
      dispatch(newComment(session?.user.id, comment, post._id));
    } catch (error) {
      console.log(error);
    }
    setComment("");
    setShowForm(false);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Comment:</FormLabel>
          <Input
            as="textarea"
            resize="vertical"
            value={comment}
            h="35px"
            minH="35px"
            maxW={{
              base: "100%",
              md: "30%",
            }}
            pt={1}
            onChange={(e) => setComment(e.target.value)}></Input>
        </FormControl>
        <Flex>
          <Button type="submit" colorScheme="purple" size="sm" mt={2}>
            Post
          </Button>

          <Button
            size="sm"
            mt={2}
            ml={2}
            onClick={() => setShowForm(false)}
            variant="outline">
            Cancel
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

const PostPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showForm, setShowForm] = useState(false);
  const {data: session} = useSession();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateIsMobile);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", updateIsMobile);
      }
    };
  }, []);

  const post = useSelector((state) => {
    return state.Posts.find((post) => post._id === searchParams.get("id"));
  });

  const [postHeight, setPostHeight] = useState(null);

  useEffect(() => {
    const updatePostHeight = () => {
      const postElement = document.getElementById("post-content");
      if (postElement) {
        setPostHeight(postElement.clientHeight);
      }
    };
    updatePostHeight();
    window.addEventListener("resize", updatePostHeight);
    return () => {
      window.removeEventListener("resize", updatePostHeight);
    };
  }, [post]);

  return (
    <>
      {post ? (
        <Box p={4} mt="2" display="flex" flexWrap="wrap">
          <Button
            leftIcon={<BiArrowBack />}
            onClick={() => router.back()}
            ml={2}
            variant="ghost">
            Back
          </Button>
          <Box
            flex="0 0 100%"
            mt="4"
            display="flex"
            flexDirection={{base: "column", md: "row"}}>
            {isMobile && (
              <>
                <Flex alignItems="center" mb={4}>
                  <ProfileAvatar
                    userId={post.creator._id}
                    image={post.creator.image}
                    size="50px"
                  />
                  <Text fontWeight="bold" ml={2} fontSize="lg">
                    {post.creator.username}
                  </Text>
                </Flex>
                <Heading as="h1" fontSize="3xl" mb="5" mx="auto">
                  {post.title}
                </Heading>
              </>
            )}
            {isMobile ? (
              <>
                <Image
                  src={post.image}
                  alt="Post"
                  id="post-content"
                  maxW={{
                    base: "100%",
                    md: "65%",
                    xl: "60%",
                  }}
                  ml={{base: "0", lg: "25px", xl: "80px"}}
                />

                <Divider />
              </>
            ) : (
              <Box
                flex="0 0 100%"
                ml={{base: "0", lg: "25px", xl: "80px"}}
                maxW={{
                  base: "100%",
                  md: "65%",
                  xl: "60%",
                }}
                maxH={postHeight}>
                <img src={post.image} alt="Post" id="post-content" />
              </Box>
            )}
            <Box
              flex="0 0 100%"
              alignContent="flex-start"
              pt={4}
              ml={{base: "0", md: "4"}}
              minW={{
                base: "50%",
                md: "30%",
                xl: "20%",
              }}>
              {!isMobile && (
                <Flex alignItems="center" mb={4} mx="auto">
                  <ProfileAvatar
                    userId={post.creator._id}
                    image={post.creator.image}
                    size={{base: "35px", md: "45px", xl: "50"}}
                  />
                  <Text
                    fontWeight="bold"
                    ml={2}
                    fontSize={{
                      base: "md",
                      md: "lg",
                      xl: "xl",
                    }}>
                    {post.creator.username}
                  </Text>
                </Flex>
              )}
              {!isMobile && (
                <Heading as="h1" fontSize="xl" mb="2">
                  {post.title}
                </Heading>
              )}
              <Text
                fontSize="lg"
                mt="4"
                style={{display: "block", clear: "both"}}>
                {post.message}
              </Text>
              <Box mt="4">
                <Flex alignItems="center">
                  <IconButton
                    icon={
                      post.likes.find(
                        (like) => (like._id || like) === session?.user.id
                      ) ? (
                        <AiFillHeart style={{color: "#e32951"}} />
                      ) : (
                        <AiOutlineHeart />
                      )
                    }
                    aria-label="Like"
                    variant="ghost"
                    size="sm"
                    mr="2"
                    onClick={() =>
                      dispatch(likePost(post._id, session?.user.id))
                    }
                  />
                  <Text>
                    {post.likes.length} like{post.likes.length !== 1 ? "s" : ""}
                  </Text>
                </Flex>
                <Flex alignItems="flex-end" mt={2}>
                  <Heading as="h2" fontSize="ms" mb="2">
                    Comments: {post.comments.length}
                  </Heading>

                  <Button
                    size="sm"
                    ml="2"
                    onClick={() => setShowForm(!showForm)}
                    variant="ghost">
                    Add Comment
                  </Button>
                </Flex>
                {showForm && (
                  <CommentForm setShowForm={setShowForm} post={post} />
                )}
                <Box mt={2}>
                  {post.comments.map((comment) => (
                    <Box
                      key={comment._id}
                      mb="4"
                      p={2}
                      border="1px solid #ccc"
                      borderRadius="lg"
                      maxW={{
                        base: "100%",
                        md: "30%",
                      }}
                      overflowX="auto">
                      <Flex alignItems="center" mb={3}>
                        <ProfileAvatar
                          userId={comment.creator._id}
                          image={comment.creator.image}
                          size={{base: "25px", md: "35px", xl: "40px"}}
                        />
                        <Text
                          fontWeight="bold"
                          ml={2}
                          fontSize={{
                            base: "sm",
                            md: "md",
                            xl: "lg",
                          }}>
                          {comment.creator.username}
                        </Text>
                        <Spacer />
                        {comment.creator._id === session?.user.id && (
                          <Button
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() =>
                              dispatch(deleteComment(post._id, comment._id))
                            }>
                            <AiFillDelete />
                          </Button>
                        )}
                      </Flex>
                      <Divider mb={1} />
                      <Text fontSize="md" ml="2">
                        {comment.message}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          p={2}
          maxW="1000px"
          mx="auto"
          mt="2"
          display="flex"
          justifyContent="space-between">
          <Box flex="2/3" mr="4">
            <Skeleton
              height={{
                base: "300px",
                md: "500px",
                xl: "700px",
              }}
              width={{
                base: "300px",
                md: "500px",
                xl: "700px",
              }}
              borderRadius="lg"
            />
          </Box>
          <Box
            flex="1/3"
            alignContent="flex-start"
            pt={4}
            ml={{
              base: "0",
              md: "2",
              xl: "4",
            }}>
            <SkeletonCircle size="50px" mb={2} />
            <SkeletonText mb={2} noOfLines={1} spacing={2} />
            <Skeleton height="20px" width="350px" mb={2} />
            <SkeletonText mb={2} noOfLines={3} spacing={2} />
            <Skeleton height="20px" width="300px" mb={2} />
            <SkeletonText mb={2} noOfLines={1} spacing={2} />
            <Skeleton height="20px" width="300px" mb={2} />
            <SkeletonText mb={2} noOfLines={1} spacing={2} />
            <Skeleton height="20px" width="300px" mb={2} />
            <SkeletonText mb={2} noOfLines={1} spacing={2} />
            <Skeleton height="20px" width="300px" mb={2} />
            <SkeletonText mb={2} noOfLines={1} spacing={2} />
            <Skeleton height="20px" width="350px" mb={2} />
            <SkeletonText mb={2} noOfLines={2} spacing={2} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default PostPage;
