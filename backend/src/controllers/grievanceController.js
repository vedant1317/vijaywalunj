import { validationResult } from 'express-validator';
import Grievance from '../models/Grievance.js';
import generateReferenceId from '../utils/generateReferenceId.js';

export const submitGrievance = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { fullName, mobile, email, address, ward, category, subject, description } = req.body;
    const attachmentUrl = req.file ? `/uploads/${req.file.filename}` : null;

    let referenceId;
    let exists = true;
    while (exists) {
      referenceId = generateReferenceId();
      exists = await Grievance.findOne({ referenceId });
    }

    const grievance = await Grievance.create({
      referenceId,
      userId: req.user?._id || null,
      fullName, mobile, email, address, ward,
      category, subject, description, attachmentUrl,
    });

    res.status(201).json({
      message: 'Grievance submitted successfully.',
      referenceId: grievance.referenceId,
      status: grievance.status,
    });
  } catch (error) {
    next(error);
  }
};

export const trackGrievance = async (req, res, next) => {
  try {
    const { referenceId } = req.params;
    const grievance = await Grievance.findOne({ referenceId }).select('-__v');
    if (!grievance) return res.status(404).json({ message: 'Grievance not found.' });
    res.json(grievance);
  } catch (error) {
    next(error);
  }
};

export const getMyGrievances = async (req, res, next) => {
  try {
    const grievances = await Grievance.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select('referenceId category subject status priority createdAt updatedAt');
    res.json(grievances);
  } catch (error) {
    next(error);
  }
};

export const getAllGrievances = async (req, res, next) => {
  try {
    const { status, category, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    const total = await Grievance.countDocuments(filter);
    const grievances = await Grievance.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ total, page: Number(page), grievances });
  } catch (error) {
    next(error);
  }
};

export const updateGrievanceStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, priority, remarks, assignedTo } = req.body;

    const grievance = await Grievance.findByIdAndUpdate(
      id,
      { status, priority, remarks, assignedTo },
      { new: true, runValidators: true }
    );
    if (!grievance) return res.status(404).json({ message: 'Grievance not found.' });
    res.json({ message: 'Grievance updated.', grievance });
  } catch (error) {
    next(error);
  }
};
