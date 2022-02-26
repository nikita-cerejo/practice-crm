import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByLocalId } from "../../../lib/api-util";

export default NextAuth({
  //   session: {
  //     strategy: "jwt",
  //     maxAge: 30 * 24 * 60 * 60,
  //   },
  providers: [
    CredentialsProvider({
      authorize: async (credentials, req) => {
        //   try{
        const response = await fetch(
          `${process.env.AUTH_URL}signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              returnSecureToken: true,
            }),
          }
        );

        let user = await response.json();
        if (!response.ok) {
          throw new Error(JSON.stringify(user.error));
        }

        if (response.ok && user) {
          const data = await getUserByLocalId(user.localId);
          const user_data = { ...user, ...data };
          //   console.log(user_data);
          return user_data;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.idToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.expiresIn,
          mobile: user.mobile,
          role: user.role,
          id: user.id,
          is_active: user.is_active,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;
      session.user.mobile = token.mobile;
      session.user.role = token.role;
      session.user.id = token.id;
      session.user.is_active = token.is_active;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET,
});
