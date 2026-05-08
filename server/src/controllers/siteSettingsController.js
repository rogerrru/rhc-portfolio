import prisma from '../config/database.js';

export const getAll = async (_req, res) => {
  const settings = await prisma.siteSetting.findMany({ orderBy: { key: 'asc' } });
  // Return as a key→value map for easy client consumption
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  res.json(map);
};

export const upsert = async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  if (value === undefined) return res.status(400).json({ error: 'value is required' });

  const setting = await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  res.json(setting);
};

export const remove = async (req, res) => {
  await prisma.siteSetting.delete({ where: { key: req.params.key } });
  res.status(204).send();
};
