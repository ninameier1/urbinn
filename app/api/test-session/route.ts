import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {

  if (process.env.ENABLE_TEST_ROUTES !== 'true') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { email } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24)

  const session = await prisma.session.create({
    data: {
      sessionToken: crypto.randomUUID(),
      userId: user.id,
      expires,
    },
  })

  return NextResponse.json({
    sessionToken: session.sessionToken,
    expires: session.expires,
  })
}