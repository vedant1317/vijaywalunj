import mongoose from 'mongoose';

const grievanceSchema = new mongoose.Schema({
  referenceId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  fullName: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  address: { type: String, trim: true },
  ward: { type: String, trim: true },
  category: {
    type: String,
    required: true,
    enum: ['Road', 'Water Supply', 'Electricity', 'Garbage/Sanitation', 'Street Light', 'Drainage', 'Tree Cutting', 'Encroachment', 'Other'],
  },
  subject: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  attachmentUrl: { type: String, default: null },
  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'In Progress', 'Resolved', 'Closed'],
    default: 'Submitted',
  },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  assignedTo: { type: String, default: null },
  remarks: { type: String, default: null },
}, { timestamps: true });

export default mongoose.model('Grievance', grievanceSchema);
