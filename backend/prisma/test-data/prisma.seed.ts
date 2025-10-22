import { subDivisionSql, JobResultSQL, assessmentSql, elrSql } from "./seed";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // SubDivision SQL
  // console.log(subDivisionSql);

  await prisma.$executeRawUnsafe(subDivisionSql);

  // JobSummary SQL
  // console.log(JobResultSQL);
  await prisma.$executeRawUnsafe(JobResultSQL);

  // Assessment SQL
  await prisma.$executeRawUnsafe(assessmentSql);

  // AssessmentELR SQL
  await prisma.$executeRawUnsafe(elrSql);

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
