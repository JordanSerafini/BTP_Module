import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chantier } from './schemas/Chantier.schema';
import { ChantierDocument } from './schemas/Chantier.schema';

@Injectable()
export class ChantierService {
  constructor(
    @InjectModel(Chantier.name) private chantierModel: Model<ChantierDocument>,
  ) {}

  async create(chantierData): Promise<Chantier> {
    const chantier = new this.chantierModel(chantierData);
    return chantier.save();
  }

  async findAll(): Promise<Chantier[]> {
    return this.chantierModel
      .aggregate([
        {
          $lookup: {
            from: 'personnels',
            localField: 'personnels',
            foreignField: '_id',
            as: 'personnels_details',
          },
        },
        {
          $lookup: {
            from: 'fournitures',
            localField: 'fournitures',
            foreignField: '_id',
            as: 'fournitures_details',
          },
        },
        {
          $lookup: {
            from: 'outils',
            localField: 'outillages',
            foreignField: '_id',
            as: 'outillages_details',
          },
        },
        {
          $lookup: {
            from: 'devis',
            localField: 'devis',
            foreignField: '_id',
            as: 'devis_details',
          },
        },
        {
          $sort: {
            debut_prevu: 1,
          },
        },
      ])
      .exec();
  }

  async findOne(id: string): Promise<Chantier> {
    return this.chantierModel.findById(id).exec();
  }

  async update(id: string, chantierData): Promise<Chantier> {
    return this.chantierModel
      .findByIdAndUpdate(id, chantierData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<any> {
    return this.chantierModel.findByIdAndDelete(id).exec();
  }
}
