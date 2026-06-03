import { prisma } from '../lib/prisma'

async function globalTeardown() {
  const id = Number(process.env.TEST_MUNICIPALITY_ID)
  if (id) await prisma.municipality.delete({ where: { id } })
  await prisma.$disconnect()
}

export default globalTeardown