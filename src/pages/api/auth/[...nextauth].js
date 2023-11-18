import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import yourDatabaseQueryToFetchUserData from "./getlogin";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        // Add your custom authentication logic here
        // For example, check credentials against a database
        const { email, password } = credentials;
        const userdata = await yourDatabaseQueryToFetchUserData(email, password);

        if (userdata) {
          return Promise.resolve({ id: 1, name: userdata.accessToken, email: credentials.email });
        } else {
          return Promise.resolve(null);
        }

      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
