import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // ─── Admin ────────────────────────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@rhcportfolio.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe@2025';
  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, password: await bcrypt.hash(adminPassword, 12) },
  });
  console.log(`  Admin created: ${adminEmail}`);

  // ─── Site Settings ─────────────────────────────────────────────────────────
  const settings = [
    { key: 'home_hero_title', value: 'ASPIRING COMPUTER SCIENCE PROFESSIONAL' },
    {
      key: 'home_hero_description',
      value:
        "Hi there, I'm Roger Chegyem, a Computer Science enthusiast with a solid foundation in academic learning and hands-on experience from projects and commissions. I'm passionate about learning new things, building solutions, and growing both personally and professionally. Take a look around, and feel free to reach out — I'd love to collaborate!",
    },
    {
      key: 'home_projects_description',
      value:
        'For me, technology is about turning ideas into practical solutions. With each project, I aim to build tools that are functional, intuitive, and impactful — driven by curiosity, collaboration, and continuous learning.',
    },
    {
      key: 'resume_intro',
      value:
        "My name's Roger Jr. H. Chegyem. I'm a Computer Science professional from Baguio City with experience in web development, data science, and machine learning. Glad you're here. Feel free to look through my projects and work — always open to learning, building, and collaborating. Cheers!",
    },
    { key: 'resume_url', value: '' },
    { key: 'meta_description', value: 'Roger Jr. H. Chegyem — Full-Stack Developer, Data Analyst, and Machine Learning Engineer based in Baguio City, Philippines.' },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({ where: { key: s.key }, update: {}, create: s });
  }
  console.log('  Site settings seeded');

  // ─── Project Classes ───────────────────────────────────────────────────────
  const software = await prisma.projectClass.upsert({
    where: { slug: 'software' },
    update: {},
    create: { name: 'Software', slug: 'software', order: 1 },
  });
  const website = await prisma.projectClass.upsert({
    where: { slug: 'website' },
    update: {},
    create: { name: 'Website', slug: 'website', order: 2 },
  });
  const mlAi = await prisma.projectClass.upsert({
    where: { slug: 'ml-ai' },
    update: {},
    create: { name: 'Machine Learning / AI', slug: 'ml-ai', order: 3 },
  });
  console.log('  Project classes seeded');

  // ─── Projects ──────────────────────────────────────────────────────────────
  const projects = [
    {
      title: 'Scan&Scrub',
      description:
        'Encyclopedia website for Operating Room procedures and instruments. Co-developed with a team.',
      techStack: ['ReactJS', 'Tailwind CSS'],
      classId: website.id,
      featured: true,
      order: 1,
    },
    {
      title: 'PSC 2023: [Ice-AI]',
      description:
        'Concept for a Generative AI Plugin for IDEs. Conceptual Framework for the plugin. Conceptualized with a team.',
      techStack: ['Generative AI', 'IDE Plugin Concept'],
      classId: mlAi.id,
      featured: true,
      order: 1,
    },
    {
      title: 'WORDY Game Project',
      description: 'A word puzzle software. Co-developed with a team.',
      techStack: ['Java', 'Python'],
      classId: software.id,
      featured: true,
      order: 1,
    },
    {
      title: 'Events Management System Website',
      description:
        'Website for event management. Co-developed with a team.',
      techStack: ['NodeJS', 'PugJS', 'PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
      classId: website.id,
      featured: false,
      order: 2,
    },
    {
      title: 'Esports Service Website',
      description:
        'Website for latest articles, rankings, and information in competitive gaming. Co-developed with a team.',
      techStack: ['HTML', 'CSS', 'JavaScript', 'Web Service APIs'],
      classId: website.id,
      featured: false,
      order: 3,
    },
  ];

  for (const p of projects) {
    const existing = await prisma.project.findFirst({ where: { title: p.title } });
    if (!existing) await prisma.project.create({ data: p });
  }
  console.log('  Projects seeded');

  // ─── Publications ──────────────────────────────────────────────────────────
  const publications = [
    {
      title:
        'Dengue Prevention and Control: A Systematic Review of Contributing Factors, Gaps in Practices, and Strategies for Effective Management and Intervention',
      summary:
        'A comprehensive review of related literature examining current dengue prevention and control practices, identifying gaps in existing interventions, and proposing technology-driven strategies for effective management.',
      coAuthors: ['Roger Jr. H. Chegyem'],
    },
    {
      title:
        'Developing a Machine Learning-Based Forecasting Model and Visualization Tool for Dengue Risk in Baguio City',
      summary:
        'A machine learning–based forecasting model to predict dengue risk in Baguio City, integrating time-series epidemiological and environmental data. Includes an interactive visualization tool presenting risk levels, trends, and insights for public health monitoring and decision-making.',
      coAuthors: ['Roger Jr. H. Chegyem'],
    },
  ];

  for (const pub of publications) {
    const existing = await prisma.publication.findFirst({ where: { title: pub.title } });
    if (!existing) await prisma.publication.create({ data: pub });
  }
  console.log('  Publications seeded');

  // ─── Certifications ────────────────────────────────────────────────────────
  const certs = [
    { name: 'NLP Capacity Training', organization: 'CHED', issuedAt: new Date('2023-01-01') },
    { name: 'Cyber Defense Society', organization: 'TrendMicro', issuedAt: new Date('2023-06-01') },
    { name: 'Community Service Recognition', organization: 'DILG', issuedAt: new Date('2023-01-01') },
  ];

  for (const c of certs) {
    const existing = await prisma.certification.findFirst({
      where: { name: c.name, organization: c.organization },
    });
    if (!existing) await prisma.certification.create({ data: c });
  }
  console.log('  Certifications seeded');

  // ─── Contact ───────────────────────────────────────────────────────────────
  const existingContact = await prisma.contactDetail.findFirst();
  if (!existingContact) {
    await prisma.contactDetail.create({
      data: {
        email: 'rhchegyem@gmail.com',
        phone: '(+63) 976 185 3106',
        linkedin: 'https://www.linkedin.com/in/roger-chegyem-4737a6369/',
        github: 'https://github.com/rogerrru',
        location: 'Baguio City, Philippines',
      },
    });
  }
  console.log('  Contact details seeded');

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
