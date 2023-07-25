import Post from "@/models/post";
import connectToDB from "@/database";

export const GET = async (request) => {
  try {
    console.log("Connecting to the database...");
    await connectToDB();

    console.log("Fetching all posts...");
    const posts = await Post.find({})
      .populate("creator")
      .populate({
        path: "comments",
        populate: {
          path: "creator",
        },
      });

    console.log("Posts fetched successfully.");
    return new Response(JSON.stringify(posts), {status: 200});
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return new Response("Failed to fetch all posts", {status: 500});
  }
};
