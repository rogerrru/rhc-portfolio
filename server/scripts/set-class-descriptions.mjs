import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

// Edit this map to change the short blurb shown under each Portfolio section heading.
const DESCRIPTIONS = {
  software: 'End-to-end applications and tools I\'ve designed, built, and shipped.',
  website: 'Web platforms and interfaces built for real users.',
  publications: 'Research papers and studies I\'ve co-authored or contributed to.',
};

// Supabase's transaction pooler needs this flag or raw/DDL-adjacent queries
// intermittently fail with "prepared statement already exists".
const url = new URL(process.env.DATABASE_URL ?? '');
url.searchParams.set('pgbouncer', 'true');

const prisma = new PrismaClient({ datasources: { db: { url: url.toString() } } });

for (const [slug, description] of Object.entries(DESCRIPTIONS)) {
  const result = await prisma.projectClass.updateMany({
    where: { slug },
    data: { description },
  });
  console.log(`${slug}: ${result.count ? 'updated' : 'no matching class found'}`);
}

await prisma.$disconnect();
