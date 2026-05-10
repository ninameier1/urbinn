import NextAuth from 'next-auth'
import Resend from "next-auth/providers/resend"

import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
    maxAge: 8 * 60 * 60, // 8 hours
    updateAge: 60 * 60,  // refresh the expiry timestamp every hour
  },
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: 'onboarding@resend.dev',
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = String(user.id)
      }

      if (Math.random() < 0.01) { // not too often so it doesn't slow stuff down
        await prisma.session.deleteMany({ //housekeeping
          where: { expires: { lt: new Date() } },
        })
      }

      return session
    },

    async signIn({ user }) {
      const email = user.email;
      if (!email) return false;

      const invite = await prisma.invite.findUnique({
        where: {
        email: email.toLowerCase().trim(),
        },
      });

      return !!invite;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/cms`
    },
  },
  pages: {
    signIn: '/login',
    verifyRequest: '/login?verify=true',
  },
})