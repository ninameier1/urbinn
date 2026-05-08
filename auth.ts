import NextAuth from 'next-auth'
import Resend from "next-auth/providers/resend"

import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
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



// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"

// import { prisma } from "@/lib/prisma"

// import type { Session } from "next-auth"
// import type { JWT } from "next-auth/jwt"

// import bcrypt from "bcryptjs"

// export const { handlers, auth, signIn, signOut } = NextAuth({

//   session: {
//     strategy: "jwt",
//     maxAge: 8 * 60 * 60, // 8 hours, like a normal working day, log in once a day
//   },

//   providers: [
//     Credentials({
//         credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//         },

//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email as string },
//         })

//         if (!user) return null

//         const valid = await bcrypt.compare(
//           credentials.password as string,
//           user.password_hash
//         )

//         if (!valid) return null

//         return {
//           id: String(user.id),
//           email: user.email,
//           name: user.username,
//         }
//       },
//     }),
//   ],

//   callbacks: { // okay so it freaks out if I don't add this 
//     async jwt({ token, user }: { token: JWT; user?: any }) {
//       if (user) token.id = user.id
//       return token
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       if (session.user) {
//         session.user.id = token.id as string
//       }
//       return session
//     },
//   },



//   // callbacks: { 
//   // async jwt({ token, user }: any) {
//   // if (user) token.id = user.id; 
//   // return token
//   //     },
//   // async session({ session, token }: any) {
//   // if (session.user) {
//   // session.user.id = token.id; 
//   //     }
//   // return session
//   //     }
//   //   },

//   pages: {
//     signIn: "/login",
//   },
// })