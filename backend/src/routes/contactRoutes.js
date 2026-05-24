import express from 'express';
import { getContacts, createContact, updateContact, deleteContact } from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getContacts);
router.post('/', protect, requireRole('admin'), createContact);
router.patch('/:id', protect, requireRole('admin'), updateContact);
router.delete('/:id', protect, requireRole('admin'), deleteContact);

export default router;
