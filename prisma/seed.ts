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
        text: faker.lorem.sentence(),
      })
    ),
    factors: [
      ...Array.from(
        { length: faker.number.int({ min: 1, max: 4 }) },
        () => ({
          text: faker.lorem.sentence(),
          type: "plus" as const,
        })
      ),
      ...Array.from(
        { length: faker.number.int({ min: 1, max: 4 }) },
        () => ({
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
  elements: { title: string; mechanisms: any[]; factors: any[] }[],
  fake = false
) {
  for (const el of elements) {
    await prisma.coreElement.create({
      data: {
        municipality_id: municipalityId,
        title: el.title,
        slug: fake ? `${slugify(el.title)}-${municipalityId}` : slugify(el.title),
        created_by: adminId,
        mechanisms: {
          create: el.mechanisms.map((m) => ({
            text: m.text,
            created_by: adminId,
          })),
        },
        factors: {
          create: el.factors.map((f) => ({
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

  await prisma.$transaction(async (tx) => {
    await tx.publication.deleteMany()
    await tx.factor.deleteMany()
    await tx.mechanism.deleteMany()
    await tx.coreElement.deleteMany()
    await tx.municipality.deleteMany()
  })

  await prisma.invite.upsert({
    where: { email: 's1081087@student.windesheim.nl' },
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
    { name: "Almere",    image: "/assets/images/almere.jpg",   real: false },
    { name: "Zwolle",   image: "/assets/images/zwolle.jpg",   real: true  },
    { name: "Lelystad", image: "/assets/images/lelystad.jpg", real: false },
    { name: "Dronten",  image: "/assets/images/dronten.jpg",  real: false },
    { name: "Zeewolde", image: "/assets/images/zeewolde.jpg", real: false },
  ];

  for (const data of municipalityData) {
    const municipality = await prisma.municipality.create({
      data: {
        name: data.name,
        image: data.image,
        description: faker.lorem.paragraph(),
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

      await seedCoreElements(municipality.id, admin.id, fakeElements, true);
    }
  }

  const municipalities = await prisma.municipality.findMany();

  const globalPublications = Array.from({ length: 3 }, () => ({
    title: faker.lorem.sentence({ min: 4, max: 8 }),
    author: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
      faker.person.fullName()
    ).join(", "),
    description: faker.lorem.paragraph(),
    url: faker.internet.url(),
    published_at: faker.date.past(),
    created_by: admin.id,
  }));

  const linkedPublications = municipalities.map((m) => ({
    title: faker.lorem.sentence({ min: 4, max: 8 }),
    author: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
      faker.person.fullName()
    ).join(", "),
    description: faker.lorem.paragraph(),
    url: faker.internet.url(),
    published_at: faker.date.past(),
    created_by: admin.id,
    municipality_id: m.id,
  }));

  const partnerData = [
  { name: "Windesheim", logo: "/assets/images/windesheim.png", website: "https://www.windesheim.nl/" },
  { name: "Vrije Universiteit Amsterdam", logo: "/assets/images/vu.png", website: "https://vu.nl" },
  { name: "ROC Flevoland", logo: "/assets/images/roc.png", website: "https://www.rocvanflevoland.nl/" },
  { name: "Flever", logo: "/assets/images/flever.png.png", website: "https://flever.nl/" },
];

const images = [
  "/assets/images/lectoraat.jpg",
  "/assets/images/lectoraat2.jpg",
  "/assets/images/lectoraat3.jpg",
];

for (const data of partnerData) {
  await prisma.partner.create({
    data: {
      name: data.name,
      logo: data.logo,
      website: data.website, 
      description: faker.lorem.paragraph(),
      researchRole: faker.lorem.paragraph(),
      partnerInfo: faker.lorem.paragraph(),
      image1: images[0],
      image2: images[1],
      image3: images[2],
      created_by: admin.id,
    },
  });
}

  await prisma.publication.createMany({
    data: [...globalPublications, ...linkedPublications],
  });

  console.log("Database seeded successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });