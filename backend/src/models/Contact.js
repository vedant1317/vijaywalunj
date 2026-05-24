import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Hospital', 'Police', 'Traffic Police', 'Emergency Helpline', 'Disaster Management', 'NMMC', 'Other'],
  },
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, default: null },
  address: { type: String, trim: true, default: null },
  notes: { type: String, trim: true, default: null },
  isEmergency: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);
