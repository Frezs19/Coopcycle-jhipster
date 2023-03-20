import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMagasin, NewMagasin } from '../magasin.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMagasin for edit and NewMagasinFormGroupInput for create.
 */
type MagasinFormGroupInput = IMagasin | PartialWithRequiredKeyOf<NewMagasin>;

type MagasinFormDefaults = Pick<NewMagasin, 'id'>;

type MagasinFormGroupContent = {
  id: FormControl<IMagasin['id'] | NewMagasin['id']>;
  nom: FormControl<IMagasin['nom']>;
  adresse: FormControl<IMagasin['adresse']>;
  cooperative: FormControl<IMagasin['cooperative']>;
};

export type MagasinFormGroup = FormGroup<MagasinFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MagasinFormService {
  createMagasinFormGroup(magasin: MagasinFormGroupInput = { id: null }): MagasinFormGroup {
    const magasinRawValue = {
      ...this.getFormDefaults(),
      ...magasin,
    };
    return new FormGroup<MagasinFormGroupContent>({
      id: new FormControl(
        { value: magasinRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nom: new FormControl(magasinRawValue.nom, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      adresse: new FormControl(magasinRawValue.adresse, {
        validators: [Validators.required, Validators.minLength(10)],
      }),
      cooperative: new FormControl(magasinRawValue.cooperative),
    });
  }

  getMagasin(form: MagasinFormGroup): IMagasin | NewMagasin {
    return form.getRawValue() as IMagasin | NewMagasin;
  }

  resetForm(form: MagasinFormGroup, magasin: MagasinFormGroupInput): void {
    const magasinRawValue = { ...this.getFormDefaults(), ...magasin };
    form.reset(
      {
        ...magasinRawValue,
        id: { value: magasinRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MagasinFormDefaults {
    return {
      id: null,
    };
  }
}
