import express from 'express';
import { getFacilities, createFacility, updateFacility } from '../controllers/facilityController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getFacilities);
router.post('/', protect, requireRole('admin'), createFacility);
router.patch('/:id', protect, requireRole('admin'), updateFacility);

export default router;
