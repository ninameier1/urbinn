import "dotenv/config";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";
import { faker } from "@faker-js/faker/locale/nl";
import { slugify } from "@utils/helpers";

import crypto from 'crypto'
import realData from "../data/data.json";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

function generateFakeCoreElement() {
  return {
    title: faker.lorem.sentence({ min: 3, max: 7 }),
    mechanisms: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () => ({
        label: faker.lorem.word(),
        text: faker.lorem.sentence(),
      })
    ),
    factors: [
      ...Array.from(
        { length: faker.number.int({ min: 1, max: 4 }) },
        () => ({
          label: faker.lorem.word(),
          text: faker.lorem.sentence(),
          type: "plus" as const,
        })
      ),
      ...Array.from(
        { length: faker.number.int({ min: 1, max: 4 }) },
        () => ({
          label: faker.lorem.word(),
          text: faker.lorem.sentence(),
          type: "min" as const,
        })
      ),
    ],
  };
}

async function seedCoreElements(
  municipalityId: number,
  adminId: number,
  elements: { title: string; mechanisms: any[]; factors: any[] }[]
) {
  for (const el of elements) {
    await prisma.coreElement.create({
      data: {
        municipality_id: municipalityId,
        title: el.title,

        slug: `${slugify(el.title)}-${municipalityId}`,

        created_by: adminId,
        mechanisms: {
          create: el.mechanisms.map((m) => ({
            label: m.label,
            text: m.text,
            created_by: adminId,
          })),
        },
        factors: {
          create: el.factors.map((f) => ({
            label: f.label,
            text: f.text,
            type: f.type,
            created_by: adminId,
          })),
        },
      },
    });
  }
}

async function main() {
  const adminEmail = "s1081087@student.windesheim.nl";

  // clean DB, safe for real this time
  await prisma.$transaction(async (tx) => {
    await tx.factor.deleteMany()
    await tx.mechanism.deleteMany()
    await tx.coreElement.deleteMany()
    await tx.municipality.deleteMany()
  })

await prisma.invite.upsert({
  where: {
    email: 's1081087@student.windesheim.nl',
  },
    update: {
    token: crypto.randomBytes(32).toString('hex'),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
  },
  create: {
    email: 's1081087@student.windesheim.nl',
    token: crypto.randomBytes(32).toString('hex'),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
  },
})

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      username: "admin",
      email: adminEmail,
    },
  });

  const municipalityData = [
    { name: "Almere", image: "/assets/images/almere.jpg", real: false },
    { name: "Zwolle", image: "/assets/images/zwolle.jpg", real: true },
    { name: "Lelystad", image: "/assets/images/lelystad.jpg", real: false },
    { name: "Dronten", image: "/assets/images/dronten.jpg", real: false },
    { name: "Zeewolde", image: "/assets/images/zeewolde.jpg", real: false },
  ];

  for (const data of municipalityData) {
    const municipality = await prisma.municipality.create({
      data: {
        name: data.name,
        image: data.image,
        created_by: admin.id,
      },
    });

    if (data.real) {
      const realElements = Object.values(realData).map((el: any) => ({
        title: el.title,
        mechanisms: el.mechanisms,
        factors: el.factors,
      }));

      await seedCoreElements(municipality.id, admin.id, realElements);
    } else {
      const fakeElements = Array.from(
        { length: faker.number.int({ min: 4, max: 7 }) },
        generateFakeCoreElement
      );

      await seedCoreElements(municipality.id, admin.id, fakeElements);
    }
  }

  console.log("Database seeded successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });