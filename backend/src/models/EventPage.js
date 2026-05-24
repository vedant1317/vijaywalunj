import mongoose from 'mongoose';

const eventPageSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true, enum: ['vashi_premier_league', 'ganraj_vashicha'] },
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, trim: true },
  description: { type: String, required: true },
  images: [{ url: String, caption: String }],
  contentBlocks: [{
    heading: String,
    body: String,
    imageUrl: String,
  }],
  contactEmail: { type: String, trim: true },
  contactPhone: { type: String, trim: true },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('EventPage', eventPageSchema);
