import prisma from '../config/database.js';

export const getAll = async (_req, res) => {
  const classes = await prisma.projectClass.findMany({
    include: { projects: { orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] } },
    orderBy: { order: 'asc' },
  });
  res.json(classes);
};

export const getOne = async (req, res) => {
  const cls = await prisma.projectClass.findUniqueOrThrow({
    where: { id: parseInt(req.params.id) },
    include: {
      projects: { orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] },
    },
  });
  res.json(cls);
};

export const create = async (req, res) => {
  const { name, slug, order } = req.body;
  const cls = await prisma.projectClass.create({
    data: { name, slug, order: order ?? 0 },
  });
  res.status(201).json(cls);
};

export const update = async (req, res) => {
  const { name, slug, order } = req.body;
  const cls = await prisma.projectClass.update({
    where: { id: parseInt(req.params.id) },
    data: {
      ...(name !== undefined && { name }),
      ...(slug !== undefined && { slug }),
      ...(order !== undefined && { order }),
    },
  });
  res.json(cls);
};

export const remove = async (req, res) => {
  await prisma.projectClass.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).send();
};
