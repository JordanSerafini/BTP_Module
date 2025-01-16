import { HydratedDocument, Types } from 'mongoose';

export interface Fourniture {
  _id: Types.ObjectId;
  name: string;
  description: string;
  unit: string;
  quantity: number;
  total_price: number;
}
export type MessageDocument = HydratedDocument<Fourniture>;
