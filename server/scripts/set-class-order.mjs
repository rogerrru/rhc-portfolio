import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

// Edit this map to change the order of the sections on the Portfolio page (lowest first).
// The same order can also be changed with the arrows in Admin → Projects → Project Classes.
const ORDER = {
  website: 1,
  software: 2,
  publications: 3,
};

// Supabase's transaction pooler needs this flag or raw/DDL-adjacent queries
// intermittently fail with "prepared statement already exists".
const url = new URL(process.env.DATABASE_URL ?? '');
url.searchParams.set('pgbouncer', 'true');

const prisma = new PrismaClient({ datasources: { db: { url: url.toString() } } });

for (const [slug, order] of Object.entries(ORDER)) {
  const result = await prisma.projectClass.updateMany({
    where: { slug },
    data: { order },
  });
  console.log(`${slug}: ${result.count ? `order set to ${order}` : 'no matching class found'}`);
}

await prisma.$disconnect();
