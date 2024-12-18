import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chantier } from 'schemas/Chantier.schema';
import { ChantierDocument } from 'schemas/Chantier.schema';

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
    const result = await this.chantierModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(id) },
      },
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
    ]);

    return result[0] || null;
  }

  async update(id: string, chantierData): Promise<Chantier> {
    if (chantierData.personnels) {
      chantierData.personnels = chantierData.personnels.map(
        (id: string) => new Types.ObjectId(id),
      );
    }

    if (chantierData.fournitures) {
      chantierData.fournitures = chantierData.fournitures.map(
        (id: string) => new Types.ObjectId(id),
      );
    }

    if (chantierData.outillages) {
      chantierData.outillages = chantierData.outillages.map(
        (id: string) => new Types.ObjectId(id),
      );
    }

    if (chantierData.devis) {
      chantierData.devis = chantierData.devis.map(
        (id: string) => new Types.ObjectId(id),
      );
    }

    await this.chantierModel
      .findByIdAndUpdate(id, { $set: chantierData }, { new: true })
      .exec();

    const result = await this.chantierModel.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
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
    ]);

    return result[0] || null;
  }

  async delete(id: string): Promise<any> {
    return this.chantierModel.findByIdAndDelete(id).exec();
  }
}
