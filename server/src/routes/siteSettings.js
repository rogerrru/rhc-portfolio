import { Router } from 'express';
import { getAll, upsert, remove } from '../controllers/siteSettingsController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', getAll);

router.put('/:key', requireAuth, upsert);
router.delete('/:key', requireAuth, remove);

export default router;
