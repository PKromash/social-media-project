import connectToDB from "@/database";
import User from "@/models/user";

export const PATCH = async (req, {params}) => {
  const {userId, followId} = params;
  console.log("follow route");

  try {
    await connectToDB();
    const follower = await User.findById(userId);
    if (!follower) {
      return new Response("User not found.", {status: 404});
    }
    const followee = await User.findById(followId);
    if (!followee) {
      return new Response("User not found.", {status: 404});
    }

    if (follower.following.includes(followId)) {
      follower.following = follower.following.filter(
        (id) => id.toString() !== followId
      );
      followee.followers = followee.followers.filter(
        (id) => id.toString() !== userId
      );
    } else {
      follower.following.push(followId);
      followee.followers.push(userId);
    }

    await follower.save();
    await followee.save();
    return new Response(JSON.stringify(follower), {status: 200});
  } catch (error) {
    console.log(error);
    return new Response(error, {status: 500});
  }
};
