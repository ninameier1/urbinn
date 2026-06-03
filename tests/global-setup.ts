import 'dotenv/config'
import { prisma } from '../lib/prisma'

async function globalSetup() {
  const municipality = await prisma.municipality.create({
    data: {
      name: 'Testgemeente',
      created_by: 2,
      core_elements: {
        create: {
          title: 'Veiligheid',
          slug: 'veiligheid-test',
          created_by: 2,
        }
      }
    }
  })
  process.env.TEST_MUNICIPALITY_ID = String(municipality.id)
  await prisma.$disconnect()
}

export default globalSetup