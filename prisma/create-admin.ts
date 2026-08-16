import "dotenv/config";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { hashPassword } from "@/lib/auth";

const prisma = new PrismaClient();

function parseArgs() {
  const args = process.argv.slice(2);
  const flag = (name: string) =>
    args.includes(name) ? args[args.indexOf(name) + 1] : undefined;

  const email = flag("--email");
  const password = flag("--password");

  const positional = args.filter((arg) => !arg.startsWith("--"));

  return {
    email: email ?? positional[0],
    password: password ?? positional[1],
  };
}

async function main() {
  const { email, password } = parseArgs();

  if (!email || !password) {
    console.error(
      "Usage: npm run db:create-admin -- --email admin@example.com --password secret",
    );
    process.exit(1);
  }

  const normalized = email.toLowerCase().trim();
  const user = await prisma.adminUser.upsert({
    where: { email: normalized },
    create: { email: normalized, passwordHash: hashPassword(password) },
    update: { passwordHash: hashPassword(password) },
  });

  console.log(`Admin user "${user.email}" ready.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });