import express from 'express';
import { getNews, getNewsById, createNews, updateNews, deleteNews } from '../controllers/newsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getNews);
router.get('/:slug', getNewsById);
router.post('/', protect, requireRole('admin', 'staff'), createNews);
router.patch('/:id', protect, requireRole('admin', 'staff'), updateNews);
router.delete('/:id', protect, requireRole('admin'), deleteNews);

export default router;
