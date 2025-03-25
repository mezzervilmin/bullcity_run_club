import { PrismaClient } from "@prisma/client";
import { migrationData } from "./Participants";

const prisma = new PrismaClient();
async function main() {
  migrationData.data.forEach(async (user) => {
    try {
      await prisma.user.update({
        where: {
          code: user.code,
        },
        data: {
          visits: {
            increment: 1,
          },
        },
      });
    } catch {
      console.log(`email is ${user.email} and code is ${user.code}`);
    }
  });
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
