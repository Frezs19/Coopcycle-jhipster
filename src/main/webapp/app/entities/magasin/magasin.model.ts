import { ICooperative } from 'app/entities/cooperative/cooperative.model';

export interface IMagasin {
  id: number;
  nom?: string | null;
  adresse?: string | null;
  cooperative?: Pick<ICooperative, 'id' | 'nom'> | null;
}

export type NewMagasin = Omit<IMagasin, 'id'> & { id: null };
