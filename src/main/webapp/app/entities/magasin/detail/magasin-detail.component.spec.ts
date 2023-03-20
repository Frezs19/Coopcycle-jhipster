import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MagasinDetailComponent } from './magasin-detail.component';

describe('Magasin Management Detail Component', () => {
  let comp: MagasinDetailComponent;
  let fixture: ComponentFixture<MagasinDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagasinDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ magasin: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MagasinDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MagasinDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load magasin on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.magasin).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
