import { Router } from 'express';
import {
  getAll,
  getOne,
  create,
  update,
  remove,
} from '../controllers/projectClassController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);

router.post('/', requireAuth, create);
router.put('/:id', requireAuth, update);
router.delete('/:id', requireAuth, remove);

export default router;
