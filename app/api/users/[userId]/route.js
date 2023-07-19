import connectToDB from "@/database";
import User from "@/models/user";

export const GET = async (req, {params}) => {
  const {userId} = params;

  try {
    await connectToDB();
    const existingUser = await User.findById(userId)
      .populate("following")
      .populate("followers");
    if (!existingUser) {
      return new Response("User not found.", {status: 404});
    }

    return new Response(JSON.stringify(existingUser), {status: 200});
  } catch (error) {
    console.log(error);
    return new Response(error, {status: 500});
  }
};

export const PATCH = async (req, {params}) => {
  const {userId} = params;

  try {
    await connectToDB();
    const user = await req.json();
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return new Response("User not found.", {status: 404});
    }

    existingUser.username = user.username;
    // TODO: add other update functionality
    await existingUser.save();
    return new Response(JSON.stringify(existingUser), {status: 200});
  } catch (error) {
    console.log(error);
    return new Response(error, {status: 500});
  }
};
