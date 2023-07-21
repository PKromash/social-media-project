import connectToDB from "@/database";
import Post from "@/models/post";

export const PATCH = async (request, {params}) => {
  console.log("likePost route");
  const {id, userId} = params;
  try {
    await connectToDB();
    const post = await Post.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: {path: "creator"},
      });

    if (!post) return new Response("Post not found.", {status: 404});

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    return new Response(JSON.stringify(post), {status: 200});
  } catch (error) {
    console.log(error);
    return new Response(error, {status: 500});
  }
};
