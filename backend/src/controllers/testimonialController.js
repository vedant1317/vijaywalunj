import Testimonial from '../models/Testimonial.js';

export const getApprovedTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ status: 'approved' })
      .sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
};

export const submitTestimonial = async (req, res, next) => {
  try {
    const { name, area, message } = req.body;
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const testimonial = await Testimonial.create({ name, area, message, photoUrl });
    res.status(201).json({ message: 'Thank you! Your testimonial has been submitted for review.', testimonial });
  } catch (error) {
    next(error);
  }
};

export const getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
};

export const updateTestimonialStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const testimonial = await Testimonial.findByIdAndUpdate(id, { status }, { new: true });
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found.' });
    res.json({ message: 'Testimonial updated.', testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted.' });
  } catch (error) {
    next(error);
  }
};
