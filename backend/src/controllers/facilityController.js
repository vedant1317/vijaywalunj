import Facility from '../models/Facility.js';

export const getFacilities = async (req, res, next) => {
  try {
    const facilities = await Facility.find({ isActive: true }).sort({ sortOrder: 1 });
    res.json(facilities);
  } catch (error) {
    next(error);
  }
};

export const createFacility = async (req, res, next) => {
  try {
    const facility = await Facility.create(req.body);
    res.status(201).json(facility);
  } catch (error) {
    next(error);
  }
};

export const updateFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!facility) return res.status(404).json({ message: 'Facility not found.' });
    res.json(facility);
  } catch (error) {
    next(error);
  }
};
