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

export const create = async (req, res) => {
  const { title, summary, coAuthors, link, imageUrl, publishedAt } = req.body;
  const pub = await prisma.publication.create({
    data: {
      title,
      summary,
      coAuthors: coAuthors ?? [],
      link,
      imageUrl,
      publishedAt: publishedAt ? new Date(publishedAt) : null,
    },
  });
  res.status(201).json(pub);
};

export const update = async (req, res) => {
  const { title, summary, coAuthors, link, imageUrl, publishedAt } = req.body;
  const pub = await prisma.publication.update({
    where: { id: parseInt(req.params.id) },
    data: {
      ...(title !== undefined && { title }),
      ...(summary !== undefined && { summary }),
      ...(coAuthors !== undefined && { coAuthors }),
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
