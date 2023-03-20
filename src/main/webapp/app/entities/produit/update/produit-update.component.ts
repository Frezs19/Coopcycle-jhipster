import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ProduitFormService, ProduitFormGroup } from './produit-form.service';
import { IProduit } from '../produit.model';
import { ProduitService } from '../service/produit.service';
import { IMagasin } from 'app/entities/magasin/magasin.model';
import { MagasinService } from 'app/entities/magasin/service/magasin.service';

@Component({
  selector: 'jhi-produit-update',
  templateUrl: './produit-update.component.html',
})
export class ProduitUpdateComponent implements OnInit {
  isSaving = false;
  produit: IProduit | null = null;

  magasinsSharedCollection: IMagasin[] = [];

  editForm: ProduitFormGroup = this.produitFormService.createProduitFormGroup();

  constructor(
    protected produitService: ProduitService,
    protected produitFormService: ProduitFormService,
    protected magasinService: MagasinService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareMagasin = (o1: IMagasin | null, o2: IMagasin | null): boolean => this.magasinService.compareMagasin(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produit }) => {
      this.produit = produit;
      if (produit) {
        this.updateForm(produit);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produit = this.produitFormService.getProduit(this.editForm);
    if (produit.id !== null) {
      this.subscribeToSaveResponse(this.produitService.update(produit));
    } else {
      this.subscribeToSaveResponse(this.produitService.create(produit));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduit>>): void {
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

  protected updateForm(produit: IProduit): void {
    this.produit = produit;
    this.produitFormService.resetForm(this.editForm, produit);

    this.magasinsSharedCollection = this.magasinService.addMagasinToCollectionIfMissing<IMagasin>(
      this.magasinsSharedCollection,
      produit.magasin
    );
  }

  protected loadRelationshipsOptions(): void {
    this.magasinService
      .query()
      .pipe(map((res: HttpResponse<IMagasin[]>) => res.body ?? []))
      .pipe(map((magasins: IMagasin[]) => this.magasinService.addMagasinToCollectionIfMissing<IMagasin>(magasins, this.produit?.magasin)))
      .subscribe((magasins: IMagasin[]) => (this.magasinsSharedCollection = magasins));
  }
}
