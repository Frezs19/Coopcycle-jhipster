import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMagasin } from '../magasin.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../magasin.test-samples';

import { MagasinService } from './magasin.service';

const requireRestSample: IMagasin = {
  ...sampleWithRequiredData,
};

describe('Magasin Service', () => {
  let service: MagasinService;
  let httpMock: HttpTestingController;
  let expectedResult: IMagasin | IMagasin[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MagasinService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Magasin', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const magasin = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(magasin).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Magasin', () => {
      const magasin = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(magasin).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Magasin', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Magasin', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Magasin', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMagasinToCollectionIfMissing', () => {
      it('should add a Magasin to an empty array', () => {
        const magasin: IMagasin = sampleWithRequiredData;
        expectedResult = service.addMagasinToCollectionIfMissing([], magasin);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(magasin);
      });

      it('should not add a Magasin to an array that contains it', () => {
        const magasin: IMagasin = sampleWithRequiredData;
        const magasinCollection: IMagasin[] = [
          {
            ...magasin,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMagasinToCollectionIfMissing(magasinCollection, magasin);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Magasin to an array that doesn't contain it", () => {
        const magasin: IMagasin = sampleWithRequiredData;
        const magasinCollection: IMagasin[] = [sampleWithPartialData];
        expectedResult = service.addMagasinToCollectionIfMissing(magasinCollection, magasin);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(magasin);
      });

      it('should add only unique Magasin to an array', () => {
        const magasinArray: IMagasin[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const magasinCollection: IMagasin[] = [sampleWithRequiredData];
        expectedResult = service.addMagasinToCollectionIfMissing(magasinCollection, ...magasinArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const magasin: IMagasin = sampleWithRequiredData;
        const magasin2: IMagasin = sampleWithPartialData;
        expectedResult = service.addMagasinToCollectionIfMissing([], magasin, magasin2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(magasin);
        expect(expectedResult).toContain(magasin2);
      });

      it('should accept null and undefined values', () => {
        const magasin: IMagasin = sampleWithRequiredData;
        expectedResult = service.addMagasinToCollectionIfMissing([], null, magasin, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(magasin);
      });

      it('should return initial array if no Magasin is added', () => {
        const magasinCollection: IMagasin[] = [sampleWithRequiredData];
        expectedResult = service.addMagasinToCollectionIfMissing(magasinCollection, undefined, null);
        expect(expectedResult).toEqual(magasinCollection);
      });
    });

    describe('compareMagasin', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMagasin(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMagasin(entity1, entity2);
        const compareResult2 = service.compareMagasin(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMagasin(entity1, entity2);
        const compareResult2 = service.compareMagasin(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMagasin(entity1, entity2);
        const compareResult2 = service.compareMagasin(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
