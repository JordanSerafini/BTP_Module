import { Devis } from './devis.interface';
import { Fourniture } from './fourniture.interface';
import { Outils } from './outils.interface';
import { Personnel } from './personnel.interface';

export interface Chantier {
  _id: string;
  numero: string;
  title: string;
  description: string;
  notes: string;
  commentaires: string[];
  client: string;
  status: string;
  debut_prevu: Date;
  fin_prevu: Date;
  personnels: string[]; 
  fournitures: string[];
  outillages: string[];
  devis: string[];
  createdAt: Date;
  updatedAt: Date;
  adresse: string;
  code_postal: string;
  ville: string;
  localisation: { lon: number; lat: number };
}

export interface ChantierDetails extends Chantier {
  personnels_details: Personnel[];
  fournitures_details: Fourniture[];
  outillages_details: Outils[];
  devis_details: Devis[];

}
