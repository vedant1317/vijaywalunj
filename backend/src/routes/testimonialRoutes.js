import express from 'express';
import {
  getApprovedTestimonials, submitTestimonial,
  getAllTestimonials, updateTestimonialStatus, deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getApprovedTestimonials);
router.post('/', upload.single('photo'), submitTestimonial);
router.get('/all', protect, requireRole('admin', 'staff'), getAllTestimonials);
router.patch('/:id', protect, requireRole('admin', 'staff'), updateTestimonialStatus);
router.delete('/:id', protect, requireRole('admin'), deleteTestimonial);

export default router;
