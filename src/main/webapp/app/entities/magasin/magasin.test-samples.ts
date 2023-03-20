import { IMagasin, NewMagasin } from './magasin.model';

export const sampleWithRequiredData: IMagasin = {
  id: 30812,
  nom: 'blue Norwegian',
  adresse: 'c Avon synthesizing',
};

export const sampleWithPartialData: IMagasin = {
  id: 98228,
  nom: 'Nord-Pas-de-Calais viral Refined',
  adresse: 'Shirt Front-line IB',
};

export const sampleWithFullData: IMagasin = {
  id: 88075,
  nom: 'zero',
  adresse: 'whiteboard neural',
};

export const sampleWithNewData: NewMagasin = {
  nom: 'invoice c microchip',
  adresse: 'Fantastic c Avon',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
