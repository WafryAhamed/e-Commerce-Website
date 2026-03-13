import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  role: 'user' | 'admin';
  avatar?: string;
  status: 'active' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: { type: String, default: '' },
    status: { type: String, enum: ['active', 'blocked'], default: 'active' },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);