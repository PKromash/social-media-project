import connectToDB from "@/database";
import Post from "@/models/post";

export const GET = async (request, {params}) => {
  try {
    await connectToDB();
    const post = await Post.findById(params.id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: {path: "creator"},
      });
    if (!post) return new Response("Post not found.", {status: 404});

    return new Response(JSON.stringify(post), {status: 200});
  } catch (error) {
    console.log(error);
    return new Response(error, {status: 500});
  }
};

export const PATCH = async (request, {params}) => {
  try {
    await connectToDB();
    const post = await request.json();
    const existingPost = await Post.findById(params.id);
    if (!existingPost) return new Response("Post not found.", {status: 404});

    await Post.findByIdAndUpdate(params.id, post);

    return new Response(JSON.stringify(post), {status: 200});
  } catch (error) {
    console.log(error);
    return new Response(error, {status: 500});
  }
};

export const DELETE = async (request, {params}) => {
  try {
    await connectToDB();
    await Post.findByIdAndDelete(params.id);
    return new Response("Post deleted successfully.", {status: 200});
  } catch (error) {
    console.log(error);
    return new Response(error, {status: 500});
  }
};
