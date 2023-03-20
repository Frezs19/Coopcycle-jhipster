export interface ICooperative {
  id: number;
  nom?: string | null;
  zone?: string | null;
}

export type NewCooperative = Omit<ICooperative, 'id'> & { id: null };
