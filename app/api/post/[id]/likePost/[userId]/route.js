import connectToDB from "@/database";
import Post from "@/models/post";

export const PATCH = async (request, {params}) => {
  const {id, userId} = params;
  try {
    await connectToDB();
    console.log("Fetching post from the database...");
    const post = await Post.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: {path: "creator"},
      });

    if (!post) {
      console.log("Post not found:", id);
      return new Response("Post not found.", {status: 404});
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      console.log("User has already liked the post. Removing like...");
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      console.log("User has not liked the post. Adding like...");
      post.likes.push(userId);
    }

    await post.save();

    console.log("Post updated successfully:", post);
    return new Response(JSON.stringify(post), {status: 200});
  } catch (error) {
    console.log("Error updating post:", error);
    return new Response(error, {status: 500});
  }
};
