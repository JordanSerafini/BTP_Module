import { IsString, IsDate, IsArray, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';

class LocalisationDto {
  @IsNumber()
  @IsOptional()
  lon?: number;

  @IsNumber()
  @IsOptional()
  lat?: number;
}

export class CreateChantierDto {
  @IsString()
  numero: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  notes?: string[];

  @IsString()
  @IsOptional()
  commentaires?: string[];

  @IsString()
  client: string;

  @IsString()
  status: string;

  @IsDate()
  debut_prevu: Date;

  @IsDate()
  fin_prevu: Date;

  @IsArray()
  @IsOptional()
  personnels?: Types.ObjectId[];

  @IsArray()
  @IsOptional()
  fournitures?: Types.ObjectId[];

  @IsArray()
  @IsOptional()
  outillages?: Types.ObjectId[];

  @IsArray()
  @IsOptional()
  devis?: Types.ObjectId[];

  // Nouveaux champs ajoutés
  @IsString()
  adresse: string;

  @IsString()
  code_postal: string;

  @IsString()
  ville: string;

  @ValidateNested()
  @Type(() => LocalisationDto)
  @IsOptional()
  localisation?: LocalisationDto;
}

export class UpdateChantierDto extends CreateChantierDto {}
