import connectToDB from "@/database";
import Post from "@/models/post";

export const POST = async (req) => {
  const {userId, title, message, image, tags} = await req.json();

  try {
    await connectToDB();
    const newPost = await Post.create({
      creator: userId,
      title,
      message,
      image,
      tags,
    });
    await newPost.save();
    return new Response(JSON.stringify(newPost), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create prompt", {
      status: 500,
    });
  }
};
