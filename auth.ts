import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours, like a normal working day, log in once a day
  },

  providers: [
    Credentials({
        credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user) return null

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password_hash
        )

        if (!valid) return null

        return {
          id: String(user.id),
          email: user.email,
          name: user.username,
        }
      },
    }),
  ],

  callbacks: { // okay so it freaks out if I don't add this 
    async jwt({ token, user }: any) {
    if (user) token.id = user.id; 
    return token
    },

    async session({ session, token }: any) {
    if (session.user) {
        session.user.id = token.id; 
    }
    return session
    }
  },

  pages: {
    signIn: "/login",
  },
})