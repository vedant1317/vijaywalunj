import express from 'express';
import { getVideos, createVideo, updateVideo, deleteVideo } from '../controllers/videoController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getVideos);
router.post('/', protect, requireRole('admin', 'staff'), createVideo);
router.patch('/:id', protect, requireRole('admin', 'staff'), updateVideo);
router.delete('/:id', protect, requireRole('admin'), deleteVideo);

export default router;
