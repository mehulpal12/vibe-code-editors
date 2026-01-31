import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db" // Your prisma instance

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db), // This is the missing link!
  providers: [Google, GitHub],
  session: { strategy: "jwt" }, // Required if using middleware/certain adapters
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
})