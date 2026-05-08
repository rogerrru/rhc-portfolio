import { Router } from 'express';
import authRoutes from './auth.js';
import projectRoutes from './projects.js';
import projectClassRoutes from './projectClasses.js';
import publicationRoutes from './publications.js';
import certificationRoutes from './certifications.js';
import contactRoutes from './contact.js';
import siteSettingsRoutes from './siteSettings.js';
import uploadRoutes from './upload.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/project-classes', projectClassRoutes);
router.use('/publications', publicationRoutes);
router.use('/certifications', certificationRoutes);
router.use('/contact', contactRoutes);
router.use('/site-settings', siteSettingsRoutes);
router.use('/upload', uploadRoutes);

export default router;
