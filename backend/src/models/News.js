import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  summary: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  imageUrl: { type: String, default: null },
  sourceUrl: { type: String, default: null },
  category: { type: String, default: 'General' },
  isPublished: { type: Boolean, default: true },
  publishedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('News', newsSchema);
