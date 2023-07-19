"use client";

import {useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {newPost, updatePost} from "@/redux/actions/posts";

import Form from "../../components/Form";

const CreatePost = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const postData =
    id && useSelector((state) => state.Posts.find((post) => post._id === id));

  const [post, setPost] = useState({
    title: postData?.title?.toString() || "",
    message: postData?.message?.toString() || "",
    image: postData?.image?.toString() || "",
    tags: postData?.tags.join(" ")?.toString() || "",
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

  const editPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      dispatch(
        updatePost(postData._id, {
          userId: session?.user.id,
          title: post.title,
          message: post.message,
          image: post.image,
          tags: post.tags.split(" "),
        })
      ).then(() => router.push("/"));
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type={postData ? "edit" : "create"}
      post={post}
      setPost={setPost}
      submitting={submitting}
      onSubmit={postData ? editPost : createPost}
    />
  );
};

export default CreatePost;
