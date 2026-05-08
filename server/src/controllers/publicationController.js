import prisma from '../config/database.js';

export const getAll = async (_req, res) => {
  const publications = await prisma.publication.findMany({
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
  });
  res.json(publications);
};

export const getOne = async (req, res) => {
  const pub = await prisma.publication.findUniqueOrThrow({
    where: { id: parseInt(req.params.id) },
  });
  res.json(pub);
};

const parseArr = (val) =>
  Array.isArray(val) ? val : (val ?? '').split(',').map((s) => s.trim()).filter(Boolean);

export const create = async (req, res) => {
  const {
    title, summary, about, whatWeDid, takeaways, highlights, skills,
    team, duration, coAuthors, link, imageUrl, publishedAt,
  } = req.body;

  const pub = await prisma.publication.create({
    data: {
      title, summary,
      about: about ?? null,
      whatWeDid: whatWeDid ?? null,
      takeaways: parseArr(takeaways),
      highlights: parseArr(highlights),
      skills: parseArr(skills),
      team: team ?? null,
      duration: duration ?? null,
      coAuthors: parseArr(coAuthors),
      link: link ?? null,
      imageUrl: imageUrl ?? null,
      publishedAt: publishedAt ? new Date(publishedAt) : null,
    },
  });
  res.status(201).json(pub);
};

export const update = async (req, res) => {
  const {
    title, summary, about, whatWeDid, takeaways, highlights, skills,
    team, duration, coAuthors, link, imageUrl, publishedAt,
  } = req.body;

  const pub = await prisma.publication.update({
    where: { id: parseInt(req.params.id) },
    data: {
      ...(title !== undefined && { title }),
      ...(summary !== undefined && { summary }),
      ...(about !== undefined && { about }),
      ...(whatWeDid !== undefined && { whatWeDid }),
      ...(takeaways !== undefined && { takeaways: parseArr(takeaways) }),
      ...(highlights !== undefined && { highlights: parseArr(highlights) }),
      ...(skills !== undefined && { skills: parseArr(skills) }),
      ...(team !== undefined && { team }),
      ...(duration !== undefined && { duration }),
      ...(coAuthors !== undefined && { coAuthors: parseArr(coAuthors) }),
      ...(link !== undefined && { link }),
      ...(imageUrl !== undefined && { imageUrl }),
      ...(publishedAt !== undefined && { publishedAt: publishedAt ? new Date(publishedAt) : null }),
    },
  });
  res.json(pub);
};

export const remove = async (req, res) => {
  await prisma.publication.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).send();
};
