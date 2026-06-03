"use server";

import crypto from "crypto";
import { Resend } from "resend";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isAllowedEmail } from '@/utils/emails'
import { requireAuth } from "../auth/auth-guard";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is missing");
}
const resend = new Resend(process.env.RESEND_API_KEY);

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
    `${process.env.APP_URL}/register?token=${token}`;
  console.log(inviteUrl); // TODO: REMOVE BEFORE PRODUCTION!!!!!!!!!!!!!!!!

  // const { data, error } = await resend.emails.send({
  //   from: "Let's GLOW Flevoland! <onboarding@resend.dev>",
  //   to: normalizedEmail,
  //   subject: "Je bent uitgenodigd als admin voor Let's GLOW Flevoland!",
  //   html: `
  //     <p>Je bent uitgenodigd om een admin account aan te maken.</p>
  //     <p>Klik op de link hieronder om je registratie te voltooien. Deze link is 48 uur geldig.</p>
  //     <a href="${inviteUrl}">Account aanmaken</a>
  //     <p>Als je deze uitnodiging niet verwacht hebt, kun je deze e-mail negeren.</p>
  //   `,
  // });
  // if (error) {
  //   console.error("Resend error:", error);
  //   throw new Error("Uitnodiging kon niet worden verzonden");
  // }
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

// -------- GET INVITES --------
export async function getInvites() {
  await requireAuth()

  return await prisma.invite.findMany({
  where: { invitedById: { not: null } },
  orderBy: { createdAt: 'desc' },
  include: {
    invitedBy: {
      select: { username: true },
    },
  },
})
}

// -------- CANCEL INVITE --------
export async function cancelInvite(id: number) {
  await requireAuth()

  await prisma.invite.delete({ where: { id } })
}