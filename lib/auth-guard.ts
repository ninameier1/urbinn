import { Session } from "next-auth"
import { auth } from "@/auth"

export async function requireAuth(): Promise<Session & { user: NonNullable<Session["user"]> }> {
  const session = await auth()

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  return session as Session & { user: NonNullable<Session["user"]> }
}
