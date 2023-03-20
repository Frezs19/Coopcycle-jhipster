import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { MagasinFormService, MagasinFormGroup } from './magasin-form.service';
import { IMagasin } from '../magasin.model';
import { MagasinService } from '../service/magasin.service';
import { ICooperative } from 'app/entities/cooperative/cooperative.model';
import { CooperativeService } from 'app/entities/cooperative/service/cooperative.service';

@Component({
  selector: 'jhi-magasin-update',
  templateUrl: './magasin-update.component.html',
})
export class MagasinUpdateComponent implements OnInit {
  isSaving = false;
  magasin: IMagasin | null = null;

  cooperativesSharedCollection: ICooperative[] = [];

  editForm: MagasinFormGroup = this.magasinFormService.createMagasinFormGroup();

  constructor(
    protected magasinService: MagasinService,
    protected magasinFormService: MagasinFormService,
    protected cooperativeService: CooperativeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCooperative = (o1: ICooperative | null, o2: ICooperative | null): boolean => this.cooperativeService.compareCooperative(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ magasin }) => {
      this.magasin = magasin;
      if (magasin) {
        this.updateForm(magasin);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const magasin = this.magasinFormService.getMagasin(this.editForm);
    if (magasin.id !== null) {
      this.subscribeToSaveResponse(this.magasinService.update(magasin));
    } else {
      this.subscribeToSaveResponse(this.magasinService.create(magasin));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMagasin>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(magasin: IMagasin): void {
    this.magasin = magasin;
    this.magasinFormService.resetForm(this.editForm, magasin);

    this.cooperativesSharedCollection = this.cooperativeService.addCooperativeToCollectionIfMissing<ICooperative>(
      this.cooperativesSharedCollection,
      magasin.cooperative
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cooperativeService
      .query()
      .pipe(map((res: HttpResponse<ICooperative[]>) => res.body ?? []))
      .pipe(
        map((cooperatives: ICooperative[]) =>
          this.cooperativeService.addCooperativeToCollectionIfMissing<ICooperative>(cooperatives, this.magasin?.cooperative)
        )
      )
      .subscribe((cooperatives: ICooperative[]) => (this.cooperativesSharedCollection = cooperatives));
  }
}
