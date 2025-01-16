import { HydratedDocument, Types } from 'mongoose';

export interface Personel {
  _id: Types.ObjectId;
  name: string;
  role: string;
  active: boolean;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PersonelDocument = HydratedDocument<Personel>;