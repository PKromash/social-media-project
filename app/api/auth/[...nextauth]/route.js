import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDB from "@/database";
import User from "../../../../models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "285153223021-598sdh1qv98q7hi1ko7knun8pekbkgfi.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async session({session}) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({profile}) {
      try {
        await connectToDB();
        const userExists = await User.findOne({email: profile.email});

        if (!userExists) {
          await User.create({
            name: profile.name,
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export {handler as GET, handler as POST};
