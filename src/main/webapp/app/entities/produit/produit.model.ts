import { IMagasin } from 'app/entities/magasin/magasin.model';

export interface IProduit {
  id: number;
  nom?: string | null;
  description?: string | null;
  prix?: number | null;
  magasin?: Pick<IMagasin, 'id' | 'nom'> | null;
}

export type NewProduit = Omit<IProduit, 'id'> & { id: null };
