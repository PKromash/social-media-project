import Post from "@/models/post";
import connectToDB from "@/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const posts = await Post.find({})
      .populate("creator")
      .populate({
        path: "comments",
        populate: {
          path: "creator",
        },
      });

    return new Response(JSON.stringify(posts), {status: 200});
  } catch (error) {
    return new Response("Failed to fetch all posts", {status: 500});
  }
};
