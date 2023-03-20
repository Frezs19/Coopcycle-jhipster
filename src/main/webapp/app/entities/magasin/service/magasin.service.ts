import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMagasin, NewMagasin } from '../magasin.model';

export type PartialUpdateMagasin = Partial<IMagasin> & Pick<IMagasin, 'id'>;

export type EntityResponseType = HttpResponse<IMagasin>;
export type EntityArrayResponseType = HttpResponse<IMagasin[]>;

@Injectable({ providedIn: 'root' })
export class MagasinService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/magasins');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(magasin: NewMagasin): Observable<EntityResponseType> {
    return this.http.post<IMagasin>(this.resourceUrl, magasin, { observe: 'response' });
  }

  update(magasin: IMagasin): Observable<EntityResponseType> {
    return this.http.put<IMagasin>(`${this.resourceUrl}/${this.getMagasinIdentifier(magasin)}`, magasin, { observe: 'response' });
  }

  partialUpdate(magasin: PartialUpdateMagasin): Observable<EntityResponseType> {
    return this.http.patch<IMagasin>(`${this.resourceUrl}/${this.getMagasinIdentifier(magasin)}`, magasin, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMagasin>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMagasin[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMagasinIdentifier(magasin: Pick<IMagasin, 'id'>): number {
    return magasin.id;
  }

  compareMagasin(o1: Pick<IMagasin, 'id'> | null, o2: Pick<IMagasin, 'id'> | null): boolean {
    return o1 && o2 ? this.getMagasinIdentifier(o1) === this.getMagasinIdentifier(o2) : o1 === o2;
  }

  addMagasinToCollectionIfMissing<Type extends Pick<IMagasin, 'id'>>(
    magasinCollection: Type[],
    ...magasinsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const magasins: Type[] = magasinsToCheck.filter(isPresent);
    if (magasins.length > 0) {
      const magasinCollectionIdentifiers = magasinCollection.map(magasinItem => this.getMagasinIdentifier(magasinItem)!);
      const magasinsToAdd = magasins.filter(magasinItem => {
        const magasinIdentifier = this.getMagasinIdentifier(magasinItem);
        if (magasinCollectionIdentifiers.includes(magasinIdentifier)) {
          return false;
        }
        magasinCollectionIdentifiers.push(magasinIdentifier);
        return true;
      });
      return [...magasinsToAdd, ...magasinCollection];
    }
    return magasinCollection;
  }
}
