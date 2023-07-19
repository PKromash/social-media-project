"use client";

import {
  Box,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Input,
  useStyleConfig,
  Text,
  Flex,
} from "@chakra-ui/react";
import {useRouter} from "next/navigation";
import FileBase64 from "react-file-base64";

const PostForm = ({type, post, setPost, submitting, onSubmit}) => {
  const styles = useStyleConfig("Form");
  const router = useRouter();

  return (
    <Box
      mx={{
        base: -2,
        md: 0,
      }}
      pt={{
        base: 0,
        md: 1,
      }}>
      <Box
        as="form"
        onSubmit={onSubmit}
        m={5}
        sx={{
          ...styles,
          backdropFilter: "blur(10px)",
          boxShadow: "lg",
          borderRadius: "lg",
          bgColor: "rgba(255, 255, 255, 0.1)",
          py: 4,
          px: 8,
          bg: "purple.100",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          color="purple.700"
          textAlign="center"
          mb={1}
          sx={{
            textShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}>
          {type === "create" ? "Create a Post" : "Update your post"}
        </Text>
        <FormControl>
          <FormLabel
            fontWeight="bold"
            color="gray.700"
            fontSize="lg"
            marginBottom={2}>
            Title
          </FormLabel>
          <Input
            type="text"
            value={post.title}
            placeholder="Your post's title..."
            onChange={(e) => setPost({...post, title: e.target.value})}
            required
            bg="rgba(255, 255, 255, 0.5)"
            _placeholder={{color: "gray.400"}}
            borderRadius="md"
            boxShadow="sm"
            _focus={{
              bg: "white",
              boxShadow: "outline",
            }}
          />
        </FormControl>

        <FormControl mt={6}>
          <FormLabel
            fontWeight="bold"
            color="gray.700"
            fontSize="lg"
            marginBottom={2}>
            Message
          </FormLabel>
          <Textarea
            value={post.message}
            placeholder="Your post's message..."
            onChange={(e) => setPost({...post, message: e.target.value})}
            required
            bg="rgba(255, 255, 255, 0.5)"
            _placeholder={{color: "gray.400"}}
            resize="vertical"
            minHeight="120px"
            borderRadius="md"
            boxShadow="sm"
            _focus={{
              bg: "white",
              boxShadow: "outline",
            }}
          />
        </FormControl>

        <FormControl mt={6}>
          <Flex align="baseline">
            <FormLabel
              fontWeight="bold"
              color="gray.700"
              fontSize="lg"
              marginBottom={2}>
              Tags
            </FormLabel>
            <Text fontSize="md">{"(Separate tags with spaces)"}</Text>
          </Flex>
          <Input
            type="text"
            placeholder="tag1 tag2 tag3..."
            value={post.tags}
            onChange={(e) => setPost({...post, tags: e.target.value})}
            required
            bg="rgba(255, 255, 255, 0.5)"
            _placeholder={{color: "gray.400"}}
            borderRadius="md"
            boxShadow="sm"
            _focus={{
              bg: "white",
              boxShadow: "outline",
            }}
          />
        </FormControl>

        <FormControl mt={6}>
          <FormLabel
            fontWeight="bold"
            color="gray.700"
            fontSize="lg"
            marginBottom={2}>
            Image
          </FormLabel>
          <FileBase64
            multiple={false}
            value={post.image}
            onDone={({base64}) => setPost({...post, image: base64})}
          />
        </FormControl>

        <Flex>
          <Button
            disabled={submitting}
            mt={6}
            type="submit"
            colorScheme="purple"
            variant="solid"
            size="lg"
            width="20%"
            minW="140px"
            borderRadius="md">
            {submitting ? "Submitting..." : "Submit"}
          </Button>

          <Button
            disabled={submitting}
            mt={6}
            ml={4}
            colorScheme="purple"
            variant="outline"
            size="lg"
            width="20%"
            minW="140px"
            borderRadius="md"
            onClick={() => router.back()}>
            Cancel
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default PostForm;
