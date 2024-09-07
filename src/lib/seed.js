const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config({ path: ".env.local" });

const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
async function main() {
  const categories = await Promise.all(
    Array.from({ length: 5 }, () =>
      db.category.create({
        data: {
          name: faker.commerce.department(),
        },
      }),
    ),
  );

  const users = await Promise.all(
    Array.from({ length: 10 }, () =>
      db.user.create({
        data: {
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: faker.helpers.arrayElement(["user", "admin"]),
        },
      }),
    ),
  );

  const quotes = await Promise.all(
    Array.from({ length: 10 }, () =>
      db.qoute.create({
        data: {
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraph(),
          author: faker.name.fullName(),
          userId: faker.helpers.arrayElement(users).id,
        },
      }),
    ),
  );

  await Promise.all(
    Array.from({ length: 20 }, () =>
      db.comment.create({
        data: {
          message: faker.lorem.sentence(),
          userId: faker.helpers.arrayElement(users).id,
          qouteId: faker.helpers.arrayElement(quotes).id,
        },
      }),
    ),
  );

  await Promise.all(
    quotes.map((qoute) =>
      db.qoute_Category.createMany({
        data: categories.map((category) => ({
          qouteId: qoute.id,
          categoryId: category.id,
        })),
      }),
    ),
  );

  console.log("Data seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
