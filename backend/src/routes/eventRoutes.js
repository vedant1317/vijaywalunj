import express from 'express';
import { getEventPage, upsertEventPage } from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/:type', getEventPage);
router.put('/:type', protect, requireRole('admin'), upsertEventPage);

export default router;
