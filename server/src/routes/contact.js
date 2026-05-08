import { Router } from 'express';
import { get, upsert } from '../controllers/contactController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', get);
router.put('/', requireAuth, upsert);

export default router;
