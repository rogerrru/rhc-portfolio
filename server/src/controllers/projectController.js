import prisma from '../config/database.js';

export const getAll = async (req, res) => {
  const { classId, featured } = req.query;
  const where = {};
  if (classId) where.classId = parseInt(classId);
  if (featured === 'true') where.featured = true;

  const projects = await prisma.project.findMany({
    where,
    include: { class: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
  res.json(projects);
};

export const getOne = async (req, res) => {
  const project = await prisma.project.findUniqueOrThrow({
    where: { id: parseInt(req.params.id) },
    include: { class: true },
  });
  res.json(project);
};

export const create = async (req, res) => {
  const { title, description, imageUrl, techStack, link, githubRepo, classId, featured, order } = req.body;
  const project = await prisma.project.create({
    data: {
      title,
      description,
      imageUrl,
      techStack: techStack ?? [],
      link,
      githubRepo,
      classId: parseInt(classId),
      featured: featured ?? false,
      order: order ?? 0,
    },
    include: { class: true },
  });
  res.status(201).json(project);
};

export const update = async (req, res) => {
  const { title, description, imageUrl, techStack, link, githubRepo, classId, featured, order } = req.body;
  const project = await prisma.project.update({
    where: { id: parseInt(req.params.id) },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(imageUrl !== undefined && { imageUrl }),
      ...(techStack !== undefined && { techStack }),
      ...(link !== undefined && { link }),
      ...(githubRepo !== undefined && { githubRepo }),
      ...(classId !== undefined && { classId: parseInt(classId) }),
      ...(featured !== undefined && { featured }),
      ...(order !== undefined && { order }),
    },
    include: { class: true },
  });
  res.json(project);
};

export const remove = async (req, res) => {
  await prisma.project.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).send();
};
