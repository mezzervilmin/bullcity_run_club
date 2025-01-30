import { PrismaClient } from "@prisma/client";
import fs from "node:fs";

const prisma = new PrismaClient();
async function main() {
  const data = fs.readFileSync("./prisma/Participants.sql", "utf8");
  data.split("\n").forEach(async (line) => {
    let elements = line.slice(1, -2).split(", ");
    elements = elements.map((e) => e.replace(/'/g, ""));
    const firstName = elements[1].split(" ")[0];
    const lastName = elements[1].split(" ").slice(1).join(" ");
    try {
      await prisma.user.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: elements[2],
          shirtSize: elements[3],
          visits: parseInt(elements[5]),
          code: parseInt(elements[4]),
        },
      });
    } catch {
      console.log(`email is ${elements[2]}`);
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
