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

const parseArr = (val) =>
  Array.isArray(val) ? val : (val ?? '').split(',').map((s) => s.trim()).filter(Boolean);

export const create = async (req, res) => {
  const {
    title, description, about, whatWeDid, takeaways, highlights, skills,
    team, duration, imageUrl, screenshots, techStack, link, githubRepo, classId, featured, order,
  } = req.body;

  const project = await prisma.project.create({
    data: {
      title, description,
      about: about ?? null,
      whatWeDid: whatWeDid ?? null,
      takeaways: parseArr(takeaways),
      highlights: parseArr(highlights),
      skills: parseArr(skills),
      team: team ?? null,
      duration: duration ?? null,
      imageUrl: imageUrl ?? null,
      screenshots: parseArr(screenshots),
      techStack: parseArr(techStack),
      link: link ?? null,
      githubRepo: githubRepo ?? null,
      classId: parseInt(classId),
      featured: featured ?? false,
      order: order ?? 0,
    },
    include: { class: true },
  });
  res.status(201).json(project);
};

export const update = async (req, res) => {
  const {
    title, description, about, whatWeDid, takeaways, highlights, skills,
    team, duration, imageUrl, screenshots, techStack, link, githubRepo, classId, featured, order,
  } = req.body;

  const project = await prisma.project.update({
    where: { id: parseInt(req.params.id) },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(about !== undefined && { about }),
      ...(whatWeDid !== undefined && { whatWeDid }),
      ...(takeaways !== undefined && { takeaways: parseArr(takeaways) }),
      ...(highlights !== undefined && { highlights: parseArr(highlights) }),
      ...(skills !== undefined && { skills: parseArr(skills) }),
      ...(team !== undefined && { team }),
      ...(duration !== undefined && { duration }),
      ...(imageUrl !== undefined && { imageUrl }),
      ...(screenshots !== undefined && { screenshots: parseArr(screenshots) }),
      ...(techStack !== undefined && { techStack: parseArr(techStack) }),
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
