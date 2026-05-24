import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  area: { type: String, trim: true },
  message: { type: String, required: true, trim: true },
  photoUrl: { type: String, default: null },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
