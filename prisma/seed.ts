import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.role.createMany({
    data: [
      {
        id: 1,
        name: "admin",
      },
      {
        id: 2,
        name: "user",
      },
    ],
  });

  const user = await prisma.user.createMany({
    data: [
      {
        id: 1,
        name: "admin",
        email: "admin@gmail.com",
        password:
          "$argon2id$v=19$m=65536,t=2,p=1$gbeDqrnOu39J7WmVAe+jC4/6y6wHu81SOPELbwxaJ7M$Wznj+VARyCqJzz5HGNe9djenbP9DPN/4c1tK2412nSo",
      },
    ],
  });

  const userRole = await prisma.user_role.createMany({
    data: [
      {
        id: 1,
        user_id: 1,
        role_id: 1,
      },
    ],
  });

  console.log(roles, user, userRole);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
