import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  type: {
    type: String,
    required: true,
    enum: ['google_form', 'external_link', 'pdf_download', 'pdf_with_docs'],
  },
  redirectUrl: { type: String, default: null },
  pdfUrl: { type: String, default: null },
  prerequisiteDocuments: [{ type: String }],
  icon: { type: String, default: null },
  sortOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Facility', facilitySchema);
