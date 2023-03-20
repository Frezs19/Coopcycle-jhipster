import { ICooperative, NewCooperative } from './cooperative.model';

export const sampleWithRequiredData: ICooperative = {
  id: 84816,
  nom: 'incentivize program Presbourg',
  zone: 'primary transmitter Fish',
};

export const sampleWithPartialData: ICooperative = {
  id: 60826,
  nom: 'Granite Pizza',
  zone: 'Convertible deposit',
};

export const sampleWithFullData: ICooperative = {
  id: 73008,
  nom: 'mobile cross-platform',
  zone: 'Bretagne override',
};

export const sampleWithNewData: NewCooperative = {
  nom: 'attitude-oriented Superviseur innovate',
  zone: 'XML Cotton',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
