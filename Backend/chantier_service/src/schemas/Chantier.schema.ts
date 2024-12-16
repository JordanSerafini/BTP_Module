import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';
import { Devis } from 'src/interfaces/devis.interface';
import { Fourniture } from 'src/interfaces/fourniture.interface';
import { Outils } from 'src/interfaces/outils.interface';
import { Personnel } from 'src/interfaces/personnel.interface';

@Schema({ timestamps: true })
export class Chantier {
  @Prop({ required: true })
  numero: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  notes: string;

  @Prop({ required: true })
  client: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  debut_prevu: Date;

  @Prop()
  fin_prevu: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Personnel', index: true }] })
  personnels: Personnel[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Fourniture', index: true }] })
  fournitures: Fourniture[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Outils', index: true }] })
  outillages: Outils[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Devis', index: true }] })
  devis: Devis[];
}

export type ChantierDocument = Chantier & Document;
export const ChantierSchema = SchemaFactory.createForClass(Chantier);
