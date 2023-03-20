import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMagasin } from '../magasin.model';
import { MagasinService } from '../service/magasin.service';

@Injectable({ providedIn: 'root' })
export class MagasinRoutingResolveService implements Resolve<IMagasin | null> {
  constructor(protected service: MagasinService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMagasin | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((magasin: HttpResponse<IMagasin>) => {
          if (magasin.body) {
            return of(magasin.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
