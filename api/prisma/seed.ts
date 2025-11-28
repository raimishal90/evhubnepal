 // command to run seed: npx prisma db seed
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Seed Roles
  const roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' },
    { id: 3, name: 'vendor' },
    { id: 4, name: 'moderator' },
  ];

  for (const role of roles) {
    const existingRole = await prisma.role.findUnique({
      where: { id: role.id },
    });

    if (!existingRole) {
      await prisma.role.create({
        data: role,
      });
      console.log(`✅ Created role: ${role.name}`);
    } else {
      console.log(`⏭️  Role already exists: ${role.name}`);
    }
  }

  console.log('✨ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

