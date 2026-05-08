"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function handleLogin(_: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  if (!email) return { ok: false, error: "missing-email" };

  const invite = await prisma.invite.findUnique({
    where: { email },
  });

  if (!invite) {
    return { ok: false, error: "not-invited" };
  }

  try {
    await signIn("resend", { email, redirect: false });
    return { ok: true };
  } catch {
    return { ok: false, error: "sign-in-failed" };
  }
}

export async function logout() {
  await signOut();
}