"use client";

import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";

import Form from "./Form";
import {newPost} from "@/redux/actions/posts";

const CreatePost = ({postData}) => {
  const router = useRouter();
  const {data: session} = useSession();
  const dispatch = useDispatch();

  const [post, setPost] = useState({
    title: "",
    message: "",
    image: "",
    tags: [],
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!session?.user) {
      router.push("/");
    }
  }, [session]);

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      dispatch(
        newPost({
          userId: session?.user.id,
          title: post.title,
          message: post.message,
          image: post.image,
          tags: post.tags.split(" "),
        })
      );
      router.push("/");
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="create"
      post={postData || post}
      setPost={setPost}
      submitting={submitting}
      onSubmit={createPost}
    />
  );
};

export default CreatePost;
