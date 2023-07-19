import connectToDB from "../../../../../../database";
import Post from "../../../../../../models/post";

// Didn't want to do it this way but was having a weird issue with req.body

export const POST = async (req, {params}) => {
  const {id, creator, message} = params;

  try {
    await connectToDB();
    const existingPost = await Post.findById(id);

    if (!existingPost) {
      return new Response("Post not found.", {status: 404});
    }

    const comment = {
      creator,
      message,
      createdAt: new Date(),
    };

    existingPost.comments.push(comment);
    await existingPost.save();
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
