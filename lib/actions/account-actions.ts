"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from 'zod'
import { requireAuth } from "@lib/auth/auth-guard";

export async function handleLogin(_: any, formData: FormData) {
  if (!(formData instanceof FormData)) return null

  const email = formData.get('email')?.toString().trim().toLowerCase();
  if (!email) return { ok: false, error: "missing-email" };

  const user = await prisma.user.findUnique({ 
    where: { email },
    select: { deletedAt: true },
  });
  if (user?.deletedAt) return { ok: false, error: "account-deleted" };

  const invite = await prisma.invite.findUnique({ where: { email } });
  if (!invite) return { ok: false, error: "not-invited" };

  try {
    await signIn("resend", {
      email,
      redirect: false,
      redirectTo: "/cms",
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "sign-in-failed" };
  }
}

export async function logout() {
    await signOut({
    redirectTo: "/login",
  });
}

const UpdateUsernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Naam moet bestaan uit minstens drie letters")
    .max(30, "Naam te lang")
    .regex(/^[a-zA-Z0-9_\- ]+$/, "Naam mag geen ongeldige tekens bevatten"),
})

export async function updateUsername(formData: FormData) {
  const session = await requireAuth()
  const userId = Number(session.user.id)

  const parsed = UpdateUsernameSchema.safeParse({
    username: formData.get('username'),
  })

  if (!parsed.success) {
  throw new Error(parsed.error.issues[0].message)
  }

  await prisma.user.update({
    where: { id: userId },
    data: { username: parsed.data.username },
  })
}

export async function deleteAccount() {
  const session = await requireAuth()
  const userId = Number(session.user.id)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  })
  if (!user) throw new Error("User not found")

  if (user.email) {
    await prisma.invite.deleteMany({ where: { email: user.email } })
  }
  await prisma.user.update({
    where: { id: userId },
    data: { deletedAt: new Date() },
  })
  await signOut({ redirectTo: '/' })
}
