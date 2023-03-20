import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../magasin.test-samples';

import { MagasinFormService } from './magasin-form.service';

describe('Magasin Form Service', () => {
  let service: MagasinFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagasinFormService);
  });

  describe('Service methods', () => {
    describe('createMagasinFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMagasinFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nom: expect.any(Object),
            adresse: expect.any(Object),
            cooperative: expect.any(Object),
          })
        );
      });

      it('passing IMagasin should create a new form with FormGroup', () => {
        const formGroup = service.createMagasinFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nom: expect.any(Object),
            adresse: expect.any(Object),
            cooperative: expect.any(Object),
          })
        );
      });
    });

    describe('getMagasin', () => {
      it('should return NewMagasin for default Magasin initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMagasinFormGroup(sampleWithNewData);

        const magasin = service.getMagasin(formGroup) as any;

        expect(magasin).toMatchObject(sampleWithNewData);
      });

      it('should return NewMagasin for empty Magasin initial value', () => {
        const formGroup = service.createMagasinFormGroup();

        const magasin = service.getMagasin(formGroup) as any;

        expect(magasin).toMatchObject({});
      });

      it('should return IMagasin', () => {
        const formGroup = service.createMagasinFormGroup(sampleWithRequiredData);

        const magasin = service.getMagasin(formGroup) as any;

        expect(magasin).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMagasin should not enable id FormControl', () => {
        const formGroup = service.createMagasinFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMagasin should disable id FormControl', () => {
        const formGroup = service.createMagasinFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
