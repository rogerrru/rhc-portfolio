import prisma from '../config/database.js';

export const getAll = async (_req, res) => {
  const certs = await prisma.certification.findMany({
    orderBy: { issuedAt: 'desc' },
  });
  res.json(certs);
};

export const getOne = async (req, res) => {
  const cert = await prisma.certification.findUniqueOrThrow({
    where: { id: parseInt(req.params.id) },
  });
  res.json(cert);
};

export const create = async (req, res) => {
  const { name, organization, issuedAt, badgeUrl, credentialUrl } = req.body;
  const cert = await prisma.certification.create({
    data: {
      name,
      organization,
      issuedAt: new Date(issuedAt),
      badgeUrl,
      credentialUrl,
    },
  });
  res.status(201).json(cert);
};

export const update = async (req, res) => {
  const { name, organization, issuedAt, badgeUrl, credentialUrl } = req.body;
  const cert = await prisma.certification.update({
    where: { id: parseInt(req.params.id) },
    data: {
      ...(name !== undefined && { name }),
      ...(organization !== undefined && { organization }),
      ...(issuedAt !== undefined && { issuedAt: new Date(issuedAt) }),
      ...(badgeUrl !== undefined && { badgeUrl }),
      ...(credentialUrl !== undefined && { credentialUrl }),
    },
  });
  res.json(cert);
};

export const remove = async (req, res) => {
  await prisma.certification.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).send();
};
