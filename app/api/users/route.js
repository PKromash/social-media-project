import connectToDB from "@/database";
import User from "@/models/user";

export const GET = async (req) => {
  try {
    await connectToDB();
    const users = await User.find();
    return new Response(JSON.stringify(users), {status: 200});
  } catch (error) {
    console.log(error);
    return new Response(error, {status: 500});
  }
};
