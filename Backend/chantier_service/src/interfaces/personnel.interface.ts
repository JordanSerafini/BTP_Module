import { HydratedDocument, Types } from 'mongoose';

export interface Personnel {
  _id: Types.ObjectId;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PersonnelDocument = HydratedDocument<Personnel>;
