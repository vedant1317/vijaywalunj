import express from 'express';
import { body } from 'express-validator';
import {
  submitGrievance, trackGrievance, getMyGrievances,
  getAllGrievances, updateGrievanceStatus,
} from '../controllers/grievanceController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

const grievanceValidation = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('mobile').notEmpty().withMessage('Mobile number is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('description').isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
];

router.post('/', optionalAuth, upload.single('attachment'), grievanceValidation, submitGrievance);
router.get('/track/:referenceId', trackGrievance);
router.get('/my', protect, getMyGrievances);
router.get('/', protect, requireRole('admin', 'staff'), getAllGrievances);
router.patch('/:id/status', protect, requireRole('admin', 'staff'), updateGrievanceStatus);

export default router;
