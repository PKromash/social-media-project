import connectToDB from "../../../../../database";
import Post from "../../../../../models/post";

export const DELETE = async (req, {params}) => {
  const {id, creator: commentId} = params;

  try {
    await connectToDB();
    const existingPost = await Post.findById(id);

    if (!existingPost) {
      return new Response("Post not found.", {status: 404});
    }

    const comment = existingPost.comments.find(
      (comment) => comment._id.toString() === commentId.toString()
    );

    if (!comment) {
      return new Response("Comment not found.", {status: 404});
    }

    await existingPost.updateOne({
      $pull: {comments: {_id: commentId}},
    });

    await existingPost.populate({
      path: "comments",
      populate: {path: "creator"},
    });
    await existingPost.populate("creator");

    return new Response(JSON.stringify(existingPost), {status: 200});
  } catch (error) {
    console.log(error);
    return new Response(error, {status: 500});
  }
};
