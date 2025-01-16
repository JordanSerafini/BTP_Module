import { HydratedDocument, Types } from 'mongoose';

export interface Outils {
  _id: Types.ObjectId;
  name: string;
  type: string;
  available: boolean;
  quantity: number;
  quantity_available: number;
}
export type OutilsDocument = HydratedDocument<Outils>;
