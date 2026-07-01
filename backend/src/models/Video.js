import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  youtubeUrl: { type: String, required: true, trim: true },
  youtubeVideoId: { type: String, required: true, trim: true },
  thumbnailUrl: { type: String, default: null },
  description: { type: String, trim: true },
  sourcePublishedAt: { type: Date, default: null },
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);
