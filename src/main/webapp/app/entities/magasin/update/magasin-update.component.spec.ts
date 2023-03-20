import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MagasinFormService } from './magasin-form.service';
import { MagasinService } from '../service/magasin.service';
import { IMagasin } from '../magasin.model';
import { ICooperative } from 'app/entities/cooperative/cooperative.model';
import { CooperativeService } from 'app/entities/cooperative/service/cooperative.service';

import { MagasinUpdateComponent } from './magasin-update.component';

describe('Magasin Management Update Component', () => {
  let comp: MagasinUpdateComponent;
  let fixture: ComponentFixture<MagasinUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let magasinFormService: MagasinFormService;
  let magasinService: MagasinService;
  let cooperativeService: CooperativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MagasinUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(MagasinUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MagasinUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    magasinFormService = TestBed.inject(MagasinFormService);
    magasinService = TestBed.inject(MagasinService);
    cooperativeService = TestBed.inject(CooperativeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Cooperative query and add missing value', () => {
      const magasin: IMagasin = { id: 456 };
      const cooperative: ICooperative = { id: 23791 };
      magasin.cooperative = cooperative;

      const cooperativeCollection: ICooperative[] = [{ id: 72649 }];
      jest.spyOn(cooperativeService, 'query').mockReturnValue(of(new HttpResponse({ body: cooperativeCollection })));
      const additionalCooperatives = [cooperative];
      const expectedCollection: ICooperative[] = [...additionalCooperatives, ...cooperativeCollection];
      jest.spyOn(cooperativeService, 'addCooperativeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ magasin });
      comp.ngOnInit();

      expect(cooperativeService.query).toHaveBeenCalled();
      expect(cooperativeService.addCooperativeToCollectionIfMissing).toHaveBeenCalledWith(
        cooperativeCollection,
        ...additionalCooperatives.map(expect.objectContaining)
      );
      expect(comp.cooperativesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const magasin: IMagasin = { id: 456 };
      const cooperative: ICooperative = { id: 41490 };
      magasin.cooperative = cooperative;

      activatedRoute.data = of({ magasin });
      comp.ngOnInit();

      expect(comp.cooperativesSharedCollection).toContain(cooperative);
      expect(comp.magasin).toEqual(magasin);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMagasin>>();
      const magasin = { id: 123 };
      jest.spyOn(magasinFormService, 'getMagasin').mockReturnValue(magasin);
      jest.spyOn(magasinService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ magasin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: magasin }));
      saveSubject.complete();

      // THEN
      expect(magasinFormService.getMagasin).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(magasinService.update).toHaveBeenCalledWith(expect.objectContaining(magasin));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMagasin>>();
      const magasin = { id: 123 };
      jest.spyOn(magasinFormService, 'getMagasin').mockReturnValue({ id: null });
      jest.spyOn(magasinService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ magasin: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: magasin }));
      saveSubject.complete();

      // THEN
      expect(magasinFormService.getMagasin).toHaveBeenCalled();
      expect(magasinService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMagasin>>();
      const magasin = { id: 123 };
      jest.spyOn(magasinService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ magasin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(magasinService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCooperative', () => {
      it('Should forward to cooperativeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cooperativeService, 'compareCooperative');
        comp.compareCooperative(entity, entity2);
        expect(cooperativeService.compareCooperative).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
