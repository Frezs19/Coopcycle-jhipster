import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MagasinService } from '../service/magasin.service';

import { MagasinComponent } from './magasin.component';

describe('Magasin Management Component', () => {
  let comp: MagasinComponent;
  let fixture: ComponentFixture<MagasinComponent>;
  let service: MagasinService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'magasin', component: MagasinComponent }]), HttpClientTestingModule],
      declarations: [MagasinComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(MagasinComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MagasinComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MagasinService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.magasins?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to magasinService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getMagasinIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getMagasinIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
