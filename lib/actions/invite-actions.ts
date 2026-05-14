"use server";

import crypto from "crypto";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isAllowedEmail } from '@/utils/emails'

// -------- INVITE USER --------
export async function inviteUser(email: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const normalizedEmail = email.toLowerCase().trim();
  // is user part of Windesheim of VU
    if (!isAllowedEmail(normalizedEmail)) {
    throw new Error("E-mailadres domein is niet toegestaan");
  }

  // does user exist
  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    throw new Error("Gebruiker bestaat al");
  }

  // keep it secret, keep it safe
  const token = crypto.randomBytes(32).toString("hex");

  // 48 hours or bust
  const expiresAt = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 2
  );

  // create or refresh
  await prisma.invite.upsert({
    where: {
      email: normalizedEmail,
    },
    update: {
      token,
      invitedById: Number(session.user.id),
      expiresAt,
      usedAt: null,
    },
    create: {
      email: normalizedEmail,
      token,
      invitedById: Number(session.user.id),
      expiresAt,
    },
  });

  const inviteUrl =
    `${process.env.NEXT_PUBLIC_APP_URL}/register?token=${token}`;

  console.log(inviteUrl);

  // send email comes here later on
}

// -------- VALIDATE INVITE TOKEN --------
export async function validateInviteToken(token: string) {
  const invite = await prisma.invite.findUnique({
    where: {
      token,
    },
  });

  if (!invite) { throw new Error("Ongeldige uitnodiging"); }
  if (invite.usedAt) { throw new Error("Uitnodiging is al gebruikt"); }
  if (invite.expiresAt < new Date()) { throw new Error("Uitnodiging verlopen"); }

  return {
    email: invite.email,
  };
}

// -------- COMPLETE REGISTRATION --------
export async function completeRegistration(token: string, username: string) {
const cleanUsername = username.trim(); // a little bit strict
 if (cleanUsername.length < 3) { throw new Error("Naam moet bestaan uit minstens drie letters"); }
 if (cleanUsername.length > 30) { throw new Error("Naam te lang"); }

const invite = await prisma.invite.findUnique({ where: { token } })

if (!invite) throw new Error('Ongeldige uitnodiging')
if (invite.usedAt) throw new Error('Uitnodiging is al gebruikt')
if (invite.expiresAt < new Date()) throw new Error('Uitnodiging verlopen')

  await prisma.$transaction([
    prisma.user.create({
      data: {
        email: invite.email,
        username: cleanUsername,
      },
    }),
    prisma.invite.update({
      where: { token },
      data: { usedAt: new Date() },
    }),
  ]);

  return { email: invite.email };
}