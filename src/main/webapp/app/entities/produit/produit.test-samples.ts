import { IProduit, NewProduit } from './produit.model';

export const sampleWithRequiredData: IProduit = {
  id: 91013,
  nom: 'Garden',
  description: 'Limousin Ball',
  prix: 87180,
};

export const sampleWithPartialData: IProduit = {
  id: 51446,
  nom: 'cXX',
  description: 'deposit CSS bandwidth',
  prix: 9519,
};

export const sampleWithFullData: IProduit = {
  id: 74397,
  nom: 'Lorraine Salad a',
  description: 'Gloves Concrete',
  prix: 46356,
};

export const sampleWithNewData: NewProduit = {
  nom: 'Grocery Music Dinar',
  description: 'bluetoothX',
  prix: 56548,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
