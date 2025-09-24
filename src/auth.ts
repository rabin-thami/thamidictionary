import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/helper";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 10 * 60,
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  ...authConfig,
  debug: false, // turn off verbose NextAuth logs in dev
  logger: {
    error() {
      /* no-op to suppress stack traces */
    },
    warn() {
      /* no-op */
    },
    debug() {
      /* no-op */
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      return token;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.name = token.name || "";
        session.user.email = token.email || "";
        session.user.image = token.picture || "";
      }
      return session;
    },

    // Add a redirect callback to handle post-login redirects
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});
