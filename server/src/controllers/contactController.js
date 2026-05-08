import prisma from '../config/database.js';

export const get = async (_req, res) => {
  // Always return the first (and only) contact record
  const contact = await prisma.contactDetail.findFirst();
  res.json(contact ?? {});
};

export const upsert = async (req, res) => {
  const { email, linkedin, github, phone, location } = req.body;
  const existing = await prisma.contactDetail.findFirst();

  const data = {
    ...(email !== undefined && { email }),
    ...(linkedin !== undefined && { linkedin }),
    ...(github !== undefined && { github }),
    ...(phone !== undefined && { phone }),
    ...(location !== undefined && { location }),
  };

  const contact = existing
    ? await prisma.contactDetail.update({ where: { id: existing.id }, data })
    : await prisma.contactDetail.create({ data });

  res.json(contact);
};
